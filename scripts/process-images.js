const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processPhoto(inputFile, outputFile) {
  const img = sharp(inputFile);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  const ch = info.channels;

  // Real checkerboard pixels in the original PNG-converted JPEGs:
  const isCheckerboard = (x, y) => {
    const idx = (y * w + x) * ch;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    const lum = (r + g + b) / 3;
    if (lum < 150) return false;
    const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
    return maxDiff <= 25;
  };

  const isSkin = (r, g, b, y) => {
    if (y < 335) return false;
    return (r > g + 8) && (r > b + 12) && (r > 100);
  };

  const visited = new Uint8Array(w * h);
  const q = new Int32Array(w * h * 2);
  let head = 0, tail = 0;

  // 1. Enqueue outer image borders
  for (let x = 0; x < w; x++) {
    if (isCheckerboard(x, 0)) { visited[x] = 1; q[tail++] = x; q[tail++] = 0; }
  }
  for (let y = 0; y < h; y++) {
    if (isCheckerboard(0, y)) { visited[y * w] = 1; q[tail++] = 0; q[tail++] = y; }
    if (isCheckerboard(w - 1, y)) { visited[y * w + w - 1] = 1; q[tail++] = w - 1; q[tail++] = y; }
  }

  // BFS flood fill pure checkerboard
  while (head < tail) {
    const cx = q[head++];
    const cy = q[head++];
    const neighbors = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]];
    for (let i = 0; i < 4; i++) {
      const nx = neighbors[i][0];
      const ny = neighbors[i][1];
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        const nidx = ny * w + nx;
        if (!visited[nidx] && isCheckerboard(nx, ny)) {
          visited[nidx] = 1;
          q[tail++] = nx;
          q[tail++] = ny;
        }
      }
    }
  }

  // 2. Clear enclosed islands/cavities of checkerboard in the upper region
  for (let y = 0; y < h * 0.55; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      if (visited[idx] === 0) {
        const srcIdx = idx * ch;
        const r = data[srcIdx], g = data[srcIdx+1], b = data[srcIdx+2];
        if (!isSkin(r, g, b, y)) {
          const lum = (r + g + b) / 3;
          const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
          if (lum >= 160 && maxDiff <= 25) {
            visited[idx] = 1;
          }
        }
      }
    }
  }

  // 3. BFS Queue Expansion into JPEG ringing
  head = 0; tail = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (visited[y * w + x] === 1) {
        q[tail++] = x;
        q[tail++] = y;
      }
    }
  }

  while (head < tail) {
    const cx = q[head++];
    const cy = q[head++];
    const neighbors = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]];
    for (let i = 0; i < 4; i++) {
      const nx = neighbors[i][0];
      const ny = neighbors[i][1];
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        const nidx = ny * w + nx;
        if (!visited[nidx]) {
          const srcIdx = nidx * ch;
          const r = data[srcIdx], g = data[srcIdx+1], b = data[srcIdx+2];
          if (!isSkin(r, g, b, ny)) {
            const lum = (r + g + b) / 3;
            const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
            if (lum >= 140 && maxDiff <= 28) {
              visited[nidx] = 1;
              q[tail++] = nx;
              q[tail++] = ny;
            }
          }
        }
      }
    }
  }

  // Pure clean white background (#FFFFFF)
  const outBuf = Buffer.alloc(w * h * 4);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      const srcIdx = idx * ch;
      const dstIdx = idx * 4;

      if (visited[idx] === 1) {
        outBuf[dstIdx] = 255;
        outBuf[dstIdx + 1] = 255;
        outBuf[dstIdx + 2] = 255;
        outBuf[dstIdx + 3] = 255;
      } else {
        const r = data[srcIdx];
        const g = data[srcIdx + 1];
        const b = data[srcIdx + 2];

        const isBoundary = (
          (x > 0 && visited[idx - 1] === 1) ||
          (x < w - 1 && visited[idx + 1] === 1) ||
          (y > 0 && visited[idx - w] === 1) ||
          (y < h - 1 && visited[idx + w] === 1)
        );

        if (isBoundary) {
          outBuf[dstIdx] = Math.round(r * 0.75 + 255 * 0.25);
          outBuf[dstIdx + 1] = Math.round(g * 0.75 + 255 * 0.25);
          outBuf[dstIdx + 2] = Math.round(b * 0.75 + 255 * 0.25);
          outBuf[dstIdx + 3] = 255;
        } else {
          outBuf[dstIdx] = r;
          outBuf[dstIdx + 1] = g;
          outBuf[dstIdx + 2] = b;
          outBuf[dstIdx + 3] = 255;
        }
      }
    }
  }

  const outDir = path.dirname(outputFile);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const targetW = 1200;
  const targetH = 1500;
  const left = Math.round((w - targetW) / 2);
  const top = Math.round(h * 0.05);

  await sharp(outBuf, { raw: { width: w, height: h, channels: 4 } })
    .extract({ left, top, width: targetW, height: targetH })
    .resize(800, 1000)
    .webp({ quality: 92 })
    .toFile(outputFile);

  console.log(`Saved ${outputFile} with clean white background.`);
}

async function run() {
  await processPhoto('208175.jpg', 'public/images/founders/muhammad-azhar.webp');
  await processPhoto('208202.jpg', 'public/images/founders/owais-ahmad.webp');
  console.log('Done processing founder photos with white background.');
}

run();
