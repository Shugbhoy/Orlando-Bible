// The Orlando Bible — On-site vs Off-site model.
// Sign convention: negative => On-site Disney, positive => Off-site villa.
// These weights encode hard-won judgement — tune freely.

export const WEIGHTS = {
  nights: (n) => (n < 7 ? -2 : n <= 10 ? 0 : n <= 14 ? 2 : 3),
  heads: (h) => (h <= 2 ? -1 : h <= 4 ? 0 : h <= 6 ? 2 : 3),
  focus: { disney: -3, both: 0, universal: 3 },
  firstTime: { yes: -2, no: 1 },
  nonPark: (d) => (d === 0 ? -1 : d <= 2 ? 1 : 3),
  underSix: -2,
  willDrive: { yes: 1, no: -4 },
  pri: { pool: 2, immersion: -2, selfCater: 2, lowCost: 2 },
};

export const PRIORITIES = [
  ["pool", "Private pool & space"],
  ["immersion", "Park immersion & early entry"],
  ["selfCater", "Self-cater to cut food costs"],
  ["lowCost", "Keep the total down"],
];

// p combines the shared trip profile with the decider's local inputs:
// { adults, teens, children, nights, focus, firstTime, nonPark, underSix, willDrive, priorities }
export function score(p) {
  const heads = p.adults + p.teens + p.children;
  const reasons = [];
  const add = (pts, onText, offText) => {
    if (pts === 0) return;
    reasons.push({ pts, text: pts < 0 ? onText : offText, dir: pts < 0 ? "onsite" : "offsite", mag: Math.abs(pts) });
  };

  add(WEIGHTS.nights(p.nights),
    `A ${p.nights}-night trip is short enough that on-site convenience pays off`,
    `Over ${p.nights} nights, a villa's space and self-catering really add up`);
  add(WEIGHTS.heads(heads),
    `A small party doesn't need a villa's extra bedrooms`,
    `${heads} of you is where a villa beats paying for multiple hotel rooms`);
  add(WEIGHTS.focus[p.focus],
    `A Disney-led trip is exactly what on-site is built for`,
    p.focus === "universal"
      ? `Universal-led means on-site Disney perks are wasted on you`
      : `Splitting time across resorts dilutes the on-site advantage`);
  add(WEIGHTS.firstTime[p.firstTime],
    `As first-timers, the ease and immersion of on-site is worth a lot`,
    `You've been before — you already know the tricks on-site usually buys`);
  add(WEIGHTS.nonPark(p.nonPark),
    `With no real days off, you'll barely use a villa pool`,
    `${p.nonPark} non-park day${p.nonPark > 1 ? "s" : ""} is when a private pool earns its keep`);
  if (p.underSix) add(WEIGHTS.underSix, `Under-6s mean midday naps — popping back to an on-site room is gold`, "");
  add(WEIGHTS.willDrive[p.willDrive],
    `Not wanting to drive points firmly on-site — off-site needs a car (no more free Magical Express)`,
    `Happy to drive, so off-site's location isn't a barrier`);
  p.priorities.forEach((k) => {
    const label = PRIORITIES.find((x) => x[0] === k)[1];
    add(WEIGHTS.pri[k], `You flagged "${label}" — an on-site strength`, `You flagged "${label}" — a villa strength`);
  });

  const total = reasons.reduce((s, r) => s + r.pts, 0);
  const top = [...reasons].sort((a, b) => b.mag - a.mag).slice(0, 4);
  const pos = Math.max(-1, Math.min(1, total / 8));

  let verdict, strength;
  if (total <= -4) { verdict = "onsite"; strength = "Strongly"; }
  else if (total <= -1) { verdict = "onsite"; strength = "Lean"; }
  else if (total === 0) { verdict = "tie"; strength = ""; }
  else if (total <= 3) { verdict = "offsite"; strength = "Lean"; }
  else { verdict = "offsite"; strength = "Strongly"; }

  return { total, pos, verdict, strength, top, heads };
}
