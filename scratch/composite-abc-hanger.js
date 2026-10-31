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

const abc = decodePng(fs.readFileSync('src/assets/abc.png'));
const master = decodePng(fs.readFileSync('src/assets/Nexora Premium Streetwear Collection.png'));

// In master image, Hoodie 3 (hook at 807, y=380 to 880):
// Hook is at x=807.
// Wooden hanger is at x=780-835, y=415-465.
// In abc.png (width 432, height 578):
// The hood apex is at x=238, y=53.
// Let's create a new canvas for abc.png that includes the hook and wooden hanger at the top!
// Height: 650 (adding 72px on top for the hook and hanger to hang on the rod).
const outW = 432;
const outH = 650;
const offsetY = 72; // shift abc.png down by 72px

const outPixels = Buffer.alloc(outW * outH * 4);

// First, copy abc.png shifted down by offsetY
for (let y = 0; y < abc.height; y++) {
  const targetY = y + offsetY;
  if (targetY >= outH) continue;
  for (let x = 0; x < abc.width; x++) {
    const srcIdx = (y * abc.width + x) * 4;
    const targetIdx = (targetY * outW + x) * 4;
    outPixels[targetIdx] = abc.pixels[srcIdx];
    outPixels[targetIdx + 1] = abc.pixels[srcIdx + 1];
    outPixels[targetIdx + 2] = abc.pixels[srcIdx + 2];
    outPixels[targetIdx + 3] = abc.pixels[srcIdx + 3];
  }
}

// In abc.png, the neck opening is around x=238, targetY = 53 + 72 = 125.
// The wooden hanger should sit inside the hood (targetY 100 to 140, x 190 to 285).
// The hook goes from targetY=100 UP to targetY=14 (where the rod sits).
// Let's sample the hanger and hook from master image Hoodie 3 (x=807, y=380 to 465):
// Scale factor from master to abc: in master, hoodie width is ~194px. In abc, garment width is ~325px.
// Scale ~ 1.65.
const hookX_in_abc = 238;
const hookTopY_in_abc = 14;

// Let's copy the authentic hook and wooden hanger scaled onto abc:
const masterStartX = 807 - 50;
const masterEndX = 807 + 50;
const masterStartY = 380;
const masterEndY = 460;

const scale = 1.62;

for (let my = masterStartY; my <= masterEndY; my++) {
  for (let mx = masterStartX; mx <= masterEndX; mx++) {
    const mIdx = (my * master.width + mx) * 4;
    const mr = master.pixels[mIdx];
    const mg = master.pixels[mIdx + 1];
    const mb = master.pixels[mIdx + 2];

    // Background in master is cream (~236, 228, 218)
    const isBg = (mr > 218 && mg > 208 && mb > 198 && Math.abs(mr - mg) < 20);
    // Ignore master rod except the hook curve:
    const isMasterRod = (my >= 398 && my <= 418 && (mx < 803 || mx > 812));

    if (isBg || isMasterRod) continue;

    // Is it wood or hook?
    const isHook = (mr < 100 && mg < 100 && mb < 100);
    const isWood = (mr > 75 && mr < 205 && mg > 40 && mg < 155 && mb > 20 && mb < 105 && mr > mg);

    if (!isHook && !isWood) continue;

    // Map to abc coordinates
    const targetX = Math.round(hookX_in_abc + (mx - 807) * scale);
    const targetY = Math.round(hookTopY_in_abc + (my - 380) * scale);

    if (targetX < 0 || targetX >= outW || targetY < 0 || targetY >= outH) continue;

    const tIdx = (targetY * outW + targetX) * 4;
    const existingAlpha = outPixels[tIdx + 3];

    // IF it's the hook (targetY < 120), it sits in front of or inside
    if (isHook) {
      outPixels[tIdx] = mr;
      outPixels[tIdx + 1] = mg;
      outPixels[tIdx + 2] = mb;
      outPixels[tIdx + 3] = 255;
    } else if (isWood) {
      // Wood sits INSIDE the hood:
      // If targetY is below 150 and there is already dark front collar fabric (existingAlpha > 200 and r,g,b < 35),
      // keep the front collar fabric in front!
      const existingR = outPixels[tIdx];
      const existingG = outPixels[tIdx + 1];
      const existingB = outPixels[tIdx + 2];
      const isFrontCollar = (targetY > 142 && existingAlpha > 200 && existingR < 40 && existingG < 40 && existingB < 40);

      if (!isFrontCollar) {
        outPixels[tIdx] = mr;
        outPixels[tIdx + 1] = mg;
        outPixels[tIdx + 2] = mb;
        outPixels[tIdx + 3] = 255;
      }
    }
  }
}

fs.writeFileSync('scratch/abc-hung.png', encodeRgbaPng(outW, outH, outPixels));
console.log('Saved scratch/abc-hung.png!');

