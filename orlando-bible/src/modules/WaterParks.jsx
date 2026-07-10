import React, { useState } from "react";
import { C, FONT } from "../theme";
import Header from "../components/Header";
import { PARKS, COMPARE_ROWS } from "../lib/waterParks";

const ACCENT = { teal: C.teal, coral: C.coral, amber: C.amber, navy: C.navy };

export default function WaterParks() {
  return (
    <>
      <Header
        title="Four water parks, one honest guide."
        subtitle="Volcano Bay, Typhoon Lagoon, Blizzard Beach and Aquatica — what's included, what isn't, and which is worth your day."
      />
      <main style={S.main}>
        <div style={S.warnBanner}>
          <strong>The #1 mistake:</strong> assuming a water park is bundled into your regular tickets.
          Only Volcano Bay is — and only with the 3-park Universal ticket. The other three always need
          their own admission.
        </div>

        {PARKS.map((p) => <ParkCard key={p.id} p={p} />)}

        <Card label="Side by side">
          <div style={S.cmpHead}>
            <div style={S.cmpHeadLabel} />
            {PARKS.map((p) => <div key={p.id} style={{ ...S.cmpHeadCol, color: ACCENT[p.accent] }}>{p.name}</div>)}
          </div>
          {COMPARE_ROWS.map((row) => (
            <div key={row.label} style={S.cmpRow}>
              <div style={S.cmpLabel}>{row.label}</div>
              <div style={S.cmpVals}>
                {row.values.map((v, i) => <div key={i} style={S.cmpVal}>{v}</div>)}
              </div>
            </div>
          ))}
        </Card>

        <div style={{ height: 96 }} />
      </main>
    </>
  );
}

function ParkCard({ p }) {
  const [open, setOpen] = useState(false);
  const accent = ACCENT[p.accent];
  return (
    <div style={{ ...S.pass, borderColor: accent }}>
      <button style={S.passTop} onClick={() => setOpen((o) => !o)}>
        <span style={{ ...S.passTag, background: accent }}>{p.operator}</span>
        <div style={{ flex: 1 }}>
          <div style={S.passTitle}>{p.name}</div>
          <div style={{ ...S.includedTag, color: p.included ? C.teal : C.coral }}>
            {p.included ? "✓ Included" : "✗ Separate ticket"}
          </div>
        </div>
        <span style={S.chev}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={S.passBody}>
          <Section title="The vibe">{p.vibe}</Section>
          <Section title="Signature rides">
            <div style={S.rideWrap}>{p.signature.map((r) => <span key={r} style={S.ride}>{r}</span>)}</div>
          </Section>
          <Section title="Getting in">{p.includedNote}</Section>
          <Section title="Price">{p.price}</Section>
          <div style={S.warnLine}>{p.warning}</div>
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
  warnBanner: { background: "#FFF3D6", border: `1px solid ${C.amber}`, borderRadius: 14, padding: "12px 14px", fontSize: 12.5, lineHeight: 1.55, color: "#7a5a10", marginBottom: 16 },

  pass: { background: "#fff", borderRadius: 18, border: "1.5px solid", marginBottom: 14, overflow: "hidden", boxShadow: "0 2px 14px rgba(13,27,62,0.06)" },
  passTop: { width: "100%", background: "none", border: "none", display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", cursor: "pointer", textAlign: "left" },
  passTag: { fontSize: 10, fontWeight: 700, letterSpacing: 0.6, color: "#fff", borderRadius: 6, padding: "3px 8px", flexShrink: 0 },
  passTitle: { fontFamily: FONT.display, fontSize: 16, fontWeight: 600, color: C.navy, lineHeight: 1.3 },
  includedTag: { fontSize: 11.5, fontWeight: 700, marginTop: 2 },
  chev: { fontSize: 9, color: "#b3bac9" },
  passBody: { padding: "0 16px 16px", borderTop: `1px solid ${C.line}` },

  section: { marginTop: 14 },
  sectionT: { fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, color: C.teal, marginBottom: 6 },
  sectionC: { fontSize: 13, lineHeight: 1.55, color: "#3a4360" },
  rideWrap: { display: "flex", flexWrap: "wrap", gap: 5 },
  ride: { fontSize: 11.5, color: C.navy, background: C.cream, border: `1px solid ${C.line}`, borderRadius: 7, padding: "3px 8px" },
  warnLine: { marginTop: 12, fontSize: 12, lineHeight: 1.5, color: "#a06800", background: "#FFF8EC", borderRadius: 8, padding: "8px 10px" },

  card: { background: "#fff", borderRadius: 18, padding: 16, marginBottom: 14, boxShadow: "0 2px 14px rgba(13,27,62,0.06)", border: `1px solid ${C.line}` },
  cardLabel: { fontFamily: FONT.display, fontSize: 15, fontWeight: 600, color: C.navy, marginBottom: 12 },
  cmpHead: { display: "flex", gap: 6, marginBottom: 8, paddingBottom: 8, borderBottom: `2px solid ${C.line}` },
  cmpHeadLabel: { width: 84, flexShrink: 0 },
  cmpHeadCol: { flex: 1, fontSize: 10, fontWeight: 700, textAlign: "center" },
  cmpRow: { display: "flex", gap: 6, padding: "9px 0", borderBottom: `1px solid ${C.line}` },
  cmpLabel: { width: 84, flexShrink: 0, fontSize: 10.5, color: "#8a92a6", lineHeight: 1.3 },
  cmpVals: { flex: 1, display: "flex", gap: 6 },
  cmpVal: { flex: 1, fontSize: 10, color: "#3a4360", lineHeight: 1.35, textAlign: "center" },
};
