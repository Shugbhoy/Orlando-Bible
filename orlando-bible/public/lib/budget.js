// The Orlando Bible — budget model.
// Indicative 2026 GBP estimates, built at roughly £1 ≈ $1.27.
// Edit these freely: the tool's value is honesty + surfacing hidden costs,
// not precision to the penny.

export const CONFIG = {
  fx: 1.27, // USD per GBP — used for the honesty note
  flights: {
    offpeak: { adult: 520, child: 440 },
    shoulder: { adult: 720, child: 620 },
    peak: { adult: 940, child: 840 },
  },
  infantFlight: 90,
  accom: {
    villa: { offpeak: 175, shoulder: 250, peak: 370 },
    hotel: { offpeak: 130, shoulder: 180, peak: 260 },
    onsite: { offpeak: 300, shoulder: 430, peak: 610 },
  },
  tickets: {
    both: { short: { adult: 620, child: 595 }, long: { adult: 900, child: 860 } },
    disney: { short: { adult: 470, child: 450 }, long: { adult: 600, child: 575 } },
    universal: { short: { adult: 330, child: 315 }, long: { adult: 430, child: 410 } },
  },
  food: { adult: 40, child: 28 },
  tip: { adult: 6, child: 2 },
  carPerWeek: 300,
  fuelPerDay: 9,
  tollsPerWeek: 35,
  parkParkingPerDay: 28,
  onsiteParkingPerNight: 24,
  airportTransfersReturn: 140,
  rideSharePerDay: 22,
  bufferPerPerson: 80,
  extras: { lean: 150, mid: 350, lavish: 700 },
  skipLine: { lean: 0, mid: 3, lavish: 6 },
  skipLinePerPersonDay: 22,
  accomTierFactor: { lean: 0.85, mid: 1.0, lavish: 1.25 },
};

export const gbp = (n) => "£" + Math.round(n).toLocaleString("en-GB");

export const labelAccom = (a) =>
  ({ villa: "off-site villa", hotel: "off-site hotel", onsite: "on-site Disney" }[a]);
export const labelFocus = (f) =>
  ({ both: "Disney + Universal", disney: "Disney-led", universal: "Universal-led" }[f]);

// p combines the shared trip profile with the budget module's local inputs:
// { adults, teens, children, infants, nights, season, focus, accom, transport }
export function compute(p, tier) {
  const adultsEq = p.adults + p.teens; // teens ticket & eat as adults
  const heads = adultsEq + p.children;
  const nights = p.nights;
  const weeks = Math.ceil(nights / 7);
  const lengthTier = nights >= 10 ? "long" : "short";
  const parkDays = Math.max(1, Math.round(nights * 0.6));

  const f = CONFIG.flights[p.season];
  const flights = adultsEq * f.adult + p.children * f.child + p.infants * CONFIG.infantFlight;

  let perNight = CONFIG.accom[p.accom][p.season];
  if ((p.accom === "hotel" || p.accom === "onsite") && heads > 4) perNight *= 1.8;
  const accom = perNight * nights * CONFIG.accomTierFactor[tier];

  const t = CONFIG.tickets[p.focus][lengthTier];
  const tickets = adultsEq * t.adult + p.children * t.child;

  let carHire = 0, fuel = 0, tolls = 0, parkParking = 0, hotelParking = 0, transfers = 0, rideshare = 0;
  if (p.transport === "car") {
    carHire = CONFIG.carPerWeek * weeks;
    fuel = CONFIG.fuelPerDay * nights;
    tolls = CONFIG.tollsPerWeek * weeks;
    parkParking = CONFIG.parkParkingPerDay * parkDays;
    hotelParking = p.accom === "onsite" ? CONFIG.onsiteParkingPerNight * nights : 0;
  } else {
    transfers = CONFIG.airportTransfersReturn;
    rideshare = CONFIG.rideSharePerDay * nights;
  }
  const transport = carHire + fuel + tolls + parkParking + hotelParking + transfers + rideshare;

  const food = nights * (adultsEq * CONFIG.food.adult + p.children * CONFIG.food.child);
  const tipping = nights * (adultsEq * CONFIG.tip.adult + p.children * CONFIG.tip.child);

  const skipLine = CONFIG.skipLine[tier] * heads * CONFIG.skipLinePerPersonDay;
  const extras = CONFIG.extras[tier];
  const buffer = CONFIG.bufferPerPerson * heads;

  const hidden = tolls + parkParking + hotelParking + tipping;
  const total = flights + accom + tickets + transport + food + tipping + skipLine + extras + buffer;

  return {
    total, hidden, heads,
    lines: [
      { k: "Flights", v: flights, note: `${heads} travelling${p.infants ? ` + ${p.infants} infant` : ""}` },
      { k: "Accommodation", v: accom, note: `${nights} nights, ${labelAccom(p.accom)}` },
      { k: "Park tickets", v: tickets, note: `${labelFocus(p.focus)}, ${lengthTier === "long" ? "14-day" : `${nights}-day`}` },
      { k: "Transport", v: transport, note: p.transport === "car" ? "Hire car, fuel, transfers" : "Airport transfer + rideshares" },
      { k: "Food & drink", v: food, note: "Groceries + eating out" },
      { k: "Souvenirs & shopping", v: extras, note: "Florida shopping is good value" },
      { k: "Skip-the-line passes", v: skipLine, note: skipLine ? `${CONFIG.skipLine[tier]} premium days` : "Not included at this tier" },
      { k: "Emergency buffer", v: buffer, note: `${gbp(CONFIG.bufferPerPerson)}/person` },
    ],
    hiddenLines: [
      { k: "Road tolls", v: tolls, hide: p.transport !== "car" },
      { k: "Theme-park parking", v: parkParking, hide: p.transport !== "car" },
      { k: "Hotel parking", v: hotelParking, hide: hotelParking === 0 },
      { k: "US tipping", v: tipping, hide: false },
    ].filter((l) => !l.hide && l.v > 0),
  };
}
