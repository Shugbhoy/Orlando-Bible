# The Orlando Bible

Honest, UK-family-first Orlando trip planning. Vite + React, mobile-first PWA,
deployed on Vercel. No third-party IP — the theme-park atmosphere is all
original artwork.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to /dist
npm run preview  # preview the production build
```

## How it's put together

The whole app hangs off one shared shell so every module looks and behaves the
same, and a family enters their core details only once.

```
src/
  theme.js                 Colour tokens (Navy/Teal/Amber + sunset accents) + fonts
  global.css               Reset, page frame, shared keyframes, reduced-motion
  main.jsx                 Entry point
  App.jsx                  Router + layout frame + provider + tab bar

  context/
    TripProfile.jsx        THE SPINE. Shared inputs (party, nights, season,
                           focus). Fill once, read everywhere via useTripProfile().

  components/              Shared furniture — one source of truth
    Brand.jsx              Logo Mark + Star (original spire, no IP)
    SkylineScene.jsx       Twilight theme-park silhouette (original)
    Header.jsx             Reusable banner; takes title + subtitle per module
    controls.jsx           Card, Stepper, Seg, Toggle, Chip, Row
    TabBar.jsx             Fixed bottom nav (NavLink → real routes)

  lib/                     Pure logic, editable in one place
    budget.js              CONFIG constants + compute()
    stay.js                WEIGHTS + score()

  modules/                 One file per screen — wiring only, no shared styles
    Plan.jsx               Home / module launcher
    BudgetCalculator.jsx   /budget
    StayDecider.jsx        /stay
    ComingSoon.jsx         Placeholder for /tickets and /more
```

Routes: `/` (Plan), `/budget`, `/stay`, `/tickets`, `/more`. Real URLs make the
modules shareable and ready for the eventual SEO play. `vercel.json` rewrites all
paths to `index.html` so deep links and refreshes resolve.

## Editing the numbers

All figures live in `src/lib/budget.js` (`CONFIG`) and `src/lib/stay.js`
(`WEIGHTS`). They're indicative 2026 GBP estimates at roughly £1 ≈ $1.27. Change
them there and every screen updates — no need to touch component code.

## Adding a new module (e.g. the Ticket Decoder)

1. Put the logic in `src/lib/tickets.js`.
2. Create `src/modules/TicketDecoder.jsx` — start with `<Header title=... />`,
   pull shared inputs from `useTripProfile()`, keep module-specific inputs in
   local `useState`, and reuse `Card` / `Stepper` / `Seg` from `controls.jsx`.
3. Add a `<Route path="/tickets" element={<TicketDecoder />} />` in `App.jsx`
   (replacing the ComingSoon placeholder).
4. Flip `ready: true` on the Tickets card in `Plan.jsx`.

## Deploy (GitHub → Vercel)

```bash
git init
git add .
git commit -m "Orlando Bible: shared shell + budget & stay modules"
git branch -M main
git remote add origin https://github.com/Shugbhoy/orlando-bible.git
git push -u origin main
```

Then in Vercel: New Project → import the repo. It auto-detects Vite (build
`npm run build`, output `dist`). Keep it on the preview URL — or add a
`noindex` header — until the MVP cluster is public-ready.

## Roadmap

Budget Calculator ✅ · Stay Decider ✅ · Ticket Decoder (next) · Money & tipping ·
Driving & tolls · Beyond the parks · Disney cruise + parks combo · AI "Ask the
Bible" (last, grounded on the finished module content).
