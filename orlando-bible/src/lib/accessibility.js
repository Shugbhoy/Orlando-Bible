// The Orlando Bible — Accessibility guide (DAS / AAP).
// Researched and current as of mid-2026. Both systems change their rules
// periodically — always confirm on the official page before you fly, and
// treat this as a solid starting point, not the final word.

export const DAS = {
  name: "Disney's Disability Access Service (DAS)",
  who: "For guests who, due to a developmental disability like autism or a similar condition, can't tolerate waiting in a conventional queue for an extended time. It's assessed case by case — there's no fixed list of qualifying conditions, and anxiety alone is considered but harder to qualify for since 2024's tightened criteria.",
  howItWorks: [
    "DAS doesn't mean immediate access — it gives you a return time roughly matching the current standby wait, booked through the My Disney Experience app once you're registered and in the park.",
    "You go and enjoy something else, then come back at your return time and use the DAS entrance (usually the Lightning Lane queue).",
    "It stacks with Lightning Lane Multi Pass purchases — you don't have to choose one or the other.",
    "Generally one active DAS return time at once; you use it before booking the next.",
  ],
  registration: [
    "Must be done via a live video chat — there's no more in-person registration at Guest Relations for the initial application.",
    "You can register as early as 60 days before your visit, or on the day itself via the same video-chat process once you're at the park.",
    "The guest with the disability (or their parent/guardian if under 18) takes part, and a photo is taken during registration.",
    "No medical documentation is required, but you'll need to explain — in some detail — why a standard queue isn't workable. Being specific and concrete helps.",
  ],
  partySize: "The registered guest plus up to 3 others — 4 people total. Exceptions can be made for immediate family, but aren't guaranteed.",
  validity: "Length of your ticket, or up to 1 year, whichever is shorter. A new ticket means re-registering.",
  source: "disneyworld.disney.go.com/guest-services/disability-access-service",
};

export const AAP = {
  name: "Universal's Attraction Assistance Pass (AAP)",
  who: "For guests whose disability prevents them waiting in a standard queue — cognitive, developmental or select physical/learning disabilities. Guests who only need a mobility device (wheelchair, scooter) don't need this at all — every queue and entrance is already accessible.",
  howItWorks: [
    "Present your pass (increasingly digital, via the Universal Orlando app) at the ride you want.",
    "If the posted wait is under roughly 30 minutes, you're often sent straight to an alternate queue. Over that, you're given a return time based on the current wait.",
    "The pass is now going digital — check-in via the app's Wait Times screen shows a 'Make an AAP Return Time' option, rolled out from December 2025. A paper card system still exists as a fallback.",
    "Doesn't cover Volcano Bay — that water park uses its own TapuTapu virtual-queue band instead.",
  ],
  registration: [
    "You need an IBCCES Individual Accessibility Card (IAC) first — a separate, free registration at AccessibilityCard.org or the IBCCES Accessibility Card app, done at least 48 hours before your visit (Universal recommends up to 30 days ahead).",
    "The IAC application asks for real detail — contact info and a statement from a medical provider, government body or educational support professional.",
    "Getting the IAC does NOT guarantee the AAP itself — a Universal team member contacts you separately (often by phone, a few days before your trip) to confirm what accommodation actually fits your needs.",
    "Under-18s need a parent or guardian to register the IAC on their behalf.",
  ],
  partySize: "The registered guest plus up to 5 others — 6 people total. More generous than Disney's cap of 4.",
  validity: "Length of your stay or ticket. Annual passholders can hold an AAP for up to 14 consecutive days before a quick renewal at Guest Services.",
  source: "universalorlando.com — search 'Attraction Assistance Pass'",
};

export const COMPARISON = [
  { label: "Party size", disney: "4 total", universal: "6 total" },
  { label: "Where you register", disney: "Live video chat, in the My Disney Experience system", universal: "IBCCES IAC online first, then Universal contacts you" },
  { label: "How far ahead", disney: "Up to 60 days, or same-day", universal: "Up to 30 days, minimum 48 hours" },
  { label: "Documentation", disney: "None required — verbal explanation", universal: "A statement from a medical/educational professional" },
  { label: "How it's shown", disney: "Digital, via the app", universal: "Increasingly digital; paper card still used" },
];

export const TIPS = [
  "Apply as early as your window allows — both systems get busy close to peak season, and Universal's IAC-then-AAP is a genuine two-step process that needs lead time.",
  "Be specific, not just diagnostic. \"He can't stand still in a line and will run\" gets a clearer response than a diagnosis alone — both systems care about the practical impact, not the label.",
  "If a child is close to a ride's height requirement, Rider Switch (Disney) or Child Swap (Universal) lets one adult ride while the other waits — free, and separate from DAS/AAP entirely.",
  "Worried about a restraint fitting due to body shape rather than height? Test seats sit at the entrance to the biggest coasters at both resorts — a two-minute check beats an hour's wait and a public turn-away.",
  "Trained service animals are welcome at both resorts. Universal has portable kennels at rides the animal can't join, and relief areas around the parks; Disney has similar provisions — ask at Guest Relations on arrival.",
];

export const CURRENT_NOTE = "Worth knowing: as of April 2026, a DAS discrimination complaint against Disney is under active investigation by the Florida Commission on Human Relations, after Disney missed a mediation deadline. This doesn't change how DAS works today, but the system may keep evolving — check Disney's official DAS page close to your travel dates for the latest.";
