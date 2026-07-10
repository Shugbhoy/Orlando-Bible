// The Orlando Bible — Character Dining guide.
// Prices are per-adult/per-child (ages 3-9), 2026 figures. Under-3s eat
// free everywhere. Book at exactly your 60-day mark — the popular ones
// (Cinderella's Royal Table, Topolino's Terrace) go in minutes.

export const MEALS = [
  {
    name: "Cinderella's Royal Table",
    location: "Magic Kingdom (inside the castle)",
    needsTicket: true,
    price: "£60 adult / £37 child breakfast · £69 adult / £41 child lunch & dinner",
    characters: "Cinderella, Ariel, Belle, Aurora, Jasmine, Snow White",
    verdict: "The hardest reservation at Disney World, and genuinely once-in-a-lifetime for dining inside the castle. But it's the priciest meal on this list and reviews on the food itself are mixed — go for the setting and the princesses, not the menu. Book the exact second your 60-day window opens.",
    tone: "note",
  },
  {
    name: "Akershus Royal Banquet Hall",
    location: "EPCOT, Norway Pavilion",
    needsTicket: true,
    price: "£46 adult / £30 child breakfast · £54 adult / £36 child lunch & dinner",
    characters: "Rotating Disney princesses — usually Belle, Snow White, Ariel plus others",
    verdict: "The smart alternative if Cinderella's Royal Table is booked out (which it usually is). Same princess energy, noticeably cheaper, and a genuinely easier reservation to land.",
    tone: "good",
  },
  {
    name: "Chef Mickey's",
    location: "Disney's Contemporary Resort — no park ticket needed",
    needsTicket: false,
    price: "£46 adult / £29 child breakfast · £54 adult / £35 child dinner",
    characters: "Mickey, Minnie, Donald, Goofy, Pluto (the classic Fab Five)",
    verdict: "The one everyone's heard of. Convenient by monorail from Magic Kingdom, and — this is the useful bit — you don't need a park ticket at all. A genuinely good move on a rest day.",
    tone: "good",
  },
  {
    name: "Cape May Cafe",
    location: "Disney's Beach Club Resort — no park ticket needed",
    needsTicket: false,
    price: "£39 adult / £26 child breakfast buffet",
    characters: "Minnie, Goofy, Donald, Daisy",
    verdict: "The cheapest character breakfast on this list, relaxed buffet pace, and no park ticket required. A smart, low-key start to a rest day.",
    tone: "good",
  },
  {
    name: "Tusker House",
    location: "Animal Kingdom",
    needsTicket: true,
    price: "£50 adult / £33 child, all meals — safari-themed buffet",
    characters: "Donald, Daisy, Goofy, Mickey (safari outfits)",
    verdict: "Solid, family-style buffet, good variety, and it's the character option already inside the park you're visiting that day rather than a special trip.",
    tone: "note",
  },
  {
    name: "Garden Grill",
    location: "EPCOT (The Land pavilion)",
    needsTicket: true,
    price: "£39 adult / £26 child, family-style",
    characters: "Chip, Dale, Mickey, Pluto",
    verdict: "The one where the whole restaurant slowly rotates, overlooking the Living with the Land greenhouses below — kids love watching the scenery change. A nice change of pace from a straight buffet.",
    tone: "good",
  },
  {
    name: "'Ohana",
    location: "Disney's Polynesian Resort — no park ticket needed",
    needsTicket: false,
    price: "£42 adult / £26 child breakfast, family-style",
    characters: "Lilo & Stitch, Mickey, Pluto",
    verdict: "Another no-ticket-needed resort option — good for easing into a rest morning without committing to a park at all.",
    tone: "good",
  },
  {
    name: "1900 Park Fare",
    location: "Disney's Grand Floridian Resort — no park ticket needed",
    needsTicket: false,
    price: "£46 adult / £29 child",
    characters: "Aladdin, Cinderella, Mirabel (Encanto), Princess Tiana",
    verdict: "The most unusual character lineup on this list — the only place to meet Mirabel at a character meal. Worth it if your kids are into Encanto.",
    tone: "note",
  },
];

export const TIPS = [
  "Book at exactly your 60-day mark, first thing in the morning — the hardest reservations (Cinderella's, Topolino's Terrace) are gone within minutes of the window opening.",
  "Resort meals (Chef Mickey's, Cape May, 'Ohana, 1900 Park Fare) never need a park ticket — this is the single best character-dining hack for a rest day, since you get the magic without spending a park admission.",
  "Under-3s eat free at every character meal on this list, no exceptions.",
  "Buffet and family-style meals (most of these) are all-you-care-to-eat — plated meals like Cinderella's Royal Table charge per dish instead.",
  "Budget 60–90 minutes for the meal — characters rotate table to table, and it takes time for everyone to reach you.",
];
