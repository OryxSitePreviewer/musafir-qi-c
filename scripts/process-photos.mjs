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
  // The straight on shot is the only high resolution photograph we have, so it
  // carries the outlet slot at full size with no upscaling at all.
  { from: 'storefront-straight.png', to: 'outlet-cyberjaya.webp', w: 1200, h: 800, position: 'centre' },
  // The night shot keeps the locations page from being one photograph.
  { from: 'storefront-night.webp', to: 'outlet-cyberjaya-night.webp', w: 660, h: 440, position: 'centre' },
  { from: 'bowls-mala-soup.webp', to: 'soup-mala.webp', w: 480, h: 360, position: 'centre' },
  { from: 'counter-trays.webp', to: 'bar-trays.webp', w: 500, h: 333, position: 'centre' },
  { from: 'skewers-charcoal.webp', to: 'dish-skewers.webp', w: 500, h: 375, position: 'centre' },
  { from: 'bowls-on-table.webp', to: 'bowls-table.webp', w: 480, h: 360, position: 'centre' },
  { from: 'dishes-takeaway.webp', to: 'dishes-takeaway.webp', w: 480, h: 360, position: 'centre' },
  { from: 'wings-grilled.jpg', to: 'sides-wings.webp', w: 400, h: 300, position: 'centre' },
];

/**
 * Brand marks from src/assets/brand/. These are never cropped, because cropping a
 * logo is vandalism. They are resized inside their own aspect ratio and keep their
 * transparency, so PNG rather than WebP.
 */
const BRAND = [
  // The cutout, not the raw file. See scripts/cutout-logo.mjs for why.
  { from: 'musafir-qi-logo-cutout.png', to: 'logo-musafir-qi.png', w: 332 },
];

/** Upscaling past this ratio turns a phone photo to mush. Warn, do not fail. */
const SOFT_LIMIT = 1.8;

let warnings = 0;

for (const mark of BRAND) {
  const from = join('src/assets/brand', mark.from);

  if (!existsSync(from)) {
    console.log(`  SKIP   ${mark.from} is not in src/assets/brand`);
    warnings += 1;
    continue;
  }

  await sharp(from)
    .resize(mark.w, null, { fit: 'inside', withoutEnlargement: true, kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toFile(join(OUT, mark.to));

  const meta = await sharp(join(OUT, mark.to)).metadata();
  const kb = Math.round(statSync(join(OUT, mark.to)).size / 1024);
  console.log(`  ${mark.to.padEnd(24)} ${meta.width}x${meta.height}  ${String(kb).padStart(3)}KB  brand mark`);
}

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
