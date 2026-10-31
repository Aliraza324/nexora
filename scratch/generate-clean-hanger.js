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

// Hook 3 (black hoodie) hook center is at x=807
// Hook top is at y=380, rail is y=398-418, wooden hanger is y=420-466
const startX = 807 - 65; // 742
const startY = 380;
const w = 130;
const h = 88; // ends at y=468, just before the black fabric starts!

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

    // Check if pixel is part of the hook or hanger
    // 1. Hook (top loop y=380-398, hook stem y=418-435): dark pixels near center x (w/2 = 65)
    // Hook x is around 63 to 69
    const isHook = (Math.abs(x - 65) <= 6 && (srcY < 398 || srcY > 418 || (srcY >= 398 && srcY <= 418 && (r < 70 && g < 70 && b < 70))));
    
    // 2. The loop over the rod: at y=380-398, the dark wire loops over
    const isHookLoop = (srcY <= 398 && Math.abs(x - 65) <= 7 && (r < 100 && g < 100 && b < 100));

    // 3. Wooden hanger: warm brown wood (srcY >= 428)
    const isWood = (srcY >= 428 && r > 75 && r < 210 && g > 40 && g < 155 && b > 20 && b < 110 && (r - g >= 12));

    if (isHookLoop || (isHook && (r < 110 && g < 110 && b < 110)) || isWood) {
      outPixels[outIdx + 3] = 255;
    } else {
      outPixels[outIdx + 3] = 0; // transparent
    }
  }
}

fs.writeFileSync('src/assets/wooden-hanger.png', encodeRgbaPng(w, h, outPixels));
fs.writeFileSync('public/wooden-hanger.png', encodeRgbaPng(w, h, outPixels));
console.log('Saved clean transparent wooden-hanger.png!');

