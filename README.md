# IMMC — Infinite Mind Muscle Connection

Frontend-only pitch demo for **IMMC Fit Club**, a coach-led gym opposite Tiruvalam Road,
Brahmapuram, Vellore (near VIT).

Two surfaces in one app:

- **`/`** — public landing page: hero, philosophy, facilities, coaches, membership tiers,
  testimonials, location, and a 5-step registration flow.
- **`/admin`** — staff portal: dashboard, members, leads, packages, trainers, equipment,
  payments, and a site-content (CMS) panel.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:5173. The staff portal is at `/admin` — **any** username and
password signs you in.

## Stack

Vite · React 18 · Tailwind CSS · React Router. No backend.

## How state works

Everything lives in one React context ([`src/store/AppStore.jsx`](src/store/AppStore.jsx)) held
in memory. There is no database and nothing is persisted — **a page refresh resets all data to
the seed values.** That is deliberate for a pitch demo.

Because both surfaces read the same store, they stay in sync live:

- Registering on the landing page creates a real member **and** a payment record, both visible
  immediately in the admin portal.
- Submitting the contact form creates a lead in the admin leads tracker.
- Editing packages, trainers, equipment, or site copy in the admin portal updates the landing
  page instantly — no save step, no reload.

## Design system

Tokens (colour, type, spacing, radii) come from [`DESIGN.md`](DESIGN.md) and are mirrored into
[`tailwind.config.js`](tailwind.config.js). The admin portal reuses the same palette and font
families at higher density — that translation is documented at the top of
[`src/admin/adminUi.jsx`](src/admin/adminUi.jsx).

`code.html` and `screen.png` are the original Stitch design export, kept as visual reference.

## Placeholder data — replace before the real pitch

| What | Where |
|---|---|
| Membership prices, student rate, PT add-on | [`src/data/packages.js`](src/data/packages.js) |
| Phone, WhatsApp, email, Instagram | [`src/data/content.js`](src/data/content.js) |
| Photos | [`src/data/images.js`](src/data/images.js) → files in `public/photos/` |
| Coach names, specialties, bios | [`src/data/trainers.js`](src/data/trainers.js) — see the TODO block |

Member, lead, equipment, and payment records are all fabricated seed data.

## Scope boundaries

No class booking, scheduling, or reservations anywhere — membership is a package plus a
duration, with an optional personal-training add-on. No member portal in this pass.
