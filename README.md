# Musafir Qi Stesen Mala

Marketing website for a pick-and-weigh, pork-free malatang restaurant with one outlet in
Cyberjaya, Selangor.

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). It
builds to plain static HTML with no server, no database, and no CMS. Drop the output folder
on any host that can serve files.

---

## Quick start

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:4321.

| Command | What it does |
| --- | --- |
| `npm install` | Installs dependencies. Run once. |
| `npm run dev` | Starts the local dev server with hot reload. |
| `npm run build` | Builds the production site into `dist/`. |
| `npm run preview` | Serves the built `dist/` folder so you can check it before deploying. |
| `npm run check` | Type checks every page and component. Run this before you deploy. |

---

## Editing content

**You should not need to touch any markup to change what the site says.** All content lives
in typed files under `src/data/`. Each file has comments at the top explaining what it does.

| File | What you change here |
| --- | --- |
| `src/data/site.ts` | Business name, domain, WhatsApp number, phone, email, social links, Google Analytics ID. |
| `src/data/pricing.ts` | **The price per 100 grams.** One number, used everywhere. Also the portion size guides. |
| `src/data/ingredients.ts` | Every ingredient on the bar, grouped by category, with average gram weights. |
| `src/data/dishes.ts` | Soup bases, spice levels, sides, drinks, and their prices. |
| `src/data/locations.ts` | The outlet address, opening hours, coordinates, parking notes, landmarks. |
| `src/data/faq.ts` | The questions and answers in the home page accordion. |
| `src/data/halal.ts` | The kitchen policy and the halal certification wording. **Read the notes in this file before editing.** |
| `src/data/steps.ts` | The four step flow and the first timer guide. |
| `src/data/about.ts` | The About page story. |
| `src/data/nav.ts` | The navigation items. |

### Changing the price

Open `src/data/pricing.ts` and change one line:

```ts
export const PRICE_PER_100G = 6.9;
```

That number drives the Build Your Bowl estimator, the price shown on the menu page, the
worked example on the How It Works page, and the `priceRange` in the search engine
structured data. Nothing else needs touching.

### Adding an ingredient

Open `src/data/ingredients.ts`, find the right category, and add one line:

```ts
{ name: 'Prawn Ball', grams: 18 },
```

It appears in the estimator and on the menu page immediately. Removing an ingredient is
deleting that line.

### Changing opening hours

Open `src/data/locations.ts`. The outlet has both a machine readable `hours` array and a
human readable `hoursDisplay` string. **Change both.** The array drives the live open or
closed badge and the search engine structured data. The string is what visitors read.

```ts
hours: [{ opens: '10:30', closes: '23:30', days: ALL_DAYS }],
hoursDisplay: '10:30 AM to 11:30 PM, daily',
```

Times are 24 hour, in Malaysian local time. The open or closed badge is calculated in the
visitor's browser using the `Asia/Kuala_Lumpur` timezone, so someone checking from Singapore
or London still sees whether the shop is open here.

### Changing images

See [`public/images/README.md`](public/images/README.md). It lists every image slot with its
exact filename, target dimensions, and what the shot should contain.

### Turning on Google Analytics

Open `src/data/site.ts` and set your measurement ID:

```ts
googleAnalyticsId: 'G-XXXXXXXXXX',
```

While that field is empty **no tracking script is loaded at all**, and no requests go to
Google. There are no other trackers on the site.

---

## Deploying

Run `npm run build` first. Everything ends up in `dist/`.

Before your first deploy, set the real domain in `src/data/site.ts`:

```ts
url: 'https://drmala.com.my',
```

That value is used for the sitemap, the canonical URLs, and the social share cards. Getting
it wrong will not break the site but it will hurt search results. Also update the `Sitemap:`
line at the bottom of `public/robots.txt` to match.

### Netlify

Connect the repository and Netlify will read `netlify.toml`. Nothing else to configure.

If you prefer to deploy by hand, run `npm run build` and drag the `dist/` folder into the
Netlify dashboard.

### Vercel

Connect the repository. Vercel detects Astro automatically. `vercel.json` is included for
the cache headers.

### cPanel, or any plain shared host

1. Run `npm run build` on your own machine.
2. Open the `dist/` folder.
3. Upload **everything inside it** to `public_html` over FTP or the cPanel File Manager.

Do not upload the `dist` folder itself, upload its contents. There is nothing to install on
the server, no Node.js needed, and no database. The site is a set of HTML files.

The build emits `/menu/index.html` rather than `/menu.html`, so Apache resolves `/menu`
without any `.htaccess` rewrite rules.

---

## How the site is put together

```
src/
  data/         Everything the owner edits. Typed, commented, no markup.
  components/   Reusable pieces. Header, footer, estimator, cards, icons.
  layouts/      Base.astro wraps every page with the head, header, and footer.
  lib/          Structured data builders and the open or closed hours logic.
  pages/        One file per URL.
  styles/       global.css holds the brand tokens, fonts, and component classes.
public/
  fonts/        Self hosted WOFF2. Nothing is loaded from Google Fonts at runtime.
  images/       Photography and brand assets. See the README in there.
```

### Fonts

Three faces, all self hosted, 68 KB in total:

- **Anton** for display headings. Heavy and condensed, like painted shopfront lettering.
- **IBM Plex Sans** for body text. One variable file covers weights 400 to 700, and it has
  real tabular figures so the numbers in the estimator do not jitter as they update.
- **Noto Sans SC** for the Chinese characters, subset down to only the glyphs this site
  actually uses. That takes it from about 4 MB to about 4 KB.

Nothing is requested from `fonts.googleapis.com` at runtime, so there is no render blocking
third party request. If you add new Chinese characters anywhere, the subset will not cover
them and they will fall back to a system font. Regenerate the subset if that happens.

### JavaScript

There is very little, and none of it is a framework. Four small vanilla scripts:

1. The mobile navigation toggle.
2. The Build Your Bowl estimator.
3. The open or closed badge.
4. The scroll reveal animation.

The FAQ accordion is built on native `<details>` elements and needs no JavaScript at all.
Every one of these degrades cleanly. With JavaScript off you still get the full menu, the
printed opening hours, working navigation, and a working FAQ.

### Accessibility and motion

Every animation is disabled when the visitor has `prefers-reduced-motion` set. Focus rings
are visible on every interactive element. The estimator is fully operable from the keyboard,
including the category tabs, which follow the standard arrow key pattern.

### The colour rule

Gold on red fails contrast at body size. Gold is only used at 28px and above, or as borders
and rules. Green and blue only appear as category coding and trust marks. If you add
anything to this site, keep to that.

---

## Before launch

See [`HANDOVER.md`](HANDOVER.md). It lists every placeholder value and every fact that was
assumed rather than confirmed. **The WhatsApp number and the halal certification wording are
both placeholders and must be replaced.**
