// The Orlando Bible — ticket model, built around the Smart Combo strategy.
//
// THE STRATEGY: on a two-week trip you don't need 14-day tickets. You need a
// Disney base ticket (4 days is the sweet spot) + a Universal 3-park short
// ticket + ONE night at a Premier hotel, which hands everyone in the room free
// Universal Express across the check-in AND check-out days. That beats two
// 14-day tickets on price AND gets the skip-the-line the 14-day buyers pay extra for.
//
// Figures are indicative 2026 GBP at ~$1.27 (pay in dollars on a fee-free card).
// Edit freely.

import { gbp } from "./budget";
export { gbp };

export const TCONFIG = {
  fx: 1.27,
  disneyDiscount: 0.20, // live 20% offer — set to 0 when it ends
  // Disney base tickets, per person, GBP, BEFORE discount. 14 = the full
  // 14-day product, useful in its own right for a single-resort onsite stay.
  disneyBase: {
    3: { adult: 355, child: 340 },
    4: { adult: 395, child: 380 },
    5: { adult: 425, child: 410 },
    7: { adult: 475, child: 455 },
    14: { adult: 620, child: 595 },
  },
  disney14: { adult: 620, child: 595 },
  // Universal 3-park (Studios, Islands of Adventure, Epic), per person
  uni3park: {
    2: { adult: 300, child: 290 },
    3: { adult: 355, child: 345 },
    14: { adult: 460, child: 445 },
  },
  uni14: { adult: 460, child: 445 },
  royalPacificNight: 400, // one night, whole family — unlocks free Express both days
  expressValuePerPersonDay: 180, // what Express would cost pp/day if bought
  bookingSources: ["Booking.com", "Trivago", "loveholidays", "Universal direct"],
  ticketSources: {
    primary: "OrlandoAttractions.com",
    note: "Always the .com. Sells the UK 7/14-day tickets priced in dollars, and matches or undercuts Disney/Universal. Their Universal Worldwide/USA area has 2- and 3-day tickets with free days — the best value for the Smart Combo's Universal leg.",
    fallback: "Disney direct & Universal direct",
    fallbackNote: "Worth checking direct too, especially with Disney's live 20% base-ticket discount.",
  },
};

// Single source of truth for how many days at each resort a trip needs —
// used by both the Ticket Decoder (to suggest a split) and the Itinerary
// engine (to actually generate that many park days), so the two screens
// never disagree with each other again. Calibrated so a standard 14-night
// both-resort trip lands on 4 Disney + 3 Universal, matching the costed
// flagship itinerary.
export function recommendDays(profile) {
  const nights = profile.nights || 14;
  if (profile.focus === "disney") return { disney: clampDisneyDays(Math.min(14, Math.round(nights * 0.65))), universal: 0 };
  if (profile.focus === "universal") return { disney: 0, universal: clampUniversalDays(Math.min(14, Math.round(nights * 0.65))) };
  const total = Math.max(4, Math.round(nights * 0.5)); // 14 nights → 7
  const disney = Math.max(1, Math.round(total * (4 / 7)));
  const universal = Math.max(1, total - disney);
  return { disney, universal: clampUniversalDays(universal) };
}

// Base-rate tickets only exist in real tiers (3/4/5/7, then a jump to the
// unlimited 14-day product). Clamp any raw day-count to the nearest real,
// purchasable tier rather than silently mispricing an unlisted number.
function clampDisneyDays(n) {
  if (n > 7) return 14;
  if (n <= 3) return 3;
  if (n === 6) return 7;
  return n; // 3, 4, 5 or 7 pass straight through
}
function clampUniversalDays(n) {
  if (n > 3) return 14; // the 3-park short ticket only goes up to 3 days
  if (n <= 2) return 2;
  return n; // 2 or 3
}

// L = { disneyDays, universalDays, kids10plus, disneyDiscount, expressHack }
export function computeTickets(profile, L) {
  const adultEq = profile.adults + profile.teens + L.kids10plus; // 10+ pay adult
  const childEq = Math.max(0, profile.children - L.kids10plus); // ages 3–9
  const heads = adultEq + childEq;
  const disc = L.disneyDiscount ? 1 - TCONFIG.disneyDiscount : 1;

  // --- Smart Combo ---
  const dBase = TCONFIG.disneyBase[L.disneyDays] || TCONFIG.disneyBase[4];
  const disneyCost = L.disneyDays > 0 ? (dBase.adult * adultEq + dBase.child * childEq) * disc : 0;

  const uBase = TCONFIG.uni3park[L.universalDays] || TCONFIG.uni3park[3];
  const universalCost = L.universalDays > 0 ? uBase.adult * adultEq + uBase.child * childEq : 0;

  const hotel = L.expressHack ? TCONFIG.royalPacificNight : 0;
  const smartTotal = disneyCost + universalCost + hotel;

  // --- 14-day alternative — resort-aware, so a single-resort trip isn't
  // unfairly compared against buying 14-day tickets for a park you're not visiting ---
  let alt14 = 0;
  if (profile.focus !== "universal") alt14 += TCONFIG.disney14.adult * adultEq + TCONFIG.disney14.child * childEq;
  if (profile.focus !== "disney") alt14 += TCONFIG.uni14.adult * adultEq + TCONFIG.uni14.child * childEq;

  const saving = Math.max(0, alt14 - smartTotal);

  // Express value the £400 night unlocks (everyone, two days)
  const expressValue = L.expressHack ? heads * TCONFIG.expressValuePerPersonDay * 2 : 0;

  const smartLines = [];
  if (L.disneyDays > 0) smartLines.push({ k: L.disneyDays === 14 ? "Disney 14-day ticket" : `Disney ${L.disneyDays}-day base`, v: disneyCost, note: L.disneyDiscount ? "20% live discount applied" : "no discount applied" });
  if (L.universalDays > 0) smartLines.push({ k: L.universalDays === 14 ? "Universal 14-day, 3 parks" : `Universal ${L.universalDays}-day, 3 parks`, v: universalCost, note: "Studios, Islands of Adventure, Epic" });
  if (hotel) smartLines.push({ k: "One night, Loews Royal Pacific", v: hotel, note: "free Express Unlimited, both days" });

  const insights = [];
  if (L.expressHack)
    insights.push({ tone: "good", text: `That single ${gbp(hotel)} night unlocks around ${gbp(expressValue)} of Universal Express — free skip-the-line for all ${heads} of you across the check-in and check-out days. Arrive ~7am, leave bags with the concierge, and you're skipping queues by opening.` });
  // Single-resort, onsite, long stay — the base-rate Smart Combo stops being
  // the smart choice once you're racking up 8+ days at one resort. Say so.
  const singleResortDays = profile.focus === "disney" ? L.disneyDays : profile.focus === "universal" ? L.universalDays : 0;
  if (profile.focus !== "both" && L.onsite && singleResortDays >= 8 && singleResortDays < 14) {
    const resortName = profile.focus === "disney" ? "Disney" : "Universal";
    insights.push({ tone: "note", text: `Staying on-site at ${resortName} only for ${singleResortDays}+ days? The base-rate ticket stops being the smart buy this long — switch the day selector above to 14 and price the full ${resortName} ticket instead. Unlimited days, no careful rationing.` });
  } else if (profile.focus !== "both" && singleResortDays === 14) {
    insights.push({ tone: "good", text: "The 14-day ticket is the right call for a long single-resort stay — unlimited entry for the whole trip, no need to ration days." });
  }
  if (L.disneyDiscount)
    insights.push({ tone: "note", text: "Disney's running a 20% base-ticket discount right now, direct and via UK sellers. Discounts come and go — grab it while it's live." });
  insights.push({ tone: "note", text: "UK travel has been softer this year (the World Cup may be pulling spend), so demand-driven discounts are out in the open. A good moment to book." });
  if (L.kids10plus > 0)
    insights.push({ tone: "warn", text: `In Orlando a "child" ticket is ages 3–9, so your ${L.kids10plus} aged 10+ pay adult prices. Catches a lot of UK families out.` });
Use Control + Shift + m to toggle the tab key moving focus. Alternatively, use esc then tab to move to the next interactive element on the page.

  return {
    adultEq, childEq, heads,
    smartTotal, alt14, saving, expressValue, hotel,
    smartLines, insights,
    sources: TCONFIG.bookingSources,
    ticketSources: TCONFIG.ticketSources,
  };
}
