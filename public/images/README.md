# Images

**Do not edit anything in this folder by hand.** Every file here is generated. The masters
live in [`src/assets/photos/`](../../src/assets/photos/) and the mapping between them is in
[`scripts/process-photos.mjs`](../../scripts/process-photos.mjs).

To add or replace a photo:

1. Put the full resolution original in `src/assets/photos/`.
2. Add or edit a line in the `SHOTS` table in `scripts/process-photos.mjs`.
3. Run the build step.

```bash
npm run images
```

The script crops to the exact published dimensions, converts to WebP, and warns you if a
source is too small for the slot it is going into.

---

## Real photographs, in use

These came from the owner. They are phone and Google listing shots, so they are small. The
scale column shows how much each one had to be enlarged to fill its slot. Anything at or
above about 1.8x looks soft on a laptop screen.

| Published file | Master | Size | Scale | Shows | Used in |
| --- | --- | --- | --- | --- | --- |
| `outlet-cyberjaya.webp` | `storefront-straight.png` | 1200 x 800 | 0.50x | The shopfront straight on, in daylight. The whole sign is legible. **The only high resolution photograph on the site.** | `src/data/locations.ts`, locations page |
| `outlet-cyberjaya-night.webp` | `storefront-night.webp` | 660 x 440 | 1.73x | The same shopfront after dark, sign lit, diners under the awning. | Locations page, below the daylight shot |
| `outlet-cyberjaya-day.webp` | `storefront-day.webp` | 680 x 383 | 1.00x | The shopfront from the corner, showing the awning and the roadside tables. | Home page, beside the outlet card |
| `soup-mala.webp` | `bowls-mala-soup.webp` | 480 x 360 | 1.67x | Three bowls of mala soup with noodles and fishballs, chilli sauce beside them. | `src/data/dishes.ts`, home page dish card |
| `bar-trays.webp` | `counter-trays.webp` | 500 x 333 | 1.74x | Steel trays of prepared dishes on the counter. | Ingredient bar band, About page |
| `dish-skewers.webp` | `skewers-charcoal.webp` | 500 x 375 | 1.31x | Charcoal skewers of lamb and sweetcorn with chilli and cumin. | Ingredient bar band, About page |
| `bowls-table.webp` | `bowls-on-table.webp` | 480 x 360 | 1.67x | Five bowls of mala soup set out on a marble table. | Ingredient bar band |
| `sides-wings.webp` | `wings-grilled.jpg` | 400 x 300 | 1.65x | Charcoal grilled chicken wings on a rack, greens and dishes behind. | Menu page, sides and drinks |
| `dishes-takeaway.webp` | `dishes-takeaway.webp` | 480 x 360 | 1.67x | Takeaway tubs of stir fried dishes with bowls of white rice. | Menu page, sides and drinks |

Every photograph the owner has supplied is now placed. The two figures on the menu page are
marked `no-print`, so they do not appear on the printed menu.

---

## Still placeholders

Generated graphics in brand colours with a label printed on them. Structurally correct,
obviously unfinished.

| Filename | Dimensions | What the shot should contain | Used in |
| --- | --- | --- | --- |
| `soup-collagen.webp` | 800 x 600 | A full bowl of Creamy Collagen Soup. Milky white broth, sliced meat and greens in it. The contrast against the red room should be obvious. | `src/data/dishes.ts` |
| `dish-mala-noodles.webp` | 800 x 600 | Mala Stir-Fried Noodles on a plate, not in a bowl. Dark red sauce coating the noodles, visible wok char. | `src/data/dishes.ts` |
| `soup-tomato.webp` | 800 x 600 | A bowl of tomato base. Bright red, vegetables and noodle visible. | `src/data/dishes.ts`, menu page |
| `soup-clear.webp` | 800 x 600 | A bowl of clear chicken broth. Golden, tofu and greens visible through the liquid. | `src/data/dishes.ts`, menu page |

---

## The two shots worth booking a photographer for

**1. The ingredient bar, wide.** 1600 x 900, landscape, straight on, down the length of the
bar with every tray loaded. This is the shot that sells the concept and there is currently
nothing like it. The ingredient bar band on the home page was designed around a 16:9 lead
image and is running at 3:2 instead, because every photograph we have is a portrait phone
shot and a 16:9 crop of a portrait frame throws away most of the picture. Restore
`aspect-[3/2]` to `aspect-[16/9]` in `src/components/IngredientBarShowcase.astro` once it
exists.

**2. The dining room, wide.** 1200 x 900, with people in it. Long tables, enough width to
show the room is spacious.

---

## Brand assets

All three are generated. Do not edit them by hand.

```bash
npm run brand
```

| Filename | Dimensions | Notes |
| --- | --- | --- |
| `logo-musafir-qi.png` | 332 x 115 | **The real badge.** Built by `npm run images` from `src/assets/brand/musafir-qi-logo-cutout.png`. The supplied file had no transparency, so `scripts/cutout-logo.mjs` knocked the sign red out from behind it. If a vector master turns up, see handover 1.7. |
| `og-default.png` | 1200 x 630 | Share card for WhatsApp, Facebook, and X. Built by `npm run brand`, which embeds the badge into the SVG and renders it. |
| `og-default.svg` | 1200 x 630 | Written by `npm run brand`. Edit `scripts/build-brand-art.mjs`, not this file. |
| `../favicon.svg` | 48 x 48 | Also written by `npm run brand`. The full badge is unreadable at 16px, so the favicon keeps only the gold arch and the crescent on the badge's dark ground. |
| `apple-touch-icon.png` | 180 x 180 | Home screen icon on iOS. |
| `icon-192.png` | 192 x 192 | Android home screen icon, referenced by `site.webmanifest`. |
| `icon-512.png` | 512 x 512 | Android splash icon, referenced by `site.webmanifest`. |

---

## Photography direction

Shoot under the real shop lighting, not on a white studio sweep. The brand is a loud orange
and red shopfront, so the photos should look like the room and not like a stock library.
Shoot food from a low three quarter angle so you can see depth in the bowl. Shoot the
ingredient bar wide and straight on, along its length, so the number of trays reads.

Avoid: hands hovering with chopsticks, sprinkled chilli flakes arranged on the table,
scattered star anise as a border, anything shot on grey slate.

Get written consent from anyone identifiable before their photograph goes on the site.
