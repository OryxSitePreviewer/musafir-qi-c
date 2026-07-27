# Images

Every file in this folder is a **placeholder**. They are generated WebP graphics with the
brand colours and a label printed on them, sized to the exact dimensions the layout expects.
The site looks structurally correct with them in place, and obviously unfinished, which is
the point.

## How to replace one

1. Shoot or export the photo.
2. Save it as **WebP**, at the exact pixel dimensions in the table below.
3. Give it the exact filename in the table.
4. Drop it in this folder, overwriting the placeholder.
5. Rebuild. Nothing else needs changing, because the `width` and `height` attributes in the
   markup already match these dimensions.

If you change a dimension, update the matching `width` and `height` attributes in the
component listed in the last column, or the browser will reserve the wrong space and the
page will shift as images load. That shift is a direct Lighthouse penalty.

## Photography direction

Shoot everything under the real shop lighting, not on a white studio sweep. The brand is a
loud red shopfront, so the photos should look like the room and not like a stock library.
Shoot food from a low three quarter angle so you can see depth in the bowl. Shoot the
ingredient bar wide and straight on, along its length, so the sheer number of trays reads.

Avoid: hands hovering with chopsticks, sprinkled chilli flakes arranged on the table,
scattered star anise as a border, anything shot on grey slate.

## Required images

| Filename | Dimensions | What the shot should contain | Used in |
| --- | --- | --- | --- |
| `soup-mala.webp` | 800 x 600 | A full bowl of Thick and Spicy Mala Soup. Deep red surface with chilli and Sichuan peppercorn floating on the oil. Steam visible. Shot from a low three quarter angle. | `src/data/dishes.ts`, home page cards |
| `soup-collagen.webp` | 800 x 600 | A full bowl of Creamy Collagen Soup. Milky white broth, sliced meat and greens sitting in it. The contrast against the red room should be obvious. | `src/data/dishes.ts` |
| `dish-mala-noodles.webp` | 800 x 600 | Mala Stir-Fried Noodles on a plate, not in a bowl. Dark red sauce coating the noodles, visible wok char on the edges. | `src/data/dishes.ts` |
| `soup-tomato.webp` | 800 x 600 | A bowl of tomato base. Bright red, vegetables and noodle visible. | `src/data/dishes.ts`, menu page |
| `soup-clear.webp` | 800 x 600 | A bowl of clear chicken broth. Golden, clean, tofu and greens visible through the liquid. | `src/data/dishes.ts`, menu page |
| `bar-wide.webp` | 1600 x 900 | The hero shot of the whole site. The full length of the ingredient bar, straight on, every tray loaded. This is the shot that sells the concept, so give it the most attention. | `src/components/IngredientBarShowcase.astro` |
| `bar-vegetables.webp` | 800 x 600 | The vegetable section of the bar, close. Leafy greens, corn, lotus root, mushrooms, all fresh and stacked high. | `src/components/IngredientBarShowcase.astro` |
| `bar-meatballs.webp` | 800 x 600 | The protein section of the bar, close. Beef and chicken balls, fish tofu, sliced meat rolls in their trays with tongs. | `src/components/IngredientBarShowcase.astro` |
| `outlet-cyberjaya.webp` | 1200 x 800 | The shopfront at CBD Perdana 3, from across the walkway. Signage legible, glass frontage, ideally at dusk when the sign reads brightest. | `src/data/locations.ts`, locations page |
| `room-cyberjaya.webp` | 1200 x 900 | The dining room with people in it. Long tables, the red and gold wall, enough width to show the room is spacious. | `src/pages/about.astro` |
| `team-counter.webp` | 1200 x 900 | Staff cooking bowls to order behind the counter, in front of the soup pots. Faces optional, hands and steam essential. Get written consent from anyone identifiable. | `src/pages/about.astro` |

## Brand and social assets

| Filename | Dimensions | Notes |
| --- | --- | --- |
| `logo.svg` | 520 x 140 | **Temporary reconstruction.** Replace with the real wordmark. Also update `src/components/Wordmark.astro`, which draws the header lockup in live markup rather than loading this file. |
| `og-default.png` | 1200 x 630 | The card shown when someone shares a link on WhatsApp, Facebook, or X. Currently a generated red card with the stand-in wordmark. Rebuild it with real artwork and, ideally, the `bar-wide` shot behind a dark overlay. |
| `og-default.svg` | 1200 x 630 | The source for the PNG above. Edit this and re-export if you want to keep the generated version. |
| `apple-touch-icon.png` | 180 x 180 | Home screen icon on iOS. |
| `icon-192.png` | 192 x 192 | Android home screen icon, referenced by `site.webmanifest`. |
| `icon-512.png` | 512 x 512 | Android splash icon, referenced by `site.webmanifest`. |
| `../favicon.svg` | 48 x 48 viewBox | Browser tab icon. Lives one level up, in `public/`. |

## Exporting WebP

Any of these work:

```bash
# ImageMagick
magick input.jpg -resize 1600x900^ -gravity center -extent 1600x900 -quality 82 bar-wide.webp
```

```bash
# cwebp, from Google's libwebp
cwebp -q 82 -resize 1600 900 input.jpg -o bar-wide.webp
```

Quality 80 to 85 is the right range. Above 90 the file gets large with no visible gain on a
phone. Keep every file under about 250 KB, and keep `bar-wide.webp` under 400 KB.
