// The Orlando Bible — height requirements, cross-referenced against the
// same ride names used throughout the app (itinerary.js's PARKS object).
// Heights in inches. `companion` = the lower bound where a rider needs a
// Supervising Companion (14+); `solo` = the height to ride alone.
// `unconfirmed: true` flags the newest Epic Universe rides where a firm
// published number wasn't findable — treat as a starting estimate and
// verify on Universal's site before you fly.

export const RIDES = [
  // Magic Kingdom
  { park: "Magic Kingdom", resort: "Disney", name: "Seven Dwarfs Mine Train", solo: 38 },
  { park: "Magic Kingdom", resort: "Disney", name: "Tron Lightcycle Run", solo: 48 },
  { park: "Magic Kingdom", resort: "Disney", name: "Space Mountain", solo: 44 },
  { park: "Magic Kingdom", resort: "Disney", name: "Tiana's Bayou Adventure", solo: 40 },
  { park: "Magic Kingdom", resort: "Disney", name: "Big Thunder Mountain", solo: 40 },
  { park: "Magic Kingdom", resort: "Disney", name: "Pirates of the Caribbean", solo: 0 },
  { park: "Magic Kingdom", resort: "Disney", name: "Haunted Mansion", solo: 0 },
  { park: "Magic Kingdom", resort: "Disney", name: "Jungle Cruise", solo: 0 },
  { park: "Magic Kingdom", resort: "Disney", name: "Peter Pan's Flight", solo: 0 },

  // EPCOT
  { park: "EPCOT", resort: "Disney", name: "Guardians of the Galaxy: Cosmic Rewind", solo: 42 },
  { park: "EPCOT", resort: "Disney", name: "Test Track", solo: 40 },
  { park: "EPCOT", resort: "Disney", name: "Soarin' Around the World", solo: 40 },
  { park: "EPCOT", resort: "Disney", name: "Frozen Ever After", solo: 0 },
  { park: "EPCOT", resort: "Disney", name: "Remy's Ratatouille Adventure", solo: 0 },
  { park: "EPCOT", resort: "Disney", name: "Spaceship Earth", solo: 0 },

  // Hollywood Studios
  { park: "Hollywood Studios", resort: "Disney", name: "Star Wars: Rise of the Resistance", solo: 40 },
  { park: "Hollywood Studios", resort: "Disney", name: "Slinky Dog Dash", solo: 38 },
  { park: "Hollywood Studios", resort: "Disney", name: "The Twilight Zone Tower of Terror", solo: 40 },
  { park: "Hollywood Studios", resort: "Disney", name: "Rock 'n' Roller Coaster", solo: 48 },
  { park: "Hollywood Studios", resort: "Disney", name: "Millennium Falcon: Smugglers Run", solo: 38 },
  { park: "Hollywood Studios", resort: "Disney", name: "Mickey & Minnie's Runaway Railway", solo: 0 },

  // Animal Kingdom
  { park: "Animal Kingdom", resort: "Disney", name: "Avatar Flight of Passage", solo: 44 },
  { park: "Animal Kingdom", resort: "Disney", name: "Expedition Everest", solo: 44 },
  { park: "Animal Kingdom", resort: "Disney", name: "Kali River Rapids", solo: 38 },
  { park: "Animal Kingdom", resort: "Disney", name: "Kilimanjaro Safaris", solo: 0 },
  { park: "Animal Kingdom", resort: "Disney", name: "Na'vi River Journey", solo: 0 },

  // Universal Studios Florida
  { park: "Universal Studios", resort: "Universal", name: "Harry Potter and the Escape from Gringotts", companion: 42, solo: 48 },
  { park: "Universal Studios", resort: "Universal", name: "Revenge of the Mummy", solo: 48 },
  { park: "Universal Studios", resort: "Universal", name: "Transformers: The Ride 3-D", companion: 40, solo: 48 },
  { park: "Universal Studios", resort: "Universal", name: "Men in Black Alien Attack", companion: 42, solo: 48 },
  { park: "Universal Studios", resort: "Universal", name: "The Simpsons Ride", companion: 40, solo: 48 },
  { park: "Universal Studios", resort: "Universal", name: "Hollywood Rip Ride Rockit", solo: 51, note: "Confirm this ride is still operating before you go — it was slated for closure." },

  // Islands of Adventure
  { park: "Islands of Adventure", resort: "Universal", name: "Hagrid's Magical Creatures Motorbike Adventure", companion: 42, solo: 48, testSeat: true },
  { park: "Islands of Adventure", resort: "Universal", name: "Jurassic World VelociCoaster", solo: 51, testSeat: true },
  { park: "Islands of Adventure", resort: "Universal", name: "Harry Potter and the Forbidden Journey", companion: 42, solo: 48, testSeat: true },
  { park: "Islands of Adventure", resort: "Universal", name: "The Amazing Adventures of Spider-Man", companion: 40, solo: 48 },
  { park: "Islands of Adventure", resort: "Universal", name: "The Incredible Hulk Coaster", solo: 54, testSeat: true },
  { park: "Islands of Adventure", resort: "Universal", name: "Skull Island: Reign of Kong", solo: 36, unconfirmed: true },

  // Epic Universe
  { park: "Epic Universe", resort: "Universal", name: "Stardust Racers", solo: 48 },
  { park: "Epic Universe", resort: "Universal", name: "Mario Kart: Bowser's Challenge", solo: 40 },
  { park: "Epic Universe", resort: "Universal", name: "Harry Potter and the Battle at the Ministry", solo: 42, unconfirmed: true },
  { park: "Epic Universe", resort: "Universal", name: "Monsters Unchained: The Frankenstein Experiment", solo: 40, unconfirmed: true },
  { park: "Epic Universe", resort: "Universal", name: "Hiccup's Wing Gliders", solo: 36, unconfirmed: true },
  { park: "Epic Universe", resort: "Universal", name: "Mine-Cart Madness", solo: 40, unconfirmed: true },
];

export function checkHeight(heightIn) {
  const canRideSolo = [];
  const needsCompanion = [];
  const tooSmall = [];
  for (const r of RIDES) {
    if (heightIn >= r.solo) canRideSolo.push(r);
    else if (r.companion && heightIn >= r.companion) needsCompanion.push(r);
    else tooSmall.push(r);
  }
  return { canRideSolo, needsCompanion, tooSmall };
}

export const CM_PER_INCH = 2.54;
