# BBC — Billiards Bar Cafe

Static website for Billiards Bar Cafe, Vijay Nagar (Indore): snooker floor,
cafe dining and party lounge, with an online food ordering and table booking
flow.

Live: https://chandrashekhar080.github.io/BBCCafe/

## Pages

| Page | What it does |
| --- | --- |
| `index.html` | Home / landing page |
| `sevices.html` | Services overview |
| `snooker/` , `view_page/` | Snooker club and restaurant micro-sites |
| `menu.html` | Full food menu — search, category and veg filters, add to cart |
| `cart.html` | Cart with quantity controls and totals |
| `checkout.html` | Dine-in / takeaway / delivery details |
| `payment.html` | Payment step (UPI, card, net banking, pay at counter) |
| `booking.html` | Live seat map — pick date, slot, duration and tables |
| `success.html` | Order / booking receipt |
| `login.html`, `register.html` | Account sign in and sign up |
| `account.html` | Profile with order and booking history |

## The ordering flow

```
menu.html  ->  cart.html  ->  login (if needed)  ->  checkout.html
                                                          |
booking.html  ->  login (if needed)  ---------------------+
                                                          v
                                                    payment.html
                                                          |
                                                          v
                                                    success.html
```

## Shared runtime

Everything the flow needs lives in `app/`:

- `app/data.js` — the catalogue: dishes, seating zones and time slots. Add a
  dish here and it shows up on the menu, in the filters and in search.
- `app/app.js` — auth, cart, orders, bookings, the shared navbar, the cart
  drawer and toasts. Exposed as `window.BBC`.
- `app/app.css` — styles for the new pages. Written by hand so no Tailwind
  build step is needed.
- `app/nav-badge.js` — keeps the cart count and the Login / name label in sync
  on the original Tailwind pages, which keep their own markup.

## Demo behaviour — read before going live

This site is published as static files, so there is no server behind it.

- **Payments are simulated.** No money moves and no card data is sent
  anywhere. Paying by card with `4000 0000 0000 0002` demonstrates a declined
  payment; anything else succeeds after a short delay.
- **Accounts, orders and bookings live in `localStorage`**, so they exist only
  in the browser that created them and are lost when site data is cleared.
- **Passwords are scrambled, not secured.** `hashPassword()` in `app/app.js`
  keeps them out of storage in readable form, but anyone with access to the
  browser can read the data. Wire this to a real backend before using it with
  real accounts.
- **Seat availability is partly simulated.** Seats you booked are blocked for
  that date and slot; a few others are shown as pre-booked so an empty demo
  floor still looks like a real evening.

`index.php` is a leftover local-development endpoint for the old enquiry form
(MySQL, XAMPP). It does not run on GitHub Pages.

## Running locally

```bash
npm install
npm start        # vite dev server
```

Or serve the folder with any static file server — the new pages are plain
HTML, CSS and JavaScript with no build step.
