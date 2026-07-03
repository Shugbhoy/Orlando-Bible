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
  // Disney base tickets, per person, GBP, BEFORE discount
  disneyBase: {
    3: { adult: 355, child: 340 },
    4: { adult: 395, child: 380 },
    5: { adult: 425, child: 410 },
    7: { adult: 475, child: 455 },
  },
  disney14: { adult: 620, child: 595 },
  // Universal 3-park (Studios, Islands of Adventure, Epic), per person
  uni3park: {
    2: { adult: 300, child: 290 },
    3: { adult: 355, child: 345 },
  },
  uni14: { adult: 460, child: 445 },
  royalPacificNight: 400, // one night, whole family — unlocks free Express both days
  expressValuePerPersonDay: 180, // what Express would cost pp/day if bought
  bookingSources: ["Booking.com", "Trivago", "loveholidays", "Universal direct"],
};

// L = { disneyDays, universalDays, kids10plus, disneyDiscount, expressHack }
export function computeTickets(profile, L) {
  const adultEq = profile.adults + profile.teens + L.kids10plus; // 10+ pay adult
  const childEq = Math.max(0, profile.children - L.kids10plus); // ages 3–9
  const heads = adultEq + childEq;
  const disc = L.disneyDiscount ? 1 - TCONFIG.disneyDiscount : 1;

  // --- Smart Combo ---
  const dBase = TCONFIG.disneyBase[L.disneyDays] || TCONFIG.disneyBase[4];
  const disneyCost = (dBase.adult * adultEq + dBase.child * childEq) * disc;

  const uBase = TCONFIG.uni3park[L.universalDays] || TCONFIG.uni3park[3];
  const universalCost = uBase.adult * adultEq + uBase.child * childEq;

  const hotel = L.expressHack ? TCONFIG.royalPacificNight : 0;
  const smartTotal = disneyCost + universalCost + hotel;

  // --- 14-day alternative (the pricier default most people buy) ---
  const alt14 =
    TCONFIG.disney14.adult * adultEq + TCONFIG.disney14.child * childEq +
    TCONFIG.uni14.adult * adultEq + TCONFIG.uni14.child * childEq;

  const saving = Math.max(0, alt14 - smartTotal);

  // Express value the £400 night unlocks (everyone, two days)
  const expressValue = L.expressHack ? heads * TCONFIG.expressValuePerPersonDay * 2 : 0;

  const smartLines = [
    { k: `Disney ${L.disneyDays}-day base`, v: disneyCost, note: L.disneyDiscount ? "20% live discount applied" : "no discount applied" },
    { k: `Universal ${L.universalDays}-day, 3 parks`, v: universalCost, note: "Studios, Islands of Adventure, Epic" },
  ];
  if (hotel) smartLines.push({ k: "One night, Loews Royal Pacific", v: hotel, note: "free Express Unlimited, both days" });

  const insights = [];
  if (L.expressHack)
    insights.push({ tone: "good", text: `That single ${gbp(hotel)} night unlocks around ${gbp(expressValue)} of Universal Express — free skip-the-line for all ${heads} of you across the check-in and check-out days. Arrive ~7am, leave bags with the concierge, and you're skipping queues by opening.` });
  if (L.disneyDiscount)
    insights.push({ tone: "note", text: "Disney's running a 20% base-ticket discount right now, direct and via UK sellers. Discounts come and go — grab it while it's live." });
  insights.push({ tone: "note", text: "UK travel has been softer this year (the World Cup may be pulling spend), so demand-driven discounts are out in the open. A good moment to book." });
  if (L.kids10plus > 0)
    insights.push({ tone: "warn", text: `In Orlando a "child" ticket is ages 3–9, so your ${L.kids10plus} aged 10+ pay adult prices. Catches a lot of UK families out.` });

  return {
    adultEq, childEq, heads,
    smartTotal, alt14, saving, expressValue, hotel,
    smartLines, insights,
    sources: TCONFIG.bookingSources,
  };
}
