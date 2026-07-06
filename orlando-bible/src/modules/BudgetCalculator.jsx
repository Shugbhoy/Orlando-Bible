import React, { useState, useMemo } from "react";
import { C, FONT } from "../theme";
import Header from "../components/Header";
import { Card, Row, Stepper, Seg } from "../components/controls";
import { useTripProfile } from "../context/TripProfile";
import { CONFIG, compute, gbp, labelFocus } from "../lib/budget";

export default function BudgetCalculator() {
  const { profile, update, plan, updatePlan } = useTripProfile();
  const { accom, transport, tier } = plan;
  const [showHow, setShowHow] = useState(false);

  const p = { ...profile, accom, transport };
  const tiers = useMemo(
    () => ({ lean: compute(p, "lean"), mid: compute(p, "mid"), lavish: compute(p, "lavish") }),
    [profile, accom, transport]
  );
  const result = tiers[tier];
  const heads = profile.adults + profile.teens + profile.children;

  return (
    <>
      <Header
        title="What will Orlando really cost?"
        subtitle="An honest, all-in figure in pounds — including the bits the package sites leave off the headline."
      />
      <main style={S.main}>
        <Card label="Your trip" step="01">
          <Row>
            <Stepper label="Adults" min={1} value={profile.adults} onChange={(v) => update("adults", v)} />
            <Stepper label="Teens 13–17" value={profile.teens} onChange={(v) => update("teens", v)} />
          </Row>
          <Row>
            <Stepper label="Children 4–12" value={profile.children} onChange={(v) => update("children", v)} />
            <Stepper label="Under 3s" value={profile.infants} onChange={(v) => update("infants", v)} hint="free entry" />
          </Row>
          <Stepper label="Nights" min={3} max={28} value={profile.nights} onChange={(v) => update("nights", v)} wide />
        </Card>

        <Card label="When & how" step="02">
          <Seg label="Season" value={profile.season} onChange={(v) => update("season", v)}
            opts={[["offpeak", "Off-peak", "Sept · Jan"], ["shoulder", "Shoulder", "Easter · Oct"], ["peak", "Peak", "Summer · Xmas"]]} />
          <Seg label="Where you'll stay" value={accom} onChange={(v) => updatePlan("accom", v)}
            opts={[["villa", "Off-site villa", "Pool · DIY"], ["hotel", "Off-site hotel", "Suite"], ["onsite", "On-site Disney", "Premium"]]} />
          <Seg label="Park focus" value={profile.focus} onChange={(v) => update("focus", v)}
            opts={[["both", "Both", "Disney + Universal"], ["disney", "Disney-led", ""], ["universal", "Universal-led", ""]]} />
          <Seg label="Getting around" value={transport} onChange={(v) => updatePlan("transport", v)}
            opts={[["car", "Hire car", "Most flexible"], ["transfers", "Transfers", "No driving"]]} />
        </Card>

        <div style={S.tierWrap}>
          <div style={S.tierLabel}>Pick a spend level</div>
          <div style={S.tierRow}>
            {[["lean", "Lean", "Careful"], ["mid", "Mid", "Comfortable"], ["lavish", "Lavish", "Once-in-a-lifetime"]].map(([v, t, d]) => (
              <button key={v} onClick={() => updatePlan("tier", v)} style={{ ...S.tierBtn, ...(tier === v ? S.tierBtnOn : {}) }}>
                <span style={S.tierTop}>{t}</span>
                <span style={S.tierSub}>{d}</span>
                <span style={{ ...S.tierTotal, color: tier === v ? C.navy : C.teal }}>{gbp(tiers[v].total)}</span>
              </button>
            ))}
          </div>
        </div>

        <section style={S.totalCard}>
          <div style={S.totalGlow} aria-hidden="true" />
          <div style={S.totalEyebrow}>Estimated all-in cost · {labelFocus(profile.focus)}</div>
          <div style={S.totalBig}>{gbp(result.total)}</div>
          <div style={S.totalPer}>
            ≈ {gbp(result.total / Math.max(1, heads))} per person · {gbp(result.total / Math.max(1, profile.nights))} per night
          </div>
        </section>

        {result.hidden > 0 && (
          <section style={S.hiddenCard}>
            <div style={S.hiddenHead}>
              <SparkIcon />
              <span>{gbp(result.hidden)} of this is the easy-to-miss stuff</span>
            </div>
            <div style={S.hiddenBody}>
              {result.hiddenLines.map((l) => (
                <div key={l.k} style={S.hiddenLine}><span>{l.k}</span><strong>{gbp(l.v)}</strong></div>
              ))}
              <p style={S.hiddenNote}>
                Tolls auto-charge your hire car and arrive as an invoice weeks later. Park parking
                runs about $35 a day. Tipping is expected on table service. None of it shows in a
                headline package price.
              </p>
            </div>
          </section>
        )}

        <Card label="Where it goes" step="03">
          {result.lines.map((l) => (
            <div key={l.k} style={S.bdLine}>
              <div>
                <div style={S.bdKey}>{l.k}</div>
                <div style={S.bdNote}>{l.note}</div>
              </div>
              <div style={S.bdVal}>{l.v > 0 ? gbp(l.v) : "—"}</div>
            </div>
          ))}
        </Card>

        <div style={S.honest}>
          <p style={S.honestP}>
            <strong style={{ color: C.teal }}>Use a fee-free travel card.</strong> At roughly £1 = ${CONFIG.fx},
            paying on a high-street debit card quietly skims a few percent off everything. A fee-free
            card costs nothing to set up before you fly.
          </p>
          <p style={S.honestP}>
            <strong style={{ color: C.teal }}>DIY usually beats the package.</strong> Booking flights,
            villa, car and tickets yourself is often cheaper than a bundle — these figures assume you
            do. We don't sell the holiday, so we've no reason to tell you otherwise.
          </p>
          <button style={S.howBtn} onClick={() => setShowHow((s) => !s)}>
            {showHow ? "Hide" : "How we costed this"} {showHow ? "▲" : "▼"}
          </button>
          {showHow && (
            <p style={S.howText}>
              Indicative 2026 estimates built at £1 ≈ ${CONFIG.fx}. Flights and accommodation scale by
              season; tickets switch to the 14-day product at 10+ nights; transport includes fuel,
              tolls and parking on an estimated {Math.max(1, Math.round(profile.nights * 0.6))} park
              days; food assumes a groceries-plus-eating-out mix. Your real total will vary with dates
              and booking timing — treat this as a planning anchor, not a quote.
            </p>
          )}
        </div>

        <div style={{ height: 96 }} />
      </main>
    </>
  );
}

function SparkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" fill={C.amber} />
    </svg>
  );
}

const S = {
  main: { padding: "18px 16px 0" },
  tierWrap: { marginBottom: 16 },
  tierLabel: { fontFamily: FONT.display, fontSize: 14, fontWeight: 600, color: C.navy, margin: "4px 2px 9px" },
  tierRow: { display: "flex", gap: 8 },
  tierBtn: { flex: 1, background: "#fff", border: `1.5px solid ${C.line}`, borderRadius: 15, padding: "12px 6px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, transition: "all .15s" },
  tierBtnOn: { borderColor: C.amber, background: "#FFF8EC", boxShadow: "0 4px 14px rgba(244,166,35,0.3)" },
  tierTop: { fontFamily: FONT.display, fontSize: 14, fontWeight: 600, color: C.navy },
  tierSub: { fontSize: 9.5, color: "#8a92a6", textAlign: "center" },
  tierTotal: { fontFamily: FONT.display, fontSize: 15, fontWeight: 600, marginTop: 2 },

  totalCard: { position: "relative", background: `linear-gradient(135deg, ${C.navy}, ${C.indigo})`, borderRadius: 20, padding: "22px 20px", color: "#fff", textAlign: "center", overflow: "hidden", marginBottom: 14, boxShadow: "0 8px 28px rgba(13,27,62,0.32)" },
  totalGlow: { position: "absolute", top: -40, right: -40, width: 160, height: 160, background: `radial-gradient(circle, ${C.amber}55, transparent 70%)`, borderRadius: "50%" },
  totalEyebrow: { position: "relative", fontSize: 11.5, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.72)", marginBottom: 8 },
  totalBig: { position: "relative", fontFamily: FONT.display, fontSize: 46, fontWeight: 600, lineHeight: 1, color: C.amber, textShadow: "0 2px 18px rgba(244,166,35,0.4)" },
  totalPer: { position: "relative", fontSize: 12.5, color: "rgba(255,255,255,0.82)", marginTop: 9 },

  hiddenCard: { background: "#fff", border: `1.5px solid ${C.coral}`, borderRadius: 18, marginBottom: 14, overflow: "hidden", boxShadow: "0 2px 14px rgba(255,107,107,0.16)" },
  hiddenHead: { display: "flex", alignItems: "center", gap: 8, padding: "13px 16px", background: "linear-gradient(90deg, #FFF0EC, #FFF8EC)", fontFamily: FONT.display, fontWeight: 600, fontSize: 14.5, color: C.navy },
  hiddenBody: { padding: "12px 16px 16px" },
  hiddenLine: { display: "flex", justifyContent: "space-between", fontSize: 13.5, padding: "6px 0", borderBottom: `1px dashed ${C.line}`, color: "#3a4360" },
  hiddenNote: { fontSize: 12, color: "#6b7591", lineHeight: 1.5, marginTop: 11, marginBottom: 0 },

  bdLine: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: `1px solid ${C.line}` },
  bdKey: { fontSize: 14, fontWeight: 600, color: C.navy },
  bdNote: { fontSize: 11.5, color: "#8a92a6", marginTop: 2 },
  bdVal: { fontFamily: FONT.display, fontSize: 16, fontWeight: 600, color: C.teal },

  honest: { background: "#fff", borderRadius: 18, padding: 16, border: `1px solid ${C.line}`, boxShadow: "0 2px 14px rgba(13,27,62,0.06)" },
  honestP: { fontSize: 13, lineHeight: 1.55, color: "#3a4360", margin: "0 0 12px" },
  howBtn: { background: "none", border: "none", color: C.teal, fontWeight: 600, fontSize: 12.5, cursor: "pointer", padding: 0 },
  howText: { fontSize: 12, color: "#6b7591", lineHeight: 1.55, marginTop: 9, marginBottom: 0 },
};
