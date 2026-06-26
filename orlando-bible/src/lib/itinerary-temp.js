// The Orlando Bible — itinerary engine.
// Generates a day-by-day plan from the shared trip profile, encoding the
// locked ruleset: Magic Kingdom first, never >3 park days in a row, the two
// Universal Express days paired, Epic early, day 14 always a park, and an
// alternating value/themed dining rhythm with a pre-trip booking checklist.
//
// Ride/character/show lists are editable reference data — keep them current.

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
  water: {
    name: "Water park", resort: "", short: "Water", light: true,
    ropeDrop: "Grab loungers early — they go fast",
    rides: ["Headline slides", "Lazy river", "Wave pool"],
    characters: "",
    show: "",
  },
};

const ROTATION = {
  both: ["mk", "epcot", "hs", "ioa", "usf", "epic", "ak", "mk", "epcot", "water"],
  disney: ["mk", "epcot", "hs", "ak", "mk", "epcot", "hs", "water", "ak"],
  universal: ["ioa", "usf", "epic", "ioa", "usf", "water", "epic"],
};

const VALUE_DINNERS = ["Out-of-park value — Kids Eat Free Card", "Villa BBQ with the Walmart shop", "Cici's all-you-can-eat pizza"];
const THEMED_DISNEY = ["T-Rex Cafe (Disney Springs)", "Cinderella's Royal Table — character meal", "Chef Mickey's — character buffet"];
const THEMED_NEUTRAL = ["Bahama Breeze", "a Florida steakhouse", "T-Rex Cafe (Disney Springs)"];

function breakfastFor(type, accom) {
  if (type === "rest") return "Big breakfast out — the value meal of the day";
  if (accom === "hotel") return "Hotel breakfast (free if your hotel includes it)";
  if (accom === "onsite") return "Resort breakfast — or a booked character meal";
  return "Self-catered at the villa — eat before you leave for rope drop";
}

export function buildItinerary(profile, plan) {
  const nights = profile.nights;
  const accom = plan?.accom || "villa";
  const rotation = ROTATION[profile.focus] || ROTATION.both;

  const days = [];
  const bookings = [];
  let parkIdx = 0;
  let consec = 0;
  let dinnerThemed = false; // alternate, starting value
  let themedDisneyIdx = 0;
  let themedNeutralIdx = 0;
  let valueIdx = 0;

  const activeCount = Math.max(0, nights - 1); // days 2..nights
  const excursionAt = nights >= 8 ? Math.floor(activeCount * 0.5) : -1;
  let excursionPlaced = false;

  const nextDinner = (type, park) => {
    // value/themed alternation across all dinners
    const themed = dinnerThemed;
    dinnerThemed = !dinnerThemed;
    if (!themed) {
      const t = VALUE_DINNERS[valueIdx % VALUE_DINNERS.length];
      valueIdx++;
      return { text: t, kind: "value" };
    }
    // themed
    if (park && PARKS[park]?.resort === "Universal") {
      return { text: "Hard Rock Cafe at CityWalk", kind: "themed" };
    }
    if (park && PARKS[park]?.resort === "Disney") {
      const t = THEMED_DISNEY[themedDisneyIdx % THEMED_DISNEY.length];
      themedDisneyIdx++;
      bookings.push({ day: null, text: t });
      return { text: t, kind: "themed", booking: true };
    }
    const t = THEMED_NEUTRAL[themedNeutralIdx % THEMED_NEUTRAL.length];
    themedNeutralIdx++;
    return { text: t, kind: "themed" };
  };

  // Day 1 — arrival
  days.push({
    day: 1, type: "arrival", title: "Arrive & settle in",
    meals: { breakfast: "—", lunch: "On the road / at the airport", dinner: "Easy first night — a nearby diner or self-cater" },
    tips: ["Collect the hire car, then straight to Walmart: groceries, sun cream, drinks and a cheap stroller", "Freeze water bottles tonight for tomorrow's park day"],
  });

  for (let i = 0; i < activeCount; i++) {
    const dayNum = i + 2;
    const isLastActive = i === activeCount - 1; // day = nights → must be a park

    let type = "park";
    if (!isLastActive) {
      if (!excursionPlaced && i === excursionAt) { type = "excursion"; excursionPlaced = true; }
      else if (consec >= 3) type = "rest";
    }

    if (type === "rest") {
      consec = 0;
      const d = nextDinner("rest", null);
      days.push({
        day: dayNum, type: "rest", title: "Pool & rest day",
        meals: { breakfast: breakfastFor("rest", accom), lunch: "Walmart wieners — 1 min in the microwave, bun & sauce, pennies a head", dinner: d.text },
        dinnerKind: d.kind, booking: d.booking,
        tips: ["The reset that stops everyone burning out by day six", "Restless? Outlet shopping or a wander round Disney Springs"],
      });
      continue;
    }
    if (type === "excursion") {
      consec = 0;
      const d = nextDinner("excursion", null);
      days.push({
        day: dayNum, type: "excursion", title: "Kennedy Space Center / beach day",
        meals: { breakfast: breakfastFor("park", accom), lunch: "Picnic or a local bite", dinner: d.text },
        dinnerKind: d.kind, booking: d.booking,
        tips: ["A day out of the parks — Kennedy Space Center, or Clearwater / Cocoa beach", "Check drive times and pack plenty of water"],
      });
      continue;
    }

    // park day
    const parkKey = rotation[parkIdx % rotation.length];
    parkIdx++;
    consec++;
    const park = PARKS[parkKey];
    const d = nextDinner(parkKey === "water" ? null : "park", parkKey);

    const tips = [];
    if (parkKey === "mk" && dayNum === 2) tips.push("First park, first magic — rope drop the headliner before the crowds land (jet lag has you up early anyway)");
    else tips.push(`Rope drop ${park.ropeDrop}`);
    if (park.show && park.show.includes("parade")) tips.push("Parade time is the best time to ride — while everyone lines the route, the headliner queues empty");
    if (park.hack) tips.push("Express hotel hack day — free Universal Express if you booked the one-night Premier stay across today");
    if (park.note) tips.push(park.note);

    let lunch = "In-park quick-service — mobile-order ahead to skip the queue";
    if (park.themedLunch) lunch = `Themed lunch: ${park.themedLunch}`;

    if (d.booking) bookings[bookings.length - 1].day = dayNum;

    days.push({
      day: dayNum, type: "park", parkKey, title: park.name, resort: park.resort,
      ropeDrop: park.ropeDrop, rides: park.rides, characters: park.characters, show: park.show,
      meals: { breakfast: breakfastFor("park", accom), lunch, dinner: d.text },
      dinnerKind: d.kind, booking: d.booking, light: park.light,
      tips,
    });
  }

  // Departure
  days.push({
    day: nights + 1, type: "departure", title: "Fly home",
    meals: { breakfast: "Use up the last of the groceries", lunch: "Light bite / on the road", dinner: "—" },
    tips: ["Late checkout if you can; pack the night before", "Return the hire car with a full tank to avoid the refuel fee"],
  });

  return { days, bookings: bookings.filter((b) => b.day) };
}
