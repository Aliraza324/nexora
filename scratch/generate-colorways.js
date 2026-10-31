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
      pixels[pIdx + 3] = bpp === 4 ? currRow[rIdx + 3] : 255;
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

const baseImg = decodePng(fs.readFileSync('src/assets/abc.png'));
const W = baseImg.width;
const H = baseImg.height;

if (!fs.existsSync('src/assets/hoodies')) {
  fs.mkdirSync('src/assets/hoodies', { recursive: true });
}

// 1. Midnight Jet Black (Original abc.png copy)
fs.copyFileSync('src/assets/abc.png', 'src/assets/hoodies/hoodie-black.png');

// Helper to generate colorway
function createColorway(filename, transformPixel) {
  const out = Buffer.alloc(W * H * 4);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * 4;
      const r = baseImg.pixels[idx];
      const g = baseImg.pixels[idx + 1];
      const b = baseImg.pixels[idx + 2];
      const a = baseImg.pixels[idx + 3];

      if (a < 10) {
        out[idx + 3] = 0;
        continue;
      }

      // Check if this pixel is the white lettering (bright: r,g,b > 180)
      const isGraphic = (r > 165 && g > 165 && b > 165);

      const [nr, ng, nb, na] = transformPixel(r, g, b, a, isGraphic);
      out[idx] = nr;
      out[idx + 1] = ng;
      out[idx + 2] = nb;
      out[idx + 3] = na;
    }
  }
  fs.writeFileSync(`src/assets/hoodies/${filename}`, encodeRgbaPng(W, H, out));
  console.log(`Created src/assets/hoodies/${filename}`);
}

// 2. Washed Mineral Charcoal
createColorway('hoodie-charcoal.png', (r, g, b, a, isGraphic) => {
  if (isGraphic) return [240, 240, 242, a];
  // Lift darks into soft slate charcoal (#2E3136)
  const l = (r + g + b) / 3;
  const nr = Math.min(255, Math.round(l * 1.35 + 32));
  const ng = Math.min(255, Math.round(l * 1.35 + 34));
  const nb = Math.min(255, Math.round(l * 1.35 + 38));
  return [nr, ng, nb, a];
});

// 3. Tactical Forest Olive
createColorway('hoodie-olive.png', (r, g, b, a, isGraphic) => {
  if (isGraphic) return [235, 242, 230, a]; // subtle bone-tinted white print
  const l = (r + g + b) / 3;
  const nr = Math.min(255, Math.round(l * 1.1 + 35));
  const ng = Math.min(255, Math.round(l * 1.45 + 50));
  const nb = Math.min(255, Math.round(l * 1.0 + 32));
  return [nr, ng, nb, a];
});

// 4. Earth Espresso (Rich Dark Chocolate)
createColorway('hoodie-espresso.png', (r, g, b, a, isGraphic) => {
  if (isGraphic) return [245, 235, 220, a]; // warm cream print
  const l = (r + g + b) / 3;
  const nr = Math.min(255, Math.round(l * 1.5 + 46));
  const ng = Math.min(255, Math.round(l * 1.1 + 28));
  const nb = Math.min(255, Math.round(l * 0.9 + 20));
  return [nr, ng, nb, a];
});

// 5. Classic Luxury Cream / Sand
createColorway('hoodie-cream.png', (r, g, b, a, isGraphic) => {
  if (isGraphic) {
    // Dark brown/black graphic on cream canvas!
    return [24, 22, 20, a];
  }
  const l = (r + g + b) / 3;
  // Invert black fabric into realistic soft cream fleece (#ECE4D8)
  const inv = (255 - l) / 255; // 1 for pure black, 0 for white
  const nr = Math.round(236 - (1 - inv) * 45);
  const ng = Math.round(228 - (1 - inv) * 48);
  const nb = Math.round(216 - (1 - inv) * 52);
  return [nr, ng, nb, a];
});

// 6. Athletic Heather Grey
createColorway('hoodie-grey.png', (r, g, b, a, isGraphic) => {
  if (isGraphic) return [22, 22, 24, a]; // jet black lettering on heather grey
  const l = (r + g + b) / 3;
  const inv = (255 - l) / 255;
  const nr = Math.round(180 - (1 - inv) * 55);
  const ng = Math.round(182 - (1 - inv) * 55);
  const nb = Math.round(185 - (1 - inv) * 55);
  return [nr, ng, nb, a];
});

