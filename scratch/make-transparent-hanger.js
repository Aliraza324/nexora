import fs from 'fs';
import zlib from 'zlib';

function decodePng(buffer) {
  let pos = 8;
  const idats = [];
  let width, height, bitDepth, colorType;
  while (pos < buffer.length) {
    const len = buffer.readUInt32BE(pos);
    const type = buffer.toString('ascii', pos + 4, pos + 8);
    if (type === 'IHDR') {
      width = buffer.readUInt32BE(pos + 8);
      height = buffer.readUInt32BE(pos + 12);
      bitDepth = buffer.readUInt8(pos + 16);
      colorType = buffer.readUInt8(pos + 17);
    } else if (type === 'IDAT') {
      idats.push(buffer.subarray(pos + 8, pos + 8 + len));
    }
    pos += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idats));
  const bpp = colorType === 2 ? 3 : 4;
  const rowSize = 1 + width * bpp;
  const pixels = Buffer.alloc(width * height * 4);
  const prevRow = Buffer.alloc(width * bpp);
  const currRow = Buffer.alloc(width * bpp);
  for (let y = 0; y < height; y++) {
    const rowStart = y * rowSize;
    const filter = raw[rowStart];
    for (let i = 0; i < width * bpp; i++) {
      const x = raw[rowStart + 1 + i];
      const a = i >= bpp ? currRow[i - bpp] : 0;
      const b = prevRow[i];
      const c = i >= bpp ? prevRow[i - bpp] : 0;
      let val = 0;
      if (filter === 0) val = x;
      else if (filter === 1) val = (x + a) & 0xff;
      else if (filter === 2) val = (x + b) & 0xff;
      else if (filter === 3) val = (x + Math.floor((a + b) / 2)) & 0xff;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        let pr = c;
        if (pa <= pb && pa <= pc) pr = a;
        else if (pb <= pc) pr = b;
        val = (x + pr) & 0xff;
      }
      currRow[i] = val;
    }
    currRow.copy(prevRow);
    for (let x = 0; x < width; x++) {
      const pIdx = (y * width + x) * 4;
      const rIdx = x * bpp;
      pixels[pIdx] = currRow[rIdx];
      pixels[pIdx + 1] = currRow[rIdx + 1];
      pixels[pIdx + 2] = currRow[rIdx + 2];
      pixels[pIdx + 3] = 255;
    }
  }
  return { width, height, pixels };
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = chunk.subarray(4, 8 + len);
  const crc = zlib.crc32(typeAndData);
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

function encodeRgbaPng(cropW, cropH, rgbaPixels) {
  const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(cropW, 0);
  ihdrData.writeUInt32BE(cropH, 4);
  ihdrData.writeUInt8(8, 8);
  ihdrData.writeUInt8(6, 9);
  ihdrData.writeUInt8(0, 10);
  ihdrData.writeUInt8(0, 11);
  ihdrData.writeUInt8(0, 12);
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  const scanlines = Buffer.alloc(cropH * (1 + cropW * 4));
  for (let y = 0; y < cropH; y++) {
    const rowOffset = y * (1 + cropW * 4);
    scanlines[rowOffset] = 0;
    rgbaPixels.copy(scanlines, rowOffset + 1, y * cropW * 4, (y + 1) * cropW * 4);
  }
  const idatData = zlib.deflateSync(scanlines);
  const idatChunk = makeChunk('IDAT', idatData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));
  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

const img = decodePng(fs.readFileSync('src/assets/Nexora Premium Streetwear Collection.png'));

// Hook 0: center at 220, from y=380 to y=465
// Width = 110 (x=165 to 275), Height = 85 (y=380 to 465)
const startX = 165;
const startY = 380;
const w = 110;
const h = 85;

const outPixels = Buffer.alloc(w * h * 4);

for (let y = 0; y < h; y++) {
  const srcY = startY + y;
  for (let x = 0; x < w; x++) {
    const srcX = startX + x;
    const srcIdx = (srcY * img.width + srcX) * 4;
    const outIdx = (y * w + x) * 4;

    const r = img.pixels[srcIdx];
    const g = img.pixels[srcIdx + 1];
    const b = img.pixels[srcIdx + 2];

    outPixels[outIdx] = r;
    outPixels[outIdx + 1] = g;
    outPixels[outIdx + 2] = b;

    // Check if background (cream ~ 235, 226, 216) or rod (metallic reflection)
    // The hook is dark (r<100, g<100, b<100)
    // The wooden hanger is warm brown (r: 100-180, g: 60-120, b: 35-85, with r > g > b)
    // The rod is horizontal between y=398 and y=418
    const isRod = srcY >= 398 && srcY <= 418 && (srcX < 214 || srcX > 227);
    const isBg = (r > 215 && g > 205 && b > 195 && Math.abs(r - g) < 20 && Math.abs(g - b) < 20);

    if (isBg || isRod) {
      outPixels[outIdx + 3] = 0; // Transparent
    } else {
      outPixels[outIdx + 3] = 255; // Keep hook and hanger
    }
  }
}

// Clean up any stray pixels outside hook & hanger
fs.writeFileSync('src/assets/wooden-hanger.png', encodeRgbaPng(w, h, outPixels));
fs.writeFileSync('public/wooden-hanger.png', encodeRgbaPng(w, h, outPixels));
console.log('Saved transparent wooden-hanger.png!');

