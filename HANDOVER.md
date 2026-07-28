# Handover

Everything I could not confirm, and everything you must change before this goes live.

I wrote all the copy. Where I did not have a fact, I wrote a plausible draft and marked it
in a code comment rather than leaving a gap on the page, so the layout is finished and the
gaps are findable. Nothing marked TODO appears as a TODO to a visitor.

To find every open item in the code:

```bash
grep -rn "TODO" src/
```

---

## 1. Blocking. Do not launch without these

### 1.1 The WhatsApp number is fake

`src/data/site.ts` → `whatsappNumber: '60120000000'`

Every WhatsApp link on the site is built from this one value: the nav button, the floating
bubble, the location card, the outlet block, and all four closing call-to-action bands.
They all currently go nowhere.

Replace it with the real number in international format, no plus sign, no spaces, no dashes.
A Malaysian mobile looks like `60123456789`.

Also update `phoneDisplay` in the same file and in `src/data/locations.ts`. Both currently
read `+60 12-000 0000`.

### 1.2 The halal certification wording is a placeholder

`src/data/halal.ts`

This is the one that carries legal risk, so I built a guard rather than trusting the TODO to
be spotted. The page will not print a certification claim until you write one. Right now it
prints this instead:

> We do not display a halal certificate on this website yet. We will publish the certifying
> authority, the certificate number, and the expiry date here as soon as the document is in
> hand. Until then, ask at the counter and our staff will show you the current paperwork.

That is honest and safe. Replace `certificationStatement` with your exact wording and the
guard releases automatically.

**I did not invent a certificate number, a certifying authority, a JAKIM reference, or a
logo, and you should not add one unless you hold the document.** Misstating halal status in
Malaysia is a Trade Descriptions Act problem, not a marketing problem.

The FAQ answer "Is the food halal?" in `src/data/faq.ts` also needs a pass once the status is
settled.

### 1.3 The price per 100 grams is a guess

`src/data/pricing.ts` → `PRICE_PER_100G = 6.9`

I set RM 6.90 because it is the going rate for pick-and-weigh malatang in the Klang Valley.
It is not your rate. This one number drives the Build Your Bowl estimator, the menu page
header, the worked example on the How It Works page, and the `priceRange` in the search
engine structured data. Change it and everything follows.

Also confirm `SOUP_BASE_INCLUDED`. The site currently tells customers the soup base is
included in the weighed price.

### 1.4 The domain is a guess

`src/data/site.ts` → `url: 'https://drmala.com.my'`

Used for the sitemap, the canonical URLs, and the social share cards. Update it, then update
the `Sitemap:` line at the bottom of `public/robots.txt` to match.

### 1.5 Every image is a placeholder

`public/images/` now holds five real photographs and four generated placeholders. See `public/images/README.md` for the filename, dimensions, and shot brief for each
one. The `bar-wide.webp` slot is the one that matters most, because the wide ingredient bar
shot is what sells the concept.

The logo is a reconstruction. `public/images/logo.svg` and `src/components/Wordmark.astro`
are both marked as temporary stand-ins in comments.

---

## 1.6 The shopfront sign says the site is describing the wrong business

The photographs you sent settle two things the brief did not.

The sign reads **Hot Pot, Charcoal Skewers, Malatang**, and the second line reads
**Restoran Masakan Asli China Muslim**. The photographs back it up. There are charcoal
skewers of lamb and sweetcorn, grilled chicken wings, trays of prepared dishes on the
counter, and takeaway tubs with rice.

This site describes a pick-and-weigh malatang bar and nothing else, because that is what
the brief described. That is at best a third of what you sell.

I have not invented a hot pot menu or a skewers menu, because I do not have the items or
the prices. What I did:

- Added a section to the About page, `More than the malatang bar` in `src/data/about.ts`,
  that names hot pot and charcoal skewers and says the pick-and-weigh bar is what the rest
  of the site explains. It is honest and it is short.
- Put the skewers photograph on the About page and in the ingredient bar band so the
  grill is visible somewhere.
- Added `signBoard` to `src/data/site.ts` holding the exact sign wording.

**What you need to decide.** Either the site stays a malatang site with hot pot and skewers
acknowledged, or it becomes a site for all three. The second option means new menu data for
the grill and the hot pot, and probably a section on the home page. Tell me which and I will
build it.

## 1.7 The logo is in, but it wants a clean master

The real badge is now the logo everywhere: the header, the footer, the share card, and the
`Organization` structured data. The reconstruction is deleted.

Two things about the file you gave me.

**It had no transparency.** Every pixel was opaque and the badge sat on a slab of sign red
(`#AC2526`) that does not match the brand red (`#DA291C`), so dropped straight in it read as
a rectangle of slightly wrong red around the badge. `scripts/cutout-logo.mjs` knocks the
surround out by flooding inward from the border, which protects the reds inside the badge.
The result is `src/assets/brand/musafir-qi-logo-cutout.png` and that is what the site uses.

**It is 332 x 115.** That is enough for the header, where it runs at 34px tall, and for the
share card. It is not enough for print, a shopfront reprint, or a large hero treatment.

If your designer still has the source, send the AI, EPS, or SVG. Drop it in
`src/assets/brand/`, point the `BRAND` table in `scripts/process-photos.mjs` at it, delete
`scripts/cutout-logo.mjs`, and run `npm run images` then `npm run brand`.

## 1.8 The sign shows a company registration I did not publish

The straight on shopfront photograph is high enough resolution to read the fine print under
the sign board:

> DIMILIKI OLEH MUSAFIR DI SDN. BHD. 202601008310 (1460322 - H)

That is the registered operating entity. I have **not** put it anywhere on the site, because
publishing a company number is your call and I could not confirm it belongs in the footer.
Most Malaysian restaurant sites carry it in the footer copyright line. Tell me and I will add
it to `src/data/site.ts`.

---

## 2. The one design decision I need you to make

**Brand gold `#D4AF37` on brand red `#DA291C` measures 2.31:1.**

The brief said gold fails on red at body size and is fine at 28px and above. That is not
quite right. WCAG asks for 3:1 even for large display text, and this pairing is at 2.31:1 at
every size. It is legible in practice at 44px and above, which is why it looks fine on the
page, but Lighthouse and axe will both flag it.

The brief also asks for Lighthouse 95+ on accessibility. Those two requirements cannot both
be met with this exact pairing, so I need a decision rather than a silent choice.

**What I shipped:** the exact palette you specified. Gold headlines on red, as designed.

**What it costs:** 18 flagged elements across the six pages, all of them the same pairing.
Expect the accessibility score to land somewhere around 88 to 92 rather than 95+.

**How to switch, if you want the score instead.** One line, in `src/styles/global.css`:

```css
--mala-gold-on-red: #d4af37;   /* change to #f5d77a */
```

`#F5D77A` is the same hue lifted in value until it clears the threshold. It measures 3.46:1
on red. I tested it: that single change clears all 18 flags and nothing else on the site
changes, because every gold-on-red headline and the header lockup all read from that one
property. Gold on ink and gold on cream are both well clear either way and are untouched.

Everything else on the site passes WCAG AA. I fixed nine other contrast problems I found on
the way, including 12px eyebrow text at 80% white on red, the active navigation link in gold
at 14px, and gold section numerals on white.

---

## 3. Facts I assumed

These are all live on the site as written. Correct anything that is wrong.

### Ingredients and weights

`src/data/ingredients.ts` lists 73 ingredients with an average gram weight each. **I invented
every one of those weights.** They are careful estimates from standard portion sizes, and
they are what the estimator adds up. Put a sample of each item on your counter scale and
correct the numbers, or the estimate will not match the till.

The ingredient list itself is a plausible malatang bar, not your actual bar. Add what you
carry and delete what you do not.

### The headline count

The site says "60+ fresh ingredients" because that is what the brief said, even though the
list holds 73. That is deliberate. `INGREDIENT_CLAIM` in `src/data/ingredients.ts` is a
separate constant from the live count, so the marketing claim stays defensible on a slow day
when a tray is empty. The build throws if you ever set the claim above the real count.

### Soup bases

Thick and Spicy Mala Soup, Creamy Collagen Soup, and Mala Stir-Fried Noodles came from you.
**Tomato Soup and Clear Chicken Broth I added** because a malatang shop almost always carries
a mild base, and the FAQ needed a real answer for children. Both are marked TODO in
`src/data/dishes.ts`. Delete them if you do not carry them.

### Spice levels

Five levels, 不辣 / 微辣 / 小辣 / 中辣 / 大辣, mapped to No Chilli, Mild, Medium, Spicy, Extra
Spicy. That is the standard malatang ladder. Confirm it matches what your counter staff
actually ask for.

### Sides, drinks, and their prices

Every price in `ADD_ON_GROUPS` in `src/data/dishes.ts` is invented, set at a plausible Klang
Valley rate. So is the item list. Do not print the menu until you have been through this
block.

### Outlet coordinates

`src/data/locations.ts` has an approximate latitude and longitude taken from the district,
not from your shopfront:

- Cyberjaya: `2.9188, 101.6541`

Drop a pin on the actual door and replace it. Google uses these for the map and for local
search, so being 200 metres out costs you walk-ins.

### Parking and landmarks

I wrote the parking notes and nearby landmarks from general knowledge of the area. Read them and correct anything that is not true. The claim that Cyberjaya
parking is free after office hours is the one most likely to be wrong.

### Room descriptions

"Long tables that seat eight", "space to park a stroller", "high chairs available at the
counter" all appear on the site and in the FAQ. I inferred them from the brief's description
of the vibe as spacious and family friendly. Confirm or cut.

### FAQ answers I could not verify

Marked TODO in `src/data/faq.ts`:

- **Group seating.** I said to message a day ahead for parties of ten or more. I do not know
  if you accept that, or what your real minimum and notice period are.
- **Delivery.** I said delivery runs through the major apps without naming any, because I do
  not know which platforms are live. Name them and add direct links.
- **Payment methods.** I listed cash, cards, DuitNow QR, Touch n Go, and GrabPay. Confirm.
- **Cooking time.** I said five to eight minutes, longer at the rush. That is an estimate.

### Social links

`src/data/site.ts` has Facebook, Instagram, and TikTok pointing at the platform home pages,
because I do not have your handles. They are in the footer on every page. Fix or remove.

### Email address

`hello@drmala.com.my` is invented. It is in the footer.

### The Chinese characters

The site shows 麻辣烫 next to the Latin name in the header eyebrow, the footer, and the About
page. That is the dish name, málàtàng, which is factual. If Musafir Qi Stesen Mala has an official Chinese
wordmark that differs, change `chineseName` in `src/data/site.ts`.

Note that the Chinese font is subset to only the glyphs currently used, for size. If you add
new Chinese characters anywhere, they will fall back to a system font until the subset is
regenerated. The command is in `README.md`.

---

## 4. Things I decided, so you know they were decisions

- **No reservation form.** This is a walk-in, pay-by-weight shop. A booking form would
  misrepresent how it operates. The call to action is WhatsApp and directions.
- **No testimonials, no Instagram feed.** Both would have been fabricated.
- **No hero photograph.** I have no photography, and a flat red band with the wordmark is
  closer to a real shopfront than a stock photo behind a dark overlay. It also removes the
  hero image from the largest-contentful-paint path entirely, which is worth real points on a
  phone.
- **Maps do not load until you click.** A Google Maps embed pulls roughly a megabyte. Both
  outlet maps sit behind a "Load the map" button, and the plain directions link underneath
  works with no JavaScript at all.
- **The open or closed badge is computed in the browser**, in `Asia/Kuala_Lumpur` time, not at
  build time. A build-time timestamp goes stale the moment the page is cached. Someone
  checking from Singapore or London sees whether you are open here, not there. There are 15
  tests covering it, including the overnight-hours case, in `tests/hours.test.mts`. Run
  `npm test`.
- **No tracking of any kind ships by default.** No script is emitted at all until you set
  `googleAnalyticsId` in `src/data/site.ts`.

---

## 5. Verified before handover

| Check | Result |
| --- | --- |
| `npm run build` | Clean, 6 pages |
| `npm run check` | 0 errors, 0 warnings, 0 hints |
| `npm test` | 15 passed, across four host timezones |
| Horizontal overflow at 320, 375, 768, 1440 | None |
| Contrast, all six pages | Clean except the documented gold-on-red decision |
| Heading order, all pages | No skipped levels, one h1 each |
| Images | All have alt text, width, height, and lazy loading |
| `target="_blank"` links | All carry `rel="noopener"` |
| Structured data | Valid JSON on every page. Organization, WebSite, two Restaurant graphs with `openingHoursSpecification`, `geo`, `servesCuisine`, and `priceRange`, plus FAQPage on the home page |
| Estimator, keyboard only | Tabs respond to arrows, Home, and End. Chips toggle. Steppers work. Focus returns correctly on removal. Live region announces the running total |
| Fonts | Three faces, self hosted, 68 KB total. No request to any third party |
| Third party requests on load | None |

### Known gaps in that verification

- I did not run Lighthouse itself. The score claims above are reasoned from the audits it
  runs, not measured. Run it against a production build once the real images are in, because
  image weight is the thing most likely to move the performance number.
- `prefers-reduced-motion` is implemented and present in the built CSS, and the reveal script
  branches on it, but I could not toggle the setting in this environment to watch it happen.
- Print output was verified by reading the compiled stylesheet and by wiring a `beforeprint`
  handler that expands every FAQ answer. I did not put it through a real printer.
