import React, { useState, useMemo } from "react";
import { C, FONT } from "../theme";
import Header from "../components/Header";
import { useTripProfile } from "../context/TripProfile";
import { CATEGORIES, tally, gbp } from "../lib/deals";

export default function DealsTips() {
  const { dealsApplied: applied, toggleDeal: toggle } = useTripProfile();
  const totals = useMemo(() => tally(applied), [applied]);

  return (
    <>
      <Header
        title="Save your time & money."
        subtitle="In Orlando, the two greatest commodities. Without a plan it devours both and leaves you feeling cheated — so here's the plan."
      />
      <main style={S.main}>
        {/* Savings overlay hero */}
        <section style={S.hero}>
          <div style={S.heroGlow} aria-hidden="true" />
          <div style={S.heroEyebrow}>A family of 4 could save</div>
          <div style={S.heroBig}>{gbp(totals.money)}</div>
          <div style={S.heroSub}>
            across {totals.count} tip{totals.count === 1 ? "" : "s"}
            {totals.timeHours > 0 && <> · plus ~{totals.timeHours}h of queues skipped</>}
          </div>
          <div style={S.heroNote}>Tap a tip to add or remove it. Not every saving stacks — these are honest, indicative figures.</div>
        </section>

        {CATEGORIES.map((cat) => (
          <div key={cat.id} style={S.cat}>
            <div style={S.catHead}>
              <span style={S.catIcon}><CatIcon name={cat.icon} /></span>
              <div>
                <div style={S.catTitle}>{cat.title}</div>
                <div style={S.catBlurb}>{cat.blurb}</div>
              </div>
            </div>
            {cat.tips.map((tip) => (
              <TipCard key={tip.id} tip={tip} on={!!applied[tip.id]} onToggle={() => toggle(tip.id)} />
            ))}
          </div>
        ))}

        <div style={S.mission}>
          <p style={S.missionText}>“Get the most from your dollars.”</p>
        </div>

        <div style={{ height: 96 }} />
      </main>
    </>
  );
}

function TipCard({ tip, on, onToggle }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ ...S.tip, ...(on ? S.tipOn : {}) }}>
      <div style={S.tipTop}>
        <button style={S.tipMain} onClick={() => setOpen((o) => !o)}>
          <div style={S.tipTitle}>{tip.title}</div>
          <div style={S.badges}>
            {tip.money > 0 && <span style={S.moneyBadge}>save ~{gbp(tip.money)}</span>}
            {tip.timeHours > 0 && <span style={S.timeBadge}><ClockIcon /> time</span>}
            <span style={S.expand}>{open ? "▲" : "▼"}</span>
          </div>
        </button>
        <button
          style={{ ...S.check, ...(on ? S.checkOn : {}) }}
          onClick={onToggle}
          aria-label={on ? "Remove from estimate" : "Add to estimate"}
        >
          {on ? "✓" : "+"}
        </button>
      </div>
      {open && (
        <div style={S.tipBody}>
          <p style={S.tipText}>{tip.text}</p>
          {tip.caveat && <p style={S.tipCaveat}>⚠ {tip.caveat}</p>}
          {tip.affiliate && <div style={S.affiliate}>Booking link: {tip.affiliate}</div>}
        </div>
      )}
    </div>
  );
}

function CatIcon({ name }) {
  const p = { fill: "none", stroke: "#fff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  const shapes = {
    plane: <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" fill="#fff" stroke="none" />,
    bolt: <path d="M13 2L4 14h6l-1 8 9-12h-6z" fill="#fff" stroke="none" />,
    ticket: <><path d="M3 8a2 2 0 012-2h14a2 2 0 012 2 2 2 0 000 4 2 2 0 000 4 2 2 0 01-2 2H5a2 2 0 01-2-2 2 2 0 000-4 2 2 0 000-4z" {...p} /></>,
    bed: <path d="M3 18v-6h18v6M3 12V8a2 2 0 012-2h5a2 2 0 012 2v4M3 18h18" {...p} />,
    cart: <><circle cx="9" cy="20" r="1.4" fill="#fff" /><circle cx="17" cy="20" r="1.4" fill="#fff" /><path d="M2 3h2l2.5 12h11l2-8H6" {...p} /></>,
    fork: <path d="M6 3v7a2 2 0 002 2v9M8 3v6M16 3c-1.5 0-2 2-2 4s.5 4 2 4v6" {...p} />,
    gift: <><rect x="4" y="9" width="16" height="11" rx="1" {...p} /><path d="M2 9h20M12 9v11M12 9s-2-6-5-4 5 4 5 4zM12 9s2-6 5-4-5 4-5 4z" {...p} /></>,
    phone: <><rect x="6" y="3" width="12" height="18" rx="2" {...p} /><path d="M11 18h2" {...p} /></>,
  };
  return <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">{shapes[name]}</svg>;
}

function ClockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" style={{ marginRight: 3 }} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke={C.teal} strokeWidth="2.5" />
      <path d="M12 7v5l3 2" fill="none" stroke={C.teal} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const S = {
  main: { padding: "18px 16px 0" },

  hero: { position: "relative", background: `linear-gradient(135deg, ${C.navy}, ${C.indigo})`, borderRadius: 20, padding: "22px 20px", color: "#fff", textAlign: "center", overflow: "hidden", marginBottom: 18, boxShadow: "0 8px 28px rgba(13,27,62,0.32)" },
  heroGlow: { position: "absolute", top: -40, right: -40, width: 160, height: 160, background: `radial-gradient(circle, ${C.amber}55, transparent 70%)`, borderRadius: "50%" },
  heroEyebrow: { position: "relative", fontSize: 11.5, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.72)", marginBottom: 8 },
  heroBig: { position: "relative", fontFamily: FONT.display, fontSize: 48, fontWeight: 600, lineHeight: 1, color: C.amber, textShadow: "0 2px 18px rgba(244,166,35,0.4)" },
  heroSub: { position: "relative", fontSize: 13, color: "rgba(255,255,255,0.9)", marginTop: 9 },
  heroNote: { position: "relative", fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 10, lineHeight: 1.45 },

  cat: { marginBottom: 18 },
  catHead: { display: "flex", alignItems: "center", gap: 11, marginBottom: 11, padding: "0 2px" },
  catIcon: { width: 40, height: 40, borderRadius: 11, background: `linear-gradient(150deg, ${C.teal}, ${C.tealDark})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 3px 10px rgba(26,158,143,0.3)" },
  catTitle: { fontFamily: FONT.display, fontSize: 17, fontWeight: 600, color: C.navy },
  catBlurb: { fontSize: 12, color: "#8a92a6", marginTop: 1 },

  tip: { background: "#fff", borderRadius: 14, border: `1px solid ${C.line}`, marginBottom: 9, overflow: "hidden", boxShadow: "0 1px 8px rgba(13,27,62,0.05)", transition: "all .15s" },
  tipOn: { borderColor: C.amber, boxShadow: "0 2px 12px rgba(244,166,35,0.18)" },
  tipTop: { display: "flex", alignItems: "stretch" },
  tipMain: { flex: 1, background: "none", border: "none", textAlign: "left", cursor: "pointer", padding: "13px 4px 13px 14px", display: "flex", flexDirection: "column", gap: 7 },
  tipTitle: { fontSize: 13.5, fontWeight: 600, color: C.navy, lineHeight: 1.3 },
  badges: { display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" },
  moneyBadge: { fontSize: 11, fontWeight: 700, color: C.navy, background: "#FFF3D6", borderRadius: 6, padding: "2px 7px" },
  timeBadge: { fontSize: 11, fontWeight: 700, color: C.teal, background: "#E2F5F2", borderRadius: 6, padding: "2px 7px", display: "inline-flex", alignItems: "center" },
  expand: { fontSize: 9, color: "#b3bac9", marginLeft: "auto" },
  check: { width: 44, flexShrink: 0, border: "none", borderLeft: `1px solid ${C.line}`, background: C.cream, color: "#b3bac9", fontSize: 18, fontWeight: 700, cursor: "pointer" },
  checkOn: { background: C.amber, color: C.navy, borderLeftColor: C.amber },

  tipBody: { padding: "0 14px 14px", borderTop: `1px solid ${C.line}` },
  tipText: { fontSize: 12.5, lineHeight: 1.55, color: "#3a4360", margin: "11px 0 0" },
  tipCaveat: { fontSize: 11.5, lineHeight: 1.5, color: "#a06800", background: "#FFF8EC", borderRadius: 8, padding: "8px 10px", margin: "10px 0 0" },
  affiliate: { fontSize: 11, color: C.teal, fontWeight: 600, marginTop: 9 },

  mission: { textAlign: "center", padding: "6px 0 4px" },
  missionText: { fontFamily: FONT.display, fontSize: 16, fontWeight: 500, color: C.teal, fontStyle: "italic", margin: 0 },
};
