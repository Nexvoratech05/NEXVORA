const sharp = require('sharp');
const fs = require('fs');

async function extractAuthenticLogo() {
  const img = sharp('e:/Own_Staetup/208590.jpg');
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height, ch = info.channels;

  // Bounding box with clean padding
  const minX = 278, maxX = 2122, minY = 635, maxY = 1153;
  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;

  const darkBuf = Buffer.alloc(cropW * cropH * 4);
  const whiteBuf = Buffer.alloc(cropW * cropH * 4);

  // Icon only
  const markMinX = 278, markMaxX = 895, markMinY = 635, markMaxY = 1153;
  const markW = markMaxX - markMinX + 1;
  const markH = markMaxY - markMinY + 1;
  const iconBuf = Buffer.alloc(markW * markH * 4);

  for (let cy = 0; cy < cropH; cy++) {
    for (let cx = 0; cx < cropW; cx++) {
      const x = minX + cx;
      const y = minY + cy;
      const srcIdx = (y * w + x) * ch;
      const dstIdx = (cy * cropW + cx) * 4;

      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];

      const lum = (r + g + b) / 3;
      const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));

      const isMarkArea = (x < 930);

      if (isMarkArea) {
        if (maxDiff <= 6 && lum >= 200) {
          darkBuf[dstIdx + 3] = 0;
          whiteBuf[dstIdx + 3] = 0;
        } else {
          let alpha = 255;
          if (maxDiff < 36 && lum > 190) {
            alpha = Math.min(255, Math.max(0, Math.round((maxDiff / 36) * 255)));
          }
          const aNorm = alpha / 255;
          let pureR = r, pureG = g, pureB = b;
          if (aNorm > 0.05 && aNorm < 0.98) {
            pureR = Math.max(0, Math.min(255, Math.round((r - 255 * (1 - aNorm)) / aNorm)));
            pureG = Math.max(0, Math.min(255, Math.round((g - 255 * (1 - aNorm)) / aNorm)));
            pureB = Math.max(0, Math.min(255, Math.round((b - 255 * (1 - aNorm)) / aNorm)));
          }

          darkBuf[dstIdx] = pureR;
          darkBuf[dstIdx + 1] = pureG;
          darkBuf[dstIdx + 2] = pureB;
          darkBuf[dstIdx + 3] = alpha;

          whiteBuf[dstIdx] = pureR;
          whiteBuf[dstIdx + 1] = pureG;
          whiteBuf[dstIdx + 2] = pureB;
          whiteBuf[dstIdx + 3] = alpha;
        }
      } else {
        if (lum >= 200 && maxDiff <= 8) {
          darkBuf[dstIdx + 3] = 0;
          whiteBuf[dstIdx + 3] = 0;
        } else {
          let alpha = 255;
          if (lum > 50) {
            alpha = Math.min(255, Math.max(0, Math.round(((220 - lum) / (220 - 45)) * 255)));
          }

          darkBuf[dstIdx] = 7;
          darkBuf[dstIdx + 1] = 20;
          darkBuf[dstIdx + 2] = 38;
          darkBuf[dstIdx + 3] = alpha;

          whiteBuf[dstIdx] = 255;
          whiteBuf[dstIdx + 1] = 255;
          whiteBuf[dstIdx + 2] = 255;
          whiteBuf[dstIdx + 3] = alpha;
        }
      }

      if (x >= markMinX && x <= markMaxX && y >= markMinY && y <= markMaxY) {
        const iconCx = x - markMinX;
        const iconCy = y - markMinY;
        const iconDstIdx = (iconCy * markW + iconCx) * 4;
        iconBuf[iconDstIdx] = darkBuf[dstIdx];
        iconBuf[iconDstIdx + 1] = darkBuf[dstIdx + 1];
        iconBuf[iconDstIdx + 2] = darkBuf[dstIdx + 2];
        iconBuf[iconDstIdx + 3] = darkBuf[dstIdx + 3];
      }
    }
  }

  // Save PNGs and WebPs
  await sharp(darkBuf, { raw: { width: cropW, height: cropH, channels: 4 } }).png({ compressionLevel: 9 }).toFile('public/logo.png');
  await sharp(darkBuf, { raw: { width: cropW, height: cropH, channels: 4 } }).webp({ quality: 95 }).toFile('public/logo.webp');
  await sharp(whiteBuf, { raw: { width: cropW, height: cropH, channels: 4 } }).png({ compressionLevel: 9 }).toFile('public/logo-white.png');
  await sharp(whiteBuf, { raw: { width: cropW, height: cropH, channels: 4 } }).webp({ quality: 95 }).toFile('public/logo-white.webp');
  await sharp(iconBuf, { raw: { width: markW, height: markH, channels: 4 } }).png({ compressionLevel: 9 }).toFile('public/logo-icon.png');
  await sharp(iconBuf, { raw: { width: markW, height: markH, channels: 4 } }).webp({ quality: 95 }).toFile('public/logo-icon.webp');

  // SVG Wrappers with lossless base64
  function makeSvg(pngPath, outSvgPath, width, height) {
    const b64 = fs.readFileSync(pngPath).toString('base64');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" fill="none">\n  <image width="${width}" height="${height}" href="data:image/png;base64,${b64}"/>\n</svg>\n`;
    fs.writeFileSync(outSvgPath, svg, 'utf8');
  }

  makeSvg('public/logo.png', 'public/logo.svg', cropW, cropH);
  makeSvg('public/logo-white.png', 'public/logo-white.svg', cropW, cropH);
  makeSvg('public/logo-icon.png', 'public/logo-icon.svg', markW, markH);
  makeSvg('public/logo-icon.png', 'public/favicon.svg', markW, markH);
  makeSvg('public/logo-icon.png', 'src/app/icon.svg', markW, markH);

  console.log('Authentic logo generation complete.');
}

extractAuthenticLogo();
