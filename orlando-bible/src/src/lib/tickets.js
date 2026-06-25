// The Orlando Bible — ticket model.
// Two resorts, each with its own logic. Indicative 2026 GBP estimates from a
// UK-reseller starting point (£1 ≈ $1.27). Edit freely — the value is the
// decision logic and the honesty, not penny-accurate prices.

import { gbp } from "./budget";
export { gbp };

export const TCONFIG = {
  fx: 1.27,
  longTripNights: 10, // at/above this, UK 14-day tickets are the sweet spot
  gateMarkup: 1.18, // gate prices ~18% above a UK reseller
  disney: {
    // per person, by how many Disney days you need
    bands: [
      { max: 3, adult: 330, child: 315 },
      { max: 5, adult: 430, child: 410 },
      { max: 9, adult: 510, child: 490 },
      { max: 99, adult: 575, child: 555 }, // 10-14 day territory
    ],
    hopperAddon: 75, // per person, only when not already bundled
    waterPark: 60,
  },
  universal: {
    bands2: [
      { max: 2, adult: 235, child: 225 },
      { max: 5, adult: 330, child: 315 },
      { max: 99, adult: 400, child: 385 },
    ],
    bands3: [
      // includes Epic Universe (the new third park)
      { max: 2, adult: 305, child: 290 },
      { max: 5, adult: 415, child: 400 },
      { max: 99, adult: 485, child: 465 },
    ],
    p2pAddon: 60, // Park-to-Park (needed for the Hogwarts Express hop)
    volcanoBay: 55,
  },
};

const pick = (bands, days) => bands.find((b) => days <= b.max) || bands[bands.length - 1];

// Suggested split of park days from the trip profile.
export function recommendDays(profile) {
  const total = Math.max(1, Math.min(14, Math.round(profile.nights * 0.65)));
  if (profile.focus === "disney") return { disney: total, universal: 0 };
  if (profile.focus === "universal") return { disney: 0, universal: total };
  const disney = Math.max(1, Math.round(total * 0.6));
  const universal = Math.max(1, total - disney);
  return { disney, universal };
}

// L = local inputs: { disneyDays, universalDays, hopper, p2p, epic, disneyWater, uniWater, kids10plus }
export function computeTickets(profile, L) {
  const long = profile.nights >= TCONFIG.longTripNights;
  const adultEq = profile.adults + profile.teens + L.kids10plus; // 10+ pay adult
  const childEq = Math.max(0, profile.children - L.kids10plus); // ages ~3-9
  const heads = adultEq + childEq;

  const insights = [];
  let disney = null;
  let universal = null;
  let total = 0;

  if (L.disneyDays > 0) {
    const effDays = long ? 14 : L.disneyDays;
    const b = pick(TCONFIG.disney.bands, effDays);
    const pp = { adult: b.adult, child: b.child };
    const addons = [];
    const hopperBundled = long;
    if (hopperBundled) addons.push("Park Hopper (bundled)");
    else if (L.hopper) { pp.adult += TCONFIG.disney.hopperAddon; pp.child += TCONFIG.disney.hopperAddon; addons.push("Park Hopper"); }
    if (L.disneyWater) { pp.adult += TCONFIG.disney.waterPark; pp.child += TCONFIG.disney.waterPark; addons.push("Water parks"); }
    const cost = pp.adult * adultEq + pp.child * childEq;
    total += cost;
    disney = { title: long ? "Disney 14-day ticket" : `Disney ${L.disneyDays}-day ticket`, addons, cost, ppAdult: pp.adult, ppChild: pp.child, need: L.disneyDays };
  }

  if (L.universalDays > 0) {
    const effDays = long ? 14 : L.universalDays;
    const bands = L.epic ? TCONFIG.universal.bands3 : TCONFIG.universal.bands2;
    const b = pick(bands, effDays);
    const pp = { adult: b.adult, child: b.child };
    const addons = [L.epic ? "3 parks incl Epic Universe" : "2 parks"];
    const p2pBundled = long;
    if (L.p2p && p2pBundled) addons.push("Park-to-Park (bundled)");
    else if (L.p2p) { pp.adult += TCONFIG.universal.p2pAddon; pp.child += TCONFIG.universal.p2pAddon; addons.push("Park-to-Park"); }
    if (L.uniWater) { pp.adult += TCONFIG.universal.volcanoBay; pp.child += TCONFIG.universal.volcanoBay; addons.push("Volcano Bay"); }
    const cost = pp.adult * adultEq + pp.child * childEq;
    total += cost;
    universal = { title: long ? "Universal 14-day ticket" : `Universal ${L.universalDays}-day ticket`, addons, cost, ppAdult: pp.adult, ppChild: pp.child, need: L.universalDays };
  }

  const gateTotal = total * TCONFIG.gateMarkup;
  const saving = gateTotal - total;

  if (long && (disney || universal))
    insights.push({ tone: "good", text: "Your trip is long enough that 14-day tickets cost barely more than shorter ones — buy them for unlimited park days and the freedom to rest whenever you like." });
  if (L.kids10plus > 0)
    insights.push({ tone: "warn", text: `In Orlando a "child" ticket is ages 3–9, so your ${L.kids10plus} child${L.kids10plus > 1 ? "ren" : ""} aged 10+ pay full adult prices. It catches a lot of UK families out.` });
  if (disney && long)
    insights.push({ tone: "good", text: "UK 14-day Disney tickets usually bundle Park Hopper and Memory Maker photos — a big part of why they're such good value." });
  if (disney && !long && L.hopper)
    insights.push({ tone: "note", text: "Park Hopper earns its place if you like drifting between parks on a whim. First-timers on a tight schedule often don't use it — skip it and save if your days are already mapped out." });
  if (universal && L.universalDays >= 2 && L.p2p)
    insights.push({ tone: "note", text: "Park-to-Park is what lets you ride the Hogwarts Express between the two Universal parks. If that ride matters to your family, you need it." });
  if (L.epic)
    insights.push({ tone: "note", text: "Epic Universe is Universal's big new park and demand is high — plan it early in the day and expect bigger crowds than the older parks." });
  if (disney && L.disneyDays > profile.nights - 1)
    insights.push({ tone: "warn", text: "You've set more Disney days than you have nights — leave room for travel, rest and Universal." });

  return { disney, universal, total, gateTotal, saving, heads, adultEq, childEq, long, insights };
}
