// The Orlando Bible — itinerary engine.
// Generates a day-by-day plan from the shared trip profile, encoding the
// locked ruleset: Magic Kingdom first, never >3 consecutive park days, the
// two Universal Express days paired, Epic early, and an alternating
// value/themed dining rhythm with a pre-trip booking checklist.
//
// Park-day COUNT is driven by recommendDays() in tickets.js — the same
// function the Ticket Decoder uses — so the two screens can never disagree
// about how many Disney/Universal days a trip actually needs.
//
// Ride/character/show lists are editable reference data — keep them current.

import { recommendDays } from "./tickets";

export const PARKS = {
  mk: {
    name: "Magic Kingdom", resort: "Disney", short: "MK",
    ropeDrop: "Seven Dwarfs Mine Train or Tron Lightcycle Run",
    rides: ["Seven Dwarfs Mine Train", "Tron Lightcycle Run", "Space Mountain", "Tiana's Bayou Adventure", "Pirates of the Caribbean", "Haunted Mansion", "Big Thunder Mountain", "Jungle Cruise", "Peter Pan's Flight"],
    characters: "Mickey at Town Square Theater · the princesses at Princess Fairytale Hall · Tinker Bell",
    show: "Festival of Fantasy parade (afternoon) · Happily Ever After fireworks (night)",
  },
  epcot: {
    name: "EPCOT", resort: "Disney", short: "EPCOT",
    ropeDrop: "Guardians: Cosmic Rewind or Frozen Ever After",
    rides: ["Guardians of the Galaxy: Cosmic Rewind", "Frozen Ever After", "Remy's Ratatouille Adventure", "Test Track", "Soarin' Around the World", "Spaceship Earth"],
    characters: "Anna & Elsa in Norway · character spots around World Showcase",
    show: "Luminous lagoon show (night)",
  },
  hs: {
    name: "Hollywood Studios", resort: "Disney", short: "HS",
    ropeDrop: "Rise of the Resistance or Slinky Dog Dash",
    rides: ["Star Wars: Rise of the Resistance", "Slinky Dog Dash", "Mickey & Minnie's Runaway Railway", "The Twilight Zone Tower of Terror", "Rock 'n' Roller Coaster", "Millennium Falcon: Smugglers Run"],
    characters: "the Toy Story gang · Olaf · the Star Wars villains",
    show: "Fantasmic! (night)",
    themedLunch: "Roundup Rodeo BBQ in Toy Story Land",
  },
  ak: {
    name: "Animal Kingdom", resort: "Disney", short: "AK",
    ropeDrop: "Avatar Flight of Passage",
    rides: ["Avatar Flight of Passage", "Expedition Everest", "Kilimanjaro Safaris", "Na'vi River Journey", "Kali River Rapids"],
    characters: "safari-suited Mickey & Minnie · the DinoLand & Pandora characters",
    show: "roaming performers · no set parade (park closes earlier)",
  },
  usf: {
    name: "Universal Studios", resort: "Universal", short: "USF", hack: true,
    ropeDrop: "Harry Potter and the Escape from Gringotts",
    rides: ["Harry Potter and the Escape from Gringotts", "Hollywood Rip Ride Rockit", "Revenge of the Mummy", "Transformers: The Ride 3-D", "Men in Black Alien Attack", "The Simpsons Ride"],
    characters: "the Minions · Transformers · SpongeBob",
    show: "Universal parade · nighttime lagoon show",
  },
  ioa: {
    name: "Islands of Adventure", resort: "Universal", short: "IOA", hack: true,
    ropeDrop: "Hagrid's Magical Creatures Motorbike Adventure or VelociCoaster",
    rides: ["Hagrid's Magical Creatures Motorbike Adventure", "Jurassic World VelociCoaster", "Harry Potter and the Forbidden Journey", "The Amazing Adventures of Spider-Man", "The Incredible Hulk Coaster", "Skull Island: Reign of Kong"],
    characters: "the Marvel Super Hero Island line-up",
    show: "Hogsmeade atmosphere · no set parade",
  },
  epic: {
    name: "Epic Universe", resort: "Universal", short: "Epic",
    ropeDrop: "Battle at the Ministry or Stardust Racers — both in huge demand",
    rides: ["Harry Potter and the Battle at the Ministry", "Stardust Racers", "Monsters Unchained: The Frankenstein Experiment", "Hiccup's Wing Gliders", "Mario Kart: Bowser's Challenge", "Mine-Cart Madness"],
    characters: "Mario & Luigi in Super Nintendo World · the dragons of Berk",
    show: "Le Cirque Arcanus · The Untrainable Dragon",
    note: "Still in its opening era — long waits and ride downtime. Go early and lean on the Express hotel hack.",
  },
};

// Variety cycles — repeat via modulo if a trip needs more days at a resort
// than there are distinct parks to visit.
const DISNEY_CYCLE = ["mk", "epcot", "hs", "ak"];
const UNIVERSAL_CYCLE = ["ioa", "usf", "epic"]; // ioa+usf first & adjacent — the Express pair

function buildRotation(disneyDays, universalDays) {
  const disneyPart = Array.from({ length: disneyDays }, (_, i) => DISNEY_CYCLE[i % DISNEY_CYCLE.length]);
  const universalPart = Array.from({ length: universalDays }, (_, i) => UNIVERSAL_CYCLE[i % UNIVERSAL_CYCLE.length]);
  return [...disneyPart, ...universalPart]; // Disney block opens (MK first), Universal block keeps Express pair adjacent
}

const VALUE_DINNERS = ["Out-of-park value — Kids Eat Free Card", "Villa BBQ with the Walmart shop", "Cici's all-you-can-eat pizza"];
const THEMED_DISNEY = ["T-Rex Cafe (Disney Springs)", "Cinderella's Royal Table — character meal", "Chef Mickey's — character buffet"];
const THEMED_NEUTRAL = ["Bahama Breeze", "a Florida steakhouse", "T-Rex Cafe (Disney Springs)"];
const THEMED_UNIVERSAL = ["Toothsome Chocolate Emporium, CityWalk", "Hard Rock Cafe, CityWalk"];

// Per-person GBP, indicative — sums to roughly the flagship costed fortnight
// at a family of four. Multiplied by the party's actual headcount.
const MEAL_COST = {
  quickService: 9,
  wieners: 1.25,
  publix: 6.25,
  kennedyLunch: 8.75,
  travelBite: 5,
  valueDinner: 7.5,
  lightDinner: 3.75,
  themedDisney: 27.5,
  themedNeutral: 25,
  themedUniversal: 27.5,
  characterMeal: 35,
  farewell: 10,
  roundupRodeo: 32.5,
};

// The Kennedy Space Center excursion needs its own admission — this is a
// ticket cost, not a meal cost, and was previously missing entirely from
// the day's total. ~£220 for a family of four (Rocket Garden, Atlantis, bus
// tour); Gatorland is the honest cheaper swap, ~£90 for the same family.
const EXCURSION_TICKET_PP = 55;

function breakfastFor(accom) {
  // Onsite Disney breakfast used to say "or a booked character meal" at the
  // same low price as a normal buffet — misleading, since a real character
  // breakfast runs far more (~£35pp, same as the character-meal dinners
  // below). Split the two apart: this is just the everyday resort breakfast.
  if (accom === "hotel") return { text: "Hotel breakfast (free if your hotel includes it)", cost: 0 };
  if (accom === "onsite") return { text: "Resort quick-service breakfast (usually a paid extra, unlike free-breakfast hotels)", cost: 12 };
  return { text: "Self-catered at the villa — eat before you leave for rope drop", cost: 3 };
}

export function buildItinerary(profile, plan) {
  const nights = profile.nights;
  const accom = plan?.accom || "villa";
  const heads = (profile.adults || 0) + (profile.teens || 0) + (profile.children || 0) + (profile.infants || 0) || 4;

  const rec = recommendDays(profile);
  const rawRotation = buildRotation(rec.disney, rec.universal);
  const activeCount = Math.max(0, nights - 1); // days 2..nights
  // A ticket can recommend more days than a trip has room for (e.g. a
  // single-resort 14-day ticket on a 14-night trip only has 13 active days
  // to use it in) — cap generation at what's physically possible.
  const rotation = rawRotation.slice(0, activeCount);
  const targetParkDays = rotation.length;

  // Only include the Kennedy/beach excursion if there's still enough rest
  // budget left to respect the max-3-consecutive-park-days rule alongside
  // it — a short, dense single-resort trip may not have room for both.
  const minBreaksNeeded = Math.max(0, Math.ceil(targetParkDays / 3) - 1);
  const roomForExcursion = (activeCount - targetParkDays) > minBreaksNeeded;
  const hasExcursion = nights >= 8 && roomForExcursion;
  const specialTotal = targetParkDays + (hasExcursion ? 1 : 0);
  const restBudget = Math.max(0, activeCount - specialTotal);

  // Where the excursion lands — roughly the midpoint of the park GROUPS
  // (not raw days), so it breaks up the trip rather than bookending it.
  const excursionAfterParks = hasExcursion ? Math.ceil(targetParkDays / 2) : -1;

  // Chunk the park days into groups of at most 3, guaranteeing the
  // max-3-consecutive rule by construction. The Universal Express pair
  // (ioa immediately followed by usf) must never be split across a group
  // boundary — if a natural 3-item chunk would end exactly on ioa, close
  // that chunk one item early so ioa opens the next group with usf instead.
  const ioaIdx = rotation.indexOf("ioa");
  const parkGroups = [];
  let cur = [];
  for (let i = 0; i < targetParkDays; i++) {
    const isIoaWithUsfNext = i === ioaIdx && rotation[i + 1] === "usf";
    if (isIoaWithUsfNext && cur.length === 2) { parkGroups.push(cur); cur = []; }
    cur.push({ kind: "park", parkKey: rotation[i] });
    if (cur.length >= 3) { parkGroups.push(cur); cur = []; }
  }
  if (cur.length) parkGroups.push(cur);

  // Insert the excursion as its OWN group at a clean boundary between two
  // park groups, rather than splicing into the middle of a run — splicing
  // mid-run creates awkward leftover singleton groups that waste rest-day
  // budget on extra gaps (the bug this replaced).
  const groups = [];
  const excursionAtGroup = hasExcursion ? Math.ceil(parkGroups.length / 2) : -1;
  parkGroups.forEach((g, i) => {
    groups.push(g);
    if (hasExcursion && i + 1 === excursionAtGroup) groups.push([{ kind: "excursion" }]);
  });
  if (hasExcursion && excursionAtGroup >= parkGroups.length) groups.push([{ kind: "excursion" }]);

  // One mandatory rest between each pair of groups (guarantees max-3);
  // spread any surplus rest days round-robin across those same gaps rather
  // than bunching them all at the end of the trip.
  const numGaps = Math.max(0, groups.length - 1);
  const gapRests = new Array(numGaps).fill(restBudget >= numGaps ? 1 : 0);
  let surplus = Math.max(0, restBudget - numGaps);
  const intense = restBudget < numGaps; // genuinely not enough spare days for a gentle rhythm
  if (restBudget < numGaps) {
    // Tight edge case: not even one mandatory rest per gap is affordable.
    // Give what we have to the earliest gaps rather than silently drop them.
    for (let g = 0; g < numGaps; g++) gapRests[g] = g < restBudget ? 1 : 0;
  } else {
    let g = 0;
    while (surplus > 0) { gapRests[g % Math.max(1, numGaps)]++; g++; surplus--; }
  }

  const slots = [];
  groups.forEach((group, gi) => {
    group.forEach((item) => slots.push({ special: item }));
    if (gi < numGaps) for (let r = 0; r < gapRests[gi]; r++) slots.push("rest");
  });

  const days = [];
  const bookings = [];
  let dinnerThemed = false; // alternate, starting value
  let themedDisneyIdx = 0, themedNeutralIdx = 0, themedUniversalIdx = 0, valueIdx = 0;
  let tripTotal = 0;

  const bfast = breakfastFor(accom); // same breakfast situation every day, regardless of day type
  let restDayCount = 0; // used to alternate pool days with an outlet shopping day

  const nextDinner = (park) => {
    const themed = dinnerThemed;
    dinnerThemed = !dinnerThemed;
    if (!themed) {
      const t = VALUE_DINNERS[valueIdx % VALUE_DINNERS.length];
      valueIdx++;
      return { text: t, kind: "value", cost: MEAL_COST.valueDinner };
    }
    if (park && PARKS[park]?.resort === "Universal") {
      const t = THEMED_UNIVERSAL[themedUniversalIdx % THEMED_UNIVERSAL.length];
      themedUniversalIdx++;
      return { text: t, kind: "themed", cost: MEAL_COST.themedUniversal };
    }
    if (park && PARKS[park]?.resort === "Disney") {
      const t = THEMED_DISNEY[themedDisneyIdx % THEMED_DISNEY.length];
      const isCharacter = t.toLowerCase().includes("character");
      themedDisneyIdx++;
      bookings.push({ day: null, text: t });
      return { text: t, kind: "themed", booking: true, cost: isCharacter ? MEAL_COST.characterMeal : MEAL_COST.themedDisney };
    }
    const t = THEMED_NEUTRAL[themedNeutralIdx % THEMED_NEUTRAL.length];
    themedNeutralIdx++;
    return { text: t, kind: "themed", cost: MEAL_COST.themedNeutral };
  };

  // Day 1 — arrival
  {
    const lunchC = MEAL_COST.travelBite, dinnerC = MEAL_COST.valueDinner;
    const dayCost = lunchC + dinnerC;
    tripTotal += dayCost;
    days.push({
      day: 1, type: "arrival", title: "Arrive & settle in",
      meals: { breakfast: "—", lunch: "On the road / at the airport", dinner: "Easy first night — a nearby diner or self-cater" },
      mealCosts: { breakfast: 0, lunch: lunchC * heads, dinner: dinnerC * heads },
      dayCost: dayCost * heads,
      tips: ["Collect the hire car, then straight to Walmart: groceries, sun cream, drinks and a cheap stroller", "Freeze water bottles tonight for tomorrow's park day"],
    });
  }

  for (let i = 0; i < activeCount; i++) {
    const dayNum = i + 2;
    const slot = slots[i];

    if (!slot || slot === "rest") {
      restDayCount++;
      const isOutletDay = restDayCount % 2 === 0; // every 2nd rest day, once there's more than one
      const d = nextDinner(null);
      const lunchC = isOutletDay ? MEAL_COST.publix : MEAL_COST.wieners; // a food-court bite instead of the microwave wieners
      const dayCost = bfast.cost + lunchC + d.cost;
      tripTotal += dayCost;
      days.push({
        day: dayNum,
        type: "rest",
        title: isOutletDay ? "Outlet shopping day" : "Pool & rest day",
        meals: {
          breakfast: bfast.text,
          lunch: isOutletDay ? "Food court at the outlets — easy, no cooking" : "Walmart wieners — 1 min in the microwave, bun & sauce, pennies a head",
          dinner: d.text,
        },
        mealCosts: { breakfast: bfast.cost * heads, lunch: lunchC * heads, dinner: d.cost * heads },
        dayCost: dayCost * heads,
        dinnerKind: d.kind, booking: d.booking,
        tips: isOutletDay
          ? [
              "Orlando Vineland Premium Outlets (near I-4/Disney) or Orlando International Premium Outlets (I-Drive) — both have genuine markdowns on US brands",
              "A gentler day than the parks — browse, grab gifts and home essentials, and the shopping spend is already in your Budget's souvenirs line",
              "Quieter than a park day, so it doubles as the reset — no need to rope-drop anything here",
            ]
          : ["The reset that stops everyone burning out — never more than 3 park days in a row", "Restless? Disney Springs or Old Town for a free evening wander"],
      });
      continue;
    }

    if (slot.special.kind === "excursion") {
      const d = nextDinner(null);
      const lunchC = MEAL_COST.kennedyLunch;
      const dayCost = bfast.cost + lunchC + d.cost;
      const ticketCost = EXCURSION_TICKET_PP * heads;
      tripTotal += dayCost;
      days.push({
        day: dayNum, type: "excursion", title: "Kennedy Space Center · beach or Volcano Bay alternative",
        meals: { breakfast: bfast.text, lunch: "Picnic or a local bite", dinner: d.text },
        mealCosts: { breakfast: bfast.cost * heads, lunch: lunchC * heads, dinner: d.cost * heads },
        ticketCost,
        dayCost: dayCost * heads + ticketCost,
        dinnerKind: d.kind, booking: d.booking,
        tips: [
          `Kennedy Space Center admission runs about £${Math.round(ticketCost)} for the whole party — Rocket Garden, Atlantis, the bus tour`,
          "Cheaper swap: Gatorland (~£90 for the family) or a free beach day at Clearwater/Cocoa — or use a Universal day for Volcano Bay instead, already covered by the 3-park ticket",
          "Check drive times and pack plenty of water",
        ],
      });
      continue;
    }

    // park day
    const parkKey = slot.special.parkKey;
    const park = PARKS[parkKey];
    const d = nextDinner(parkKey);

    const tips = [];
    if (parkKey === "mk" && dayNum === 2) tips.push("First park, first magic — rope drop the headliner before the crowds land (jet lag has you up early anyway)");
    else tips.push(`Rope drop ${park.ropeDrop}`);
    if (park.show && park.show.includes("parade")) tips.push("Parade time is the best time to ride — while everyone lines the route, the headliner queues empty");
    if (park.hack) tips.push("Express hotel hack day — check in at Loews Royal Pacific ~7am, bags with the concierge, free Universal Express Unlimited in hand by opening (covers today and tomorrow to park close)");
    if (park.note) tips.push(park.note);

    let lunch = "In-park quick-service — mobile-order ahead to skip the queue";
    let lunchC = MEAL_COST.quickService;
    if (park.themedLunch) { lunch = `Themed lunch: ${park.themedLunch}`; lunchC = MEAL_COST.roundupRodeo; }

    if (d.booking) bookings[bookings.length - 1].day = dayNum;

    const dayCost = bfast.cost + lunchC + d.cost;
    tripTotal += dayCost;

    days.push({
      day: dayNum, type: "park", parkKey, title: park.name, resort: park.resort,
      ropeDrop: park.ropeDrop, rides: park.rides, characters: park.characters, show: park.show,
      meals: { breakfast: bfast.text, lunch, dinner: d.text },
      mealCosts: { breakfast: bfast.cost * heads, lunch: lunchC * heads, dinner: d.cost * heads },
      dayCost: dayCost * heads,
      dinnerKind: d.kind, booking: d.booking,
      tips,
    });
  }

  // Departure
  {
    const lunchC = MEAL_COST.travelBite;
    const dayCost = bfast.cost + lunchC;
    tripTotal += dayCost;
    days.push({
      day: nights + 1, type: "departure", title: "Fly home",
      meals: { breakfast: "Use up the last of the groceries", lunch: "Light bite / on the road", dinner: "—" },
      mealCosts: { breakfast: 0, lunch: lunchC * heads, dinner: 0 },
      dayCost: dayCost * heads,
      tips: ["Late checkout if you can; pack the night before", "Return the hire car with a full tank to avoid the refuel fee"],
    });
  }

  const excursionTicketTotal = days.reduce((sum, d) => sum + (d.ticketCost || 0), 0);

  return {
    days,
    bookings: bookings.filter((b) => b.day),
    foodTotal: tripTotal * heads + excursionTicketTotal,
    heads,
    recommendedDays: rec, // exposed so the summary card can show "4 Disney + 3 Universal"
    intensePacing: intense, // true when the trip is too tight to guarantee a gentle rest rhythm
  };
}
