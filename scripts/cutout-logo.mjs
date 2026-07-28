/**
 * The supplied logo is a crop off the signage artwork. It has an alpha channel but
 * every pixel is opaque, and the badge sits on a slab of sign red (#AC2526) that
 * does not match the brand red (#DA291C). Dropped straight onto the site it reads
 * as a rectangle of slightly wrong red around the badge.
 *
 * This knocks the surround out by flooding inward from the border and clearing
 * only pixels connected to the edge that are within tolerance of the sign red.
 * Flooding rather than a global colour replace is what protects the badge, which
 * contains reds of its own that are not connected to the outside.
 *
 *   node scripts/cutout-logo.mjs
 *
 * This is a one-off repair. If a proper transparent or vector logo arrives, delete
 * this script and put the real file in src/assets/brand/ instead.
 */

import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

const SRC = 'src/assets/brand/musafir-qi-logo.png';
const OUT = 'src/assets/brand/musafir-qi-logo-cutout.png';

/** How far a pixel can sit from the sampled surround colour and still be surround. */
const TOLERANCE = 62;
/** Pixels within this of the edge of tolerance get partial alpha, to soften the cut. */
const FEATHER = 22;

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const px = Buffer.from(data);

// Sample the four corners and average them. That is the surround colour.
const corners = [
  [0, 0],
  [width - 1, 0],
  [0, height - 1],
  [width - 1, height - 1],
];
let sr = 0;
let sg = 0;
let sb = 0;
for (const [x, y] of corners) {
  const i = (y * width + x) * channels;
  sr += px[i];
  sg += px[i + 1];
  sb += px[i + 2];
}
sr /= 4;
sg /= 4;
sb /= 4;

const distance = (i) => Math.hypot(px[i] - sr, px[i + 1] - sg, px[i + 2] - sb);

// Breadth first flood from every border pixel.
const seen = new Uint8Array(width * height);
const queue = [];

for (let x = 0; x < width; x += 1) {
  queue.push([x, 0], [x, height - 1]);
}
for (let y = 0; y < height; y += 1) {
  queue.push([0, y], [width - 1, y]);
}

let cleared = 0;
let feathered = 0;

while (queue.length) {
  const [x, y] = queue.pop();
  if (x < 0 || y < 0 || x >= width || y >= height) continue;

  const key = y * width + x;
  if (seen[key]) continue;

  const i = key * channels;
  const d = distance(i);
  if (d > TOLERANCE + FEATHER) continue;

  seen[key] = 1;

  if (d <= TOLERANCE) {
    px[i + 3] = 0;
    cleared += 1;
  } else {
    // Inside the feather band. Ramp alpha so the cut edge is not a hard staircase.
    px[i + 3] = Math.round(((d - TOLERANCE) / FEATHER) * 255);
    feathered += 1;
  }

  queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
}

const png = await sharp(px, { raw: { width, height, channels } })
  .png({ compressionLevel: 9 })
  .toBuffer();

writeFileSync(OUT, png);

const total = width * height;
console.log(`  surround sampled at rgb(${Math.round(sr)}, ${Math.round(sg)}, ${Math.round(sb)})`);
console.log(`  cleared   ${cleared} px  (${((cleared / total) * 100).toFixed(1)}% of the image)`);
console.log(`  feathered ${feathered} px`);
console.log(`  wrote     ${OUT}`);
