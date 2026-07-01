# Reef Pass Marine — website

A single-page site for boat hire, Cloudbreak surf transfers, and refreshments.
Built as plain HTML/CSS/JS so it runs on GitHub Pages with no build step.

## Files

- `index.html` — all page content and structure
- `styles.css` — design tokens (colors, type) and layout
- `script.js` — mobile nav, booking form, hero animation

## Before you go live — things to change

1. **Business name & tagline** — search `index.html` for "Reef Pass Marine" and
   replace with your real name if different. It also appears in the `<title>`
   and meta description at the top of the file.
2. **Contact details** — in `index.html`, update:
   - the phone number in the Contact section (`tel:` link)
   - the email address (`mailto:` link)
   - the departure point / running hours text
3. **WhatsApp number & email** — in `script.js`, update the two constants near
   the top:
   ```js
   const WHATSAPP_NUMBER = '6790000000'; // no + or spaces, country code first
   const BOOKING_EMAIL = 'bookings@reefpassmarine.fj';
   ```
4. **Boat specs / prices** — the fleet cards and instrument panel in the hero
   use placeholder numbers (transfer time, capacity, boat length). Swap in
   your real figures.
5. **Map** — the Contact section has a placeholder box. Replace it with a
   Google Maps `<iframe>` embed pointed at your actual departure jetty.
6. **Photos** — everything visual right now is hand-drawn SVG (boats, wave
   contours, icons) so the site doesn't depend on stock photo licensing.
   When you have real photos of your boats and Cloudbreak runs, you can swap
   the `.boat-illustration` SVGs or hero background for real `<img>` tags —
   happy to help wire that in when you have the media.

## Deploying to GitHub Pages

Since your repo is already set up:

```bash
git add index.html styles.css script.js
git commit -m "Add Reef Pass Marine site"
git push
```

Then in the repo's **Settings → Pages**, make sure the source is set to the
branch/folder these files live in (usually `main` branch, `/root`). GitHub
will give you a `https://<username>.github.io/<repo>` URL, or your custom
`.fj` domain if you've already pointed one at it (like you did for Royal
Customs Services).

## How booking currently works

There's no backend, so the form doesn't submit anywhere on its own. Instead:

- **"Send via WhatsApp"** opens `wa.me` with a pre-filled message containing
  all the booking details, ready to send to your number.
- **"Send via email instead"** opens the visitor's email client with the
  same details pre-filled.

This means every booking is a manual back-and-forth for now — you confirm
availability and price by replying, then tell them how to pay.

### If you'd rather use EmailJS

You've used EmailJS before on IgniteDaily, so it would drop in easily here
too — it would let form submissions land in your inbox automatically instead
of relying on the visitor's own WhatsApp/email client opening. If you want
that, share your EmailJS service ID, template ID, and public key and it can
be wired into `script.js` alongside (or instead of) the WhatsApp/email
buttons.

## Adding real payments later

GitHub Pages only serves static files — it can't run server-side code, so
payment processing needs a small piece hosted elsewhere that this site calls
out to. Roughly, in order of effort:

1. **Visa (easiest)** — a hosted checkout link, e.g. Stripe Checkout. You
   create a payment link in the Stripe dashboard (no server needed) and this
   site just links to it. Card payments start working with almost no code
   change.
2. **M‑PAiSA (Vodafone)** — requires registering as a merchant with Vodafone
   Fiji and integrating their payment API, which needs a small backend (a
   free-tier serverless function works fine) to hold your API credentials
   and confirm payments.
3. **MyCash (Digicel)** — same shape as M‑PAiSA: a Digicel merchant
   registration plus a backend to talk to their API.

A practical path: get the Visa/Stripe link live first since it needs no
merchant approval process, and pursue M‑PAiSA/MyCash merchant registration
in parallel — happy to help build the backend piece once you have accounts
for either.
