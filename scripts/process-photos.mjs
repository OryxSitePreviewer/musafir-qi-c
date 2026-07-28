/**
 * Turns the master photographs in src/assets/photos/ into the exact web sized
 * WebP files the site serves from public/images/.
 *
 *   npm run images
 *
 * Why this exists: the originals are phone photographs in whatever size and
 * aspect ratio the camera produced. The layout needs specific dimensions, and
 * the width and height attributes in the markup have to match them or the page
 * shifts as images load. This script is the one place that mapping lives.
 *
 * ---------------------------------------------------------------------------
 * TO ADD OR REPLACE A PHOTO
 * ---------------------------------------------------------------------------
 *   1. Put the full resolution original in src/assets/photos/
 *   2. Add or edit a line in the SHOTS table below
 *   3. Run: npm run images
 *
 * Keep the originals. Never edit anything in public/images/ by hand, because
 * this script overwrites it.
 * ---------------------------------------------------------------------------
 */

import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const ASSETS = 'src/assets/photos';
const OUT = 'public/images';

/**
 * from     file in src/assets/photos
 * to       file written to public/images
 * w, h     published pixel size. These MUST match the width and height
 *          attributes wherever the image is used.
 * position which part of the frame to keep when cropping. 'north' keeps the
 *          top, which is what you want for a shopfront where the sign matters.
 */
const SHOTS = [
  // 'centre' keeps the sign and the awning and seating below it. 'north' pulls in
  // three storeys of the building above the shop and pushes the sign off the bottom.
  { from: 'storefront-night.webp', to: 'outlet-cyberjaya.webp', w: 660, h: 440, position: 'centre' },
  { from: 'bowls-mala-soup.webp', to: 'soup-mala.webp', w: 480, h: 360, position: 'centre' },
  { from: 'counter-trays.webp', to: 'bar-trays.webp', w: 500, h: 333, position: 'centre' },
  { from: 'skewers-charcoal.webp', to: 'dish-skewers.webp', w: 500, h: 375, position: 'centre' },
  { from: 'bowls-on-table.webp', to: 'bowls-table.webp', w: 480, h: 360, position: 'centre' },
  { from: 'dishes-takeaway.webp', to: 'dishes-takeaway.webp', w: 480, h: 360, position: 'centre' },
  { from: 'wings-grilled.jpg', to: 'sides-wings.webp', w: 400, h: 300, position: 'centre' },
];

/** Upscaling past this ratio turns a phone photo to mush. Warn, do not fail. */
const SOFT_LIMIT = 1.8;

let warnings = 0;

for (const shot of SHOTS) {
  const from = join(ASSETS, shot.from);

  if (!existsSync(from)) {
    console.log(`  SKIP   ${shot.from} is not in ${ASSETS}`);
    warnings += 1;
    continue;
  }

  const meta = await sharp(from).metadata();
  const scale = shot.w / meta.width;

  await sharp(from)
    .resize(shot.w, shot.h, { fit: 'cover', position: shot.position, kernel: 'lanczos3' })
    .webp({ quality: 82 })
    .toFile(join(OUT, shot.to));

  const kb = Math.round(statSync(join(OUT, shot.to)).size / 1024);
  const flag = scale > SOFT_LIMIT ? '  <-- upscaled, will look soft' : '';
  if (scale > SOFT_LIMIT) warnings += 1;

  console.log(
    `  ${shot.to.padEnd(24)} ${shot.w}x${shot.h}  ${String(kb).padStart(3)}KB  ` +
      `from ${meta.width}x${meta.height} (${scale.toFixed(2)}x)${flag}`
  );
}

console.log(
  warnings ? `\nDone, with ${warnings} thing(s) worth looking at above.` : '\nDone. All shots built.'
);
