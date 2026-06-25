import React, { useMemo } from "react";
import { C, FONT } from "../theme";
import { useTripProfile } from "../context/TripProfile";
import { compute, gbp } from "../lib/budget";
import { tally } from "../lib/deals";

/**
 * The payoff screen: pulls the Budget total and the Deals savings together
 * into one "your trip, before & after the Bible" figure. Reads everything
 * from the shared Trip Profile, so it always reflects the user's choices.
 */
export default function TripSummary() {
  const { profile, plan, dealsApplied, heads } = useTripProfile();

  const tripTotal = useMemo(
    () => compute({ ...profile, ...plan }, plan.tier).total,
    [profile, plan]
  );
  const savings = useMemo(() => tally(dealsApplied).money, [dealsApplied]);

  const net = Math.max(0, tripTotal - savings);
  const pct = tripTotal > 0 ? Math.round((savings / tripTotal) * 100) : 0;
  const savedFrac = tripTotal > 0 ? Math.min(1, savings / tripTotal) : 0;

  return (
    <section style={S.card}>
      <div style={S.glow} aria-hidden="true" />
      <div style={S.eyebrow}>Your trip, before &amp; after the Bible</div>

      <div style={S.row}>
        <span style={S.beforeLabel}>Estimated trip</span>
        <span style={S.before}>{gbp(tripTotal)}</span>
      </div>

      <div style={S.afterRow}>
        <span style={S.afterLabel}>With your savings</span>
        <span style={S.after}>{gbp(net)}</span>
      </div>

      {/* proportion bar */}
      <div style={S.bar}>
        <div style={{ ...S.barNet, width: `${(1 - savedFrac) * 100}%` }} />
        <div style={{ ...S.barSaved, width: `${savedFrac * 100}%` }} />
      </div>

      <div style={S.savedChip}>You save {gbp(savings)}{pct > 0 && <> · {pct}%</>}</div>
      <div style={S.note}>
        Family of {heads}. Set your trip in Budget, tweak savings in Deals — this updates live.
      </div>
    </section>
  );
}

const S = {
  card: { position: "relative", background: `linear-gradient(135deg, ${C.navy}, ${C.indigo})`, borderRadius: 20, padding: "20px 20px 18px", color: "#fff", overflow: "hidden", marginBottom: 18, boxShadow: "0 8px 28px rgba(13,27,62,0.32)" },
  glow: { position: "absolute", top: -50, right: -40, width: 170, height: 170, background: `radial-gradient(circle, ${C.amber}55, transparent 70%)`, borderRadius: "50%" },
  eyebrow: { position: "relative", fontSize: 11.5, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.72)", marginBottom: 14 },

  row: { position: "relative", display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 },
  beforeLabel: { fontSize: 12.5, color: "rgba(255,255,255,0.7)" },
  before: { fontFamily: FONT.display, fontSize: 18, fontWeight: 500, color: "rgba(255,255,255,0.55)", textDecoration: "line-through", textDecorationColor: "rgba(255,107,107,0.7)" },

  afterRow: { position: "relative", display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 },
  afterLabel: { fontSize: 13, fontWeight: 600, color: "#fff" },
  after: { fontFamily: FONT.display, fontSize: 38, fontWeight: 600, lineHeight: 1, color: C.amber, textShadow: "0 2px 18px rgba(244,166,35,0.4)" },

  bar: { position: "relative", display: "flex", height: 9, borderRadius: 6, overflow: "hidden", background: "rgba(255,255,255,0.12)", marginBottom: 12 },
  barNet: { background: C.teal, transition: "width .4s cubic-bezier(.2,.8,.2,1)" },
  barSaved: { background: C.amber, transition: "width .4s cubic-bezier(.2,.8,.2,1)" },

  savedChip: { position: "relative", display: "inline-block", fontSize: 12.5, fontWeight: 700, color: C.navy, background: C.amber, borderRadius: 8, padding: "5px 11px" },
  note: { position: "relative", fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 11, lineHeight: 1.45 },
};
