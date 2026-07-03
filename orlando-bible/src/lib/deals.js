// The Orlando Bible — Deals & Tips data.
// The backbone is hard-won, lived advice. Each tip is tagged for what it saves
// (money in GBP for a family of 4, and/or time), so the module can tally a
// running "a family of 4 could save ~£X" estimate.
//
// HONESTY NOTE: money figures are indicative for a family of 4 on a two-week
// trip, and they don't all stack cleanly (some overlap). The UI lets the user
// toggle tips in and out of the estimate. Edit freely.

import { gbp } from "./budget";
export { gbp };

// tip shape: { id, title, text, money, timeHours, affiliate, caveat, defaultOn }
export const CATEGORIES = [
  {
    id: "getting-there",
    title: "Getting there",
    icon: "plane",
    blurb: "Where and when you book is a price lever most families never pull.",
    tips: [
      {
        id: "depart-smart",
        title: "Pick your departure airport on price, not habit",
        text: "Fares swing wildly by airport. North-of-England families can save by driving up to Glasgow, and Manchester is often the sweet spot for Virgin. Treat the airport as a variable, not a given — the drive can pay for itself many times over.",
        money: 400, timeHours: 0, affiliate: null,
        caveat: "Factor in parking and the drive; the saving has to clear those.",
        defaultOn: true,
      },
      {
        id: "tui-timing",
        title: "Book a TUI package at the optimum window",
        text: "Package prices move with demand. Booking a TUI deal at the right moment — not the school-holiday panic peak — can shave a serious chunk off flights, accommodation and transfers in one go.",
        money: 300, timeHours: 0, affiliate: "TUI",
        caveat: "Always price a DIY build against the package — sometimes DIY still wins.",
        defaultOn: true,
      },
      {
        id: "tesco-virgin",
        title: "Funnel Tesco Clubcard points into Virgin flights",
        text: "Clubcard points convert to Virgin Atlantic points at 1:2, so the weekly shop quietly builds toward a flight. Watch for periodic conversion bonuses that sweeten the rate further.",
        money: 100, timeHours: 0, affiliate: null,
        caveat: "A slow burn — best if you already shop at Tesco. Not a quick win.",
        defaultOn: false,
      },
    ],
  },
  {
    id: "express-hack",
    title: "The Universal Express hack",
    icon: "bolt",
    blurb: "The single best time-and-money move at Universal.",
    tips: [
      {
        id: "express-overnight",
        title: "One £400 night = ~£1,400 of free Express",
        text: "Book a single night at Loews Royal Pacific (around £400 for a family of four) and get there for 7am, bags with the concierge. Free Universal Express Unlimited then covers everyone in the room across check-in AND check-out days — two full park days of skip-the-line, worth roughly £180pp/day. Compare the night on Booking.com, Trivago, loveholidays and Universal direct, and confirm Express is included before you pay.",
        money: 1000, timeHours: 12, affiliate: "Booking.com",
        caveat: "Express doesn't cover Volcano Bay or Epic Universe, and a few headliners (Hagrid's, VelociCoaster) are excluded. The perk is tied to the qualifying on-site room, so verify on any third-party rate.",
        defaultOn: true,
      },
    ],
  },
  {
    id: "tickets",
    title: "Tickets",
    icon: "ticket",
    blurb: "Never pay full whack at the turnstile.",
    tips: [
      {
        id: "compare-resellers",
        title: "Cross-check UK resellers, never buy at the gate",
        text: "Price the same ticket across AttractionTickets, FloridaTix and Orlando Attractions before buying. The gate is always the most expensive way in. Watch for recurring discount codes.",
        money: 150, timeHours: 0, affiliate: "AttractionTickets",
        caveat: null, defaultOn: true,
      },
      {
        id: "14day-sweet-spot",
        title: "The 14-day ticket is barely more than a 7-day",
        text: "On a fortnight trip the 14-day ticket gives unlimited park days and usually bundles Memory Maker — often cheaper per day than a 7-day. Don't over-buy days you won't use; build in rest days.",
        money: 80, timeHours: 0, affiliate: null,
        caveat: null, defaultOn: true,
      },
      {
        id: "dollar-tickets",
        title: "Check the dollar price on Orlandoattractions.com",
        text: "Their 1-day tickets and bundles priced in dollars can undercut the sterling resellers. Always cross-check the US-dollar buy — sometimes it's the cheapest route of all.",
        money: 60, timeHours: 0, affiliate: "Orlando Attractions",
        caveat: "Pay on a fee-free card so FX doesn't eat the saving.",
        defaultOn: true,
      },
    ],
  },
  {
    id: "stay",
    title: "Where to stay (value)",
    icon: "bed",
    blurb: "If a villa isn't your thing, these earn their write-ups.",
    tips: [
      {
        id: "hotel-value-picks",
        title: "Proven value hotels",
        text: "Marriott and Fairfield in Lake Buena Vista, and Comfort Suites as the strong-TripAdvisor B&B-style pick — comfortable, well-rated bases that won't shred the budget the way on-site rates can.",
        money: 300, timeHours: 0, affiliate: "Booking.com",
        caveat: null, defaultOn: false,
      },
      {
        id: "lobby-discounts",
        title: "Raid the hotel lobby discount books",
        text: "Those brochure racks and front-desk coupon booklets most people walk past are real money off dining and attractions. Five minutes in the lobby on arrival can pay for a meal.",
        money: 40, timeHours: 0, affiliate: null,
        caveat: null, defaultOn: true,
      },
      {
        id: "villa-kitchen",
        title: "A villa kitchen is the quiet money-saver",
        text: "Self-catering breakfasts and some dinners across two weeks saves hundreds versus eating out every meal — the single biggest reason a villa wins for longer family trips.",
        money: 250, timeHours: 0, affiliate: null,
        caveat: "Pool heating is a paid extra (~£175/week) and genuinely needed Oct–March.",
        defaultOn: false,
      },
    ],
  },
  {
    id: "walmart-run",
    title: "The Walmart run",
    icon: "cart",
    blurb: "First stop off the plane. A mindset, not an errand.",
    tips: [
      {
        id: "walmart-groceries",
        title: "Stock up at Walmart on day one",
        text: "Hit Walmart straight off the plane for groceries, drinks, snacks and sun cream at a fraction of park or hotel prices. Self-catering breakfasts and packing park snacks is where the everyday saving lives.",
        money: 250, timeHours: 0, affiliate: null,
        caveat: null, defaultOn: true,
      },
      {
        id: "buy-stroller",
        title: "Buy a cheap stroller, don't rent buggies daily",
        text: "A $20–30 umbrella stroller from Walmart beats renting a buggy at every park, every day. Over a fortnight that's a huge gap. Bin it, donate it, or take it home.",
        money: 200, timeHours: 0, affiliate: null,
        caveat: null, defaultOn: true,
      },
      {
        id: "freeze-drinks",
        title: "Freeze your drinks overnight for the parks",
        text: "Freeze water bottles and drinks at your accommodation overnight; they thaw cold through the day and double as ice. Disney and Universal both let you bring in your own water and a soft-sided cooler — so you skip $4 bottles and the queues for them.",
        money: 120, timeHours: 1, affiliate: null,
        caveat: null, defaultOn: true,
      },
      {
        id: "car-restraint",
        title: "Pack your own car seat / booster",
        text: "Bring the right child restraint in your luggage and skip the rental car add-on fee, which stacks up fast over two weeks.",
        money: 60, timeHours: 0, affiliate: null,
        caveat: "Florida law requires under-4s in a proper car seat, not just a booster — bring the right one for your child's age.",
        defaultOn: true,
      },
    ],
  },
  {
    id: "eating",
    title: "Eating well for less",
    icon: "fork",
    blurb: "Feed the family without feeding the machine.",
    tips: [
      {
        id: "kids-eat-free",
        title: "Get a Kids Eat Free Card",
        text: "Accepted at 100+ family restaurants, unlimited for 90 days, with one child eating free per paying adult. It's often bundled free with UK bookings — saving up to $200 per child per week and the single biggest dining win for UK families.",
        money: 350, timeHours: 0, affiliate: "Ocean Florida",
        caveat: null, defaultOn: true,
      },
      {
        id: "birthday-freebies",
        title: "Sign up for birthday freebies before you fly",
        text: "Join the restaurant rewards apps and email lists before the trip: free birthday meals and treats await, and the parks play along — Universal's free birthday button, SeaWorld and Legoland free child birthday admission, Disney celebration buttons.",
        money: 40, timeHours: 0, affiliate: null,
        caveat: null, defaultOn: true,
      },
      {
        id: "big-breakfast",
        title: "Make breakfast the big meal",
        text: "A proper American breakfast — IHOP, Denny's, Cracker Barrel or a buffet — fuels a full park day and lets you eat lighter and cheaper later. The best-value meal of the day, used well, reshapes the whole food budget.",
        money: 150, timeHours: 0, affiliate: null,
        caveat: null, defaultOn: true,
      },
      {
        id: "cheap-feeds",
        title: "Know your cheap feeds",
        text: "Spots like Cici's all-you-can-eat pizza fill a family for next to nothing. Keep a few in your back pocket for the days you don't want to think about it.",
        money: 80, timeHours: 0, affiliate: null,
        caveat: null, defaultOn: true,
      },
    ],
  },
  {
    id: "disney-dollars",
    title: "Disney dollars (advanced)",
    icon: "gift",
    blurb: "For the organised — a few extra percent on everything.",
    tips: [
      {
        id: "discounted-gift-cards",
        title: "Buy Disney gift cards at a discount",
        text: "Disney gift cards sell at 5% off year-round via Target or warehouse clubs, occasionally up to 10% in doorbuster events — then spend them on tickets, food and merch. A few percent off a £5,000 trip is real money.",
        money: 100, timeHours: 0, affiliate: null,
        caveat: "The cleanest discounts need a US card or club membership — an advanced, if-you're-organised tier.",
        defaultOn: false,
      },
      {
        id: "costco-usa",
        title: "Sign up for Costco in the States",
        text: "A US warehouse membership unlocks cheap fuel, bulk groceries and discounted gift cards — the enabler that makes several of the advanced savings actually work.",
        money: 30, timeHours: 0, affiliate: null,
        caveat: null, defaultOn: false,
      },
    ],
  },
  {
    id: "connect-money",
    title: "Stay connected & your money",
    icon: "phone",
    blurb: "Two small set-ups that quietly save on everything.",
    tips: [
      {
        id: "esim-satnav",
        title: "A cheap eSIM is your data AND your sat nav",
        text: "A travel eSIM bought before you fly turns your phone into the sat nav, so you skip both roaming charges and the rental-car GPS fee in one move. Airalo, Saily or Holafly for unlimited.",
        money: 120, timeHours: 1, affiliate: "Airalo",
        caveat: null, defaultOn: true,
      },
      {
        id: "fee-free-card",
        title: "Pay on a fee-free travel card",
        text: "A fee-free card (Wise, Currensea) instead of a high-street debit card stops the bank quietly skimming a few percent off every dollar you spend. Costs nothing to set up before you fly.",
        money: 150, timeHours: 0, affiliate: "Wise",
        caveat: null, defaultOn: true,
      },
    ],
  },
];

export function tally(applied) {
  let money = 0;
  let timeHours = 0;
  let count = 0;
  for (const cat of CATEGORIES) {
    for (const tip of cat.tips) {
      if (applied[tip.id]) {
        money += tip.money;
        timeHours += tip.timeHours;
        count += 1;
      }
    }
  }
  return { money, timeHours, count };
}

export function defaultApplied() {
  const a = {};
  for (const cat of CATEGORIES) for (const tip of cat.tips) a[tip.id] = tip.defaultOn;
  return a;
}
