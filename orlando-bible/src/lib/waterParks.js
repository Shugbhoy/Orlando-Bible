// The Orlando Bible — Water Parks guide.
// The #1 confusion point: NONE of these are automatically included with a
// standard theme park ticket except Volcano Bay (bundled with Universal's
// 3-park ticket). Getting that wrong is an expensive surprise at the gate.

export const PARKS = [
  {
    id: "volcano-bay",
    name: "Volcano Bay",
    operator: "Universal",
    accent: "teal",
    included: true,
    includedNote: "Bundled FREE with the Universal 3-park ticket (Studios + Islands of Adventure + Epic) — no separate purchase needed.",
    vibe: "Polynesian-themed, built around the towering Krakatau volcano centrepiece. TapuTapu wearable bands hold your place in line virtually — no standing in the sun waiting.",
    signature: ["Krakatau Aqua Coaster", "Ko'okiri Body Plunge (70ft near-vertical drop)", "The Reef (family wave pool)", "Kopiko Wai Winding River"],
    price: "Free with your Universal 3-park ticket. Standalone single-day tickets exist but rarely make sense if you already have the 3-park ticket.",
    warning: "CLOSED for refurbishment from around 20 October 2026 to roughly 1 April 2027. If your trip falls in that window, this isn't an option — plan for Aquatica or the Disney parks instead.",
  },
  {
    id: "typhoon-lagoon",
    name: "Typhoon Lagoon",
    operator: "Disney",
    accent: "coral",
    included: false,
    includedNote: "NOT included with any standard Disney park ticket or Park Hopper — needs its own add-on or standalone ticket.",
    vibe: "Tropical, shipwreck theme, built around one of the largest outdoor wave pools in North America (6ft waves). Relaxed pace, good for mixed ages.",
    signature: ["The Surf Pool (2.5 acres, 3 million gallons)", "Crush 'n' Gusher water coaster", "Castaway Creek lazy river", "Ketchakiddee Creek (toddler area)"],
    price: "~£58–62/adult, ~£54/child for a standalone 1-day ticket, or add the Water Park & Sports add-on to a longer park ticket. Free parking.",
    warning: "Disney alternates which of its two water parks is open — only one runs most of the year, both run together roughly mid-May to early September. Always check which one's actually open on your dates before planning around it.",
  },
  {
    id: "blizzard-beach",
    name: "Blizzard Beach",
    operator: "Disney",
    accent: "amber",
    included: false,
    includedNote: "Same as Typhoon Lagoon — not included with a standard ticket, needs its own add-on or standalone purchase.",
    vibe: "A ski-resort that 'melted' — snow-capped mountain theming with genuinely the tallest, fastest slides of Disney's two water parks. Skews toward teens and thrill-seekers.",
    signature: ["Summit Plummet (120ft near-vertical free-fall)", "Teamboat Springs (1,200ft family raft ride)", "Cross Country Creek (3,000ft lazy river)", "Tike's Peak (toddler area)"],
    price: "Same ticket structure and pricing as Typhoon Lagoon. Free parking.",
    warning: "The two Disney water parks share one ticket type — buying a ticket gets you into whichever one is currently open, not both simultaneously unless it's the summer overlap window.",
  },
  {
    id: "aquatica",
    name: "Aquatica",
    operator: "SeaWorld",
    accent: "navy",
    included: false,
    includedNote: "Not included with SeaWorld admission — a separate ticket, though bundled 2-park deals with SeaWorld are genuinely good value.",
    vibe: "SeaWorld's water park, near International Drive. Slightly smaller and more affordable than the Disney or Universal options, with some animal-adjacent touches.",
    signature: ["Ray Rush (three-thrill combo slide)", "KareKare Curl", "Riptide Race (tallest duelling racer slide)", "Loggerhead Lane lazy river"],
    price: "Cheapest of the four — standalone from around £36–60/day, but the 2-Day 2-Park ticket bundled with SeaWorld (~£63–80 total) is usually the smarter buy.",
    warning: "Genuinely useful perk: the Weather-or-Not Assurance gives a free return visit if weather closes rides for 60+ minutes or the heat index hits 110°F — worth knowing given Florida's afternoon storms.",
  },
];

export const COMPARE_ROWS = [
  { label: "Included with a park ticket?", values: ["Yes — free with Universal 3-park", "No — separate ticket", "No — separate ticket", "No — separate ticket"] },
  { label: "Best for", values: ["Thrills + no queuing (TapuTapu)", "Relaxed, mixed ages, wave pool", "Teens & thrill-seekers", "Budget-conscious, smaller crowds"] },
  { label: "Tallest slide", values: ["Ko'okiri Body Plunge, 70ft", "Crush 'n' Gusher (coaster)", "Summit Plummet, 120ft", "Riptide Race"] },
];
