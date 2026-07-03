// The Orlando Bible — "Before You Fly" apps.
// Tiered so a scary 30-app list becomes "do these first, these are nice-to-have."
//
// LINKS: url opens the official site (which routes to the right app store).
// Where url is null, it renders as plain text with a "search your app store" hint.
// Swap any url for an affiliate link later — one edit per line.
// Entries marked confirm:true are ones to double-check before going public.

export const APP_TIERS = [
  {
    tier: "Essential",
    blurb: "Do these before you leave the house. Missing one genuinely costs you time, money or sanity.",
    apps: [
      { name: "MPC Mobile Passport", what: "Skip the immigration queue — the best time-saver on arrival. Needs an approved ESTA (for returning Visa Waiver travellers).", url: "https://www.google.com/search?q=Mobile+Passport+Control+MPC+app", store: true },
      { name: "My Disney Experience", what: "Park maps, wait times, mobile order, dining bookings and Lightning Lane.", url: "https://disneyworld.disney.go.com" },
      { name: "Universal Orlando", what: "Wait times, mobile order, Express and virtual queues.", url: "https://www.universalorlando.com" },
      { name: "SeaWorld & Busch Gardens", what: "Park info, maps and ride times for both parks.", url: "https://seaworld.com" },
      { name: "Google Maps", what: "Download offline maps before you fly — free sat nav, no roaming needed.", url: "https://maps.google.com" },
      { name: "SunPass", what: "Sort your Florida tolls. In a hire car you can also just use the rental company's own transponder and accept the small fee.", url: "https://www.google.com/search?q=SunPass+app", store: true },
      { name: "Mears Connect", what: "Book shared airport transfers if you're not hiring a car.", url: "https://www.google.com/search?q=Mears+Connect+app", store: true },
      { name: "Uber", what: "Rideshare — the default way to get around without a car.", url: "https://www.uber.com" },
      { name: "Lyft", what: "Often cheaper than Uber — worth having both to compare.", url: "https://www.lyft.com" },
      { name: "WhatsApp", what: "Free calls and messages home over wifi or data.", url: "https://www.whatsapp.com" },
      { name: "Flighty", what: "Live flight tracking — you'll know about delays before the airline tells you.", url: "https://www.flighty.com" },
      { name: "eSIM (Airalo / Saily / Holafly)", what: "Cheap US data set up before you fly — and it's your sat nav too.", url: "https://www.airalo.com" },
      { name: "Fee-free card (Revolut / Chase UK / Starling)", what: "Pay in dollars without the bank skimming FX. Or use your own, like Halifax paying in $.", url: "https://www.revolut.com" },
      { name: "Chick-fil-A", what: "Order ahead and rewards — but note, closed Sundays!", url: "https://www.chick-fil-a.com" },
      { name: "McDonald's", what: "App-only deals and free items.", url: "https://www.mcdonalds.com" },
      { name: "Wendy's", what: "Deals, the Frosty, and the 4-for-$4.", url: "https://www.wendys.com" },
      { name: "Chipotle", what: "Order ahead and skip the line.", url: "https://www.chipotle.com" },
      { name: "Panera Bread", what: "Order ahead and rewards.", url: "https://www.panerabread.com" },
    ],
  },
  {
    tier: "Recommended",
    blurb: "Real money and time savers you'd survive without — but you'll be glad you didn't.",
    apps: [
      { name: "Waze", what: "Live traffic routing — often beats Google Maps in Orlando traffic.", url: "https://www.waze.com" },
      { name: "Undercover Tourist Wait Times", what: "Free live wait times across every park.", url: "https://www.undercovertourist.com" },
      { name: "Mouse Dining", what: "Alerts you when hard-to-get Disney dining reservations open up.", url: null, confirm: true },
      { name: "The Weather Channel", what: "Florida's afternoon storms are no joke — plan around them.", url: "https://weather.com" },
      { name: "Groupon", what: "Discounts on dining, mini-golf and smaller attractions.", url: "https://www.groupon.com" },
      { name: "Yelp", what: "Reviews for the good restaurants off the tourist strip.", url: "https://www.yelp.com" },
      { name: "Walmart", what: "Order the day-one grocery stock-up for the villa.", url: "https://www.walmart.com" },
      { name: "Publix", what: "The beloved Florida supermarket — great subs, better quality.", url: "https://www.publix.com" },
    ],
  },
  {
    tier: "Bonus",
    blurb: "Nice extras if you're the organised type.",
    apps: [
      { name: "XE Currency", what: "Live exchange rates at a glance.", url: "https://www.xe.com" },
      { name: "Aldi", what: "Cheap groceries, familiar from home.", url: "https://www.aldi.us" },
      { name: "Kennedy Space Center", what: "Tickets and show times for the excursion day.", url: "https://www.kennedyspacecenter.com" },
    ],
  },
];
