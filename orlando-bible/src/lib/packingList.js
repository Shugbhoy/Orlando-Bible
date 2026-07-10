// The Orlando Bible — UK → Florida packing list.
// Organised so the things worth packing and the things worth buying on
// arrival (cheaper, no luggage weight) are both clear — ties into the
// Walmart-run advice already in the Deals module.

export const CATEGORIES = [
  {
    id: "documents",
    title: "Documents",
    items: [
      { id: "passport", text: "Passport, valid 6+ months past your return date" },
      { id: "esta", text: "ESTA approval — apply well ahead, print a backup copy" },
      { id: "insurance", text: "Travel insurance details, saved offline too" },
      { id: "licence", text: "UK driving licence, if hiring a car (a physical card licence, not just the app)" },
      { id: "bookings", text: "Tickets, dining reservations & the booking checklist — screenshotted, not just emailed" },
    ],
  },
  {
    id: "electronics",
    title: "Electronics",
    items: [
      { id: "adapter", text: "US plug adapters (Type A/B) — the US runs 120V, UK 230V, different pin shape entirely" },
      { id: "voltage", text: "Check hairdryers/straighteners are dual-voltage before packing — many aren't, and can genuinely burn out or spark on US power" },
      { id: "powerbank", text: "A portable charger — park days are long and phones die fast on Wi-Fi/GPS/camera" },
      { id: "pouch", text: "A waterproof phone pouch for the water rides and parks" },
      { id: "esim", text: "eSIM set up before you fly (see the app list) — doubles as your sat nav" },
    ],
  },
  {
    id: "money",
    title: "Money",
    items: [
      { id: "card", text: "A fee-free travel card, activated and tested before you fly" },
      { id: "cash", text: "A little cash in dollars for tipping — cards don't always cover it gracefully" },
      { id: "backup", text: "A second card, kept separate from the first, in case one's lost or blocked" },
    ],
  },
  {
    id: "clothing",
    title: "Clothing",
    items: [
      { id: "shoes", text: "Broken-in comfortable shoes — never wear brand-new shoes for a park day" },
      { id: "poncho", text: "Cheap rain ponchos, packed from home — Florida's afternoon storms are frequent, and ponchos cost far more bought in-park" },
      { id: "layer", text: "A light layer for indoor AC and cooler evenings, even in summer" },
      { id: "swim", text: "Swimwear, packed even on a non-water-park day — the villa/hotel pool matters too" },
      { id: "hat", text: "A wide-brim hat or cap" },
    ],
  },
  {
    id: "sun-health",
    title: "Sun & health",
    items: [
      { id: "meds", text: "Regular medication, in original packaging, with a copy of the prescription" },
      { id: "blister", text: "Blister plasters — the walking adds up fast, more than people expect" },
      { id: "lipspf", text: "SPF lip balm" },
      { id: "sickness", text: "Travel sickness tablets, if anyone in the party needs them for flights or coasters" },
    ],
  },
];

// The other half of the story — don't waste suitcase weight or money on
// these. Buy them at Walmart on day one instead (see the Deals module).
export const BUY_THERE_INSTEAD = [
  "Sun cream — bulky, heavy, and Walmart's is no more expensive than home",
  "Bottled water & snacks for the villa/hotel room",
  "A cheap stroller, if you need one, rather than paying to rent one daily",
  "Nappies, wipes & baby essentials — no reason to fly with a suitcase of them",
  "A cool bag or small cooler if you're going the villa/self-catering route",
];
