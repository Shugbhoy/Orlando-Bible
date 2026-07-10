import React, { useState } from "react";
import { C, FONT } from "../theme";
import Header from "../components/Header";
import { RESORTS, TIPS } from "../lib/rainyDay";

const ACCENT = { navy: C.navy, teal: C.teal };

export default function RainyDay() {
  return (
    <>
      <Header
        title="The rainy day plan."
        subtitle="Parks stay open in rain — it's lightning that closes rides. Here's where to go, and what to pack."
      />
      <main style={S.main}>
        <div style={S.ruleBanner}>
          <strong>The core rule at both resorts:</strong> the parks don't close for rain. Outdoor rides
          pause specifically for lightning, and reopen once it clears. No refunds for a normal shower —
          only a genuine hurricane changes that.
        </div>

        {RESORTS.map((r) => <ResortCard key={r.resort} r={r} />)}

        <Card label="Pack for it">
          {TIPS.map((t, i) => (
            <div key={i} style={S.tip}><span style={S.tipDot} />{t}</div>
          ))}
        </Card>

        <div style={{ height: 96 }} />
      </main>
    </>
  );
}

function ResortCard({ r }) {
  const [open, setOpen] = useState(true);
  const accent = ACCENT[r.accent];
  return (
    <div style={{ ...S.pass, borderColor: accent }}>
      <button style={S.passTop} onClick={() => setOpen((o) => !o)}>
        <span style={{ ...S.passTag, background: accent }}>{r.resort}</span>
        <div style={{ flex: 1 }}>
          <div style={S.passTitle}>Best on a wet day: {r.bestPark}</div>
          <div style={S.passSub}>Avoid: {r.worstPark}</div>
        </div>
        <span style={S.chev}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={S.passBody}>
          <Section title={`Why ${r.bestPark}`}>{r.bestWhy}</Section>
          <Section title="Keeps running">{r.stillRunning}</Section>
          <Section title={`Why avoid ${r.worstPark}`}>{r.worstWhy}</Section>
          <div style={S.extraNote}>{r.closes}</div>
        </div>
      )}
    </div>
  );
}

function Card({ label, children }) {
  return (
    <section style={S.card}>
      <div style={S.cardLabel}>{label}</div>
      {children}
    </section>
  );
}

function Section({ title, children }) {
  return (
    <div style={S.section}>
      <div style={S.sectionT}>{title}</div>
      <div style={S.sectionC}>{children}</div>
    </div>
  );
}

const S = {
  main: { padding: "18px 16px 0" },
  ruleBanner: { background: "#FFF3D6", border: `1px solid ${C.amber}`, borderRadius: 14, padding: "12px 14px", fontSize: 12.5, lineHeight: 1.55, color: "#7a5a10", marginBottom: 16 },

  pass: { background: "#fff", borderRadius: 18, border: "1.5px solid", marginBottom: 14, overflow: "hidden", boxShadow: "0 2px 14px rgba(13,27,62,0.06)" },
  passTop: { width: "100%", background: "none", border: "none", display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", cursor: "pointer", textAlign: "left" },
  passTag: { fontSize: 10, fontWeight: 700, letterSpacing: 0.6, color: "#fff", borderRadius: 6, padding: "3px 8px", flexShrink: 0 },
  passTitle: { fontFamily: FONT.display, fontSize: 14.5, fontWeight: 600, color: C.navy, lineHeight: 1.3 },
  passSub: { fontSize: 11.5, color: "#8a92a6", marginTop: 3 },
  chev: { fontSize: 9, color: "#b3bac9" },
  passBody: { padding: "0 16px 16px", borderTop: `1px solid ${C.line}` },

  section: { marginTop: 14 },
  sectionT: { fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, color: C.teal, marginBottom: 6 },
  sectionC: { fontSize: 13, lineHeight: 1.55, color: "#3a4360" },
  extraNote: { marginTop: 12, fontSize: 12, lineHeight: 1.5, color: "#0f5c53", background: "#E2F5F2", borderRadius: 8, padding: "8px 10px" },

  card: { background: "#fff", borderRadius: 18, padding: 16, marginBottom: 14, boxShadow: "0 2px 14px rgba(13,27,62,0.06)", border: `1px solid ${C.line}` },
  cardLabel: { fontFamily: FONT.display, fontSize: 15, fontWeight: 600, color: C.navy, marginBottom: 10 },
  tip: { display: "flex", gap: 8, fontSize: 12.5, lineHeight: 1.5, color: "#3a4360", marginBottom: 9 },
  tipDot: { width: 5, height: 5, borderRadius: "50%", background: C.amber, marginTop: 7, flexShrink: 0 },
};
