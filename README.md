# BBC — Billiards Bar Cafe

Marketing site for BBC, a snooker club, party floor and cafe in Vijay Nagar,
Indore. React + Vite + Tailwind. **Frontend only — there is no backend.**

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static bundle in dist/
npm run preview
```

`dist/` is plain static output — deploy it to any static host (Netlify, Vercel,
GitHub Pages, S3). Configure the host to rewrite unknown paths to `index.html`
so the client-side routes resolve on a hard refresh.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home — hero, the three offerings, signature plates, about, reviews, booking, contact |
| `/services` | Meals, party tables, snooker tables, cafe |
| `/snooker` | The snooker club: table lineup, rates, what comes with the table |
| `/restaurant` | Full menu with category filter |
| anything else | 404 |

## Layout

```
index.html
tailwind.config.js       design tokens: the black + yellow palette, fonts, motion
src/
  index.css              base layer, light-pool / felt / grain / reveal utilities
  App.jsx                routes
  data/site.js           all content — copy, menus, prices, contact details
  components/
    ui.jsx               buttons, Eyebrow, Rule, Numeral, Figure, Reveal, SectionHead
    Icon.jsx             inline SVG icon set
    Navbar.jsx           sticky nav + mobile drawer
    Footer.jsx
    Layout.jsx           shell, skip link, hash-anchor scrolling
    BookTableForm.jsx    client-side booking
  pages/                 Home, Services, Snooker, Restaurant, NotFound
public/assets/           imagery
```

Content lives in `src/data/site.js`; components stay presentational. To change a
price, a dish or a phone number, edit that file only.

## Design

Black and yellow — BBC's brand pair. Warm-tinted blacks so the yellow reads as
lamplight rather than hazard tape, with a three-step yellow scale (bright for
CTAs and prices, deeper for fills, dim low-alpha for rules and ghosted numerals).
Bodoni Moda for display, Outfit for everything else; the script face survives
only as the `BBC` monogram.

All colour is tokenised in `tailwind.config.js` — `room`, `ink`, `surface`,
`brass` (the yellow), `bone`. Change the palette there, not in components.

## The booking form

Client-side only. It validates on submit, rejects past dates, shows field-level
errors, renders a confirmation with a generated reference, and keeps recent
bookings in `localStorage` inside a `try/catch` so blocked storage degrades
quietly. **It does not send anything anywhere** — the confirmation copy says so.
Wiring it to a real service means adding a `fetch` in
`src/components/BookTableForm.jsx` and nothing else.

## Imagery

`bbcheoimg.jpg`, `snooker_bg.jpg` and `who_we_are.jpg` are real photographs of
the venue. Everything else in `public/assets/` is a stylised render produced
locally, standing in for photography that does not exist yet. They are
deliberately consistent — dark ground, single warm source — so they read as art
direction rather than as failed photos, but **real photography of the food and
the room would be a straight upgrade.** No image is hotlinked; there are no
external image hosts.

## Content that needs checking

The original site was largely lorem ipsum. Where that was true, the copy here is
plausible invented text written for the venue and **someone at BBC should verify
it before this goes live** — in particular the opening hours, the table notes and
rates on `/snooker`, and the dish descriptions. Prices, address, phone numbers
and email addresses are carried over from the original site unchanged.

## History

This started as a static PHP + jQuery site with a MySQL booking form. The PHP
backend, the prebuilt Tailwind bundles and the duplicated HTML pages were removed
when it moved to React; the original files remain in the git history.
