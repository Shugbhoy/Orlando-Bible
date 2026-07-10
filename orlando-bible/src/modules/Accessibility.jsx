import React, { useState } from "react";
import { C, FONT } from "../theme";
import Header from "../components/Header";
import { DAS, AAP, COMPARISON, TIPS, CURRENT_NOTE } from "../lib/accessibility";

export default function Accessibility() {
  return (
    <>
      <Header
        title="DAS & AAP, decoded."
        subtitle="Because Orlando should be for everyone — the accessibility passes at both resorts, in plain English."
      />
      <main style={S.main}>
        <div style={S.intro}>
          Both Disney and Universal run a queue-accommodation system for guests who can't wait in a
          standard line. The two work differently, and the information's scattered — here's both,
          side by side.
        </div>

        <PassCard data={DAS} accent={C.navy} tag="DISNEY" />
        <PassCard data={AAP} accent={C.teal} tag="UNIVERSAL" />

        <Card label="Disney vs Universal, at a glance" step="•">
          {COMPARISON.map((row) => (
            <div key={row.label} style={S.cmpRow}>
              <div style={S.cmpLabel}>{row.label}</div>
              <div style={S.cmpVals}>
                <div style={S.cmpVal}><span style={S.cmpTag}>Disney</span>{row.disney}</div>
                <div style={S.cmpVal}><span style={{ ...S.cmpTag, color: C.teal }}>Universal</span>{row.universal}</div>
              </div>
            </div>
          ))}
        </Card>

        <Card label="Tips that apply to both" step="•">
          {TIPS.map((t, i) => (
            <div key={i} style={S.tip}><span style={S.tipDot} />{t}</div>
          ))}
        </Card>

        <div style={S.noteCard}>{CURRENT_NOTE}</div>

        <div style={{ height: 96 }} />
      </main>
    </>
  );
}

function PassCard({ data, accent, tag }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ ...S.pass, borderColor: accent }}>
      <button style={S.passTop} onClick={() => setOpen((o) => !o)}>
        <span style={{ ...S.passTag, background: accent }}>{tag}</span>
        <div style={{ flex: 1 }}>
          <div style={S.passTitle}>{data.name}</div>
          <div style={S.passSub}>Party of {data.partySize.split(" ")[0] === "The" ? data.partySize : data.partySize}</div>
        </div>
        <span style={S.chev}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={S.passBody}>
          <Section title="Who it's for">{data.who}</Section>
          <Section title="How it works">
            {data.howItWorks.map((line, i) => <div key={i} style={S.bullet}><span style={S.bulletDot} />{line}</div>)}
          </Section>
          <Section title="Registering">
            {data.registration.map((line, i) => <div key={i} style={S.bullet}><span style={S.bulletDot} />{line}</div>)}
          </Section>
          <Section title="Party size & validity">
            <div style={S.kv}><strong>Party size:</strong> {data.partySize}</div>
            <div style={S.kv}><strong>Valid for:</strong> {data.validity}</div>
          </Section>
          <div style={S.source}>Official source: {data.source}</div>
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
  intro: { fontSize: 13.5, lineHeight: 1.55, color: "#46506b", margin: "0 4px 16px" },

  pass: { background: "#fff", borderRadius: 18, border: "1.5px solid", marginBottom: 14, overflow: "hidden", boxShadow: "0 2px 14px rgba(13,27,62,0.06)" },
  passTop: { width: "100%", background: "none", border: "none", display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", cursor: "pointer", textAlign: "left" },
  passTag: { fontSize: 10, fontWeight: 700, letterSpacing: 0.6, color: "#fff", borderRadius: 6, padding: "3px 8px", flexShrink: 0 },
  passTitle: { fontFamily: FONT.display, fontSize: 15, fontWeight: 600, color: C.navy, lineHeight: 1.3 },
  passSub: { fontSize: 11.5, color: "#8a92a6", marginTop: 2 },
  chev: { fontSize: 9, color: "#b3bac9" },
  passBody: { padding: "0 16px 16px", borderTop: `1px solid ${C.line}` },

  section: { marginTop: 14 },
  sectionT: { fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, color: C.teal, marginBottom: 6 },
  sectionC: { fontSize: 13, lineHeight: 1.55, color: "#3a4360" },
  bullet: { display: "flex", gap: 8, fontSize: 12.5, lineHeight: 1.5, color: "#3a4360", marginBottom: 7 },
  bulletDot: { width: 5, height: 5, borderRadius: "50%", background: C.amber, marginTop: 7, flexShrink: 0 },
  kv: { fontSize: 12.5, lineHeight: 1.6, color: "#3a4360" },
  source: { fontSize: 10.5, color: "#a8afc0", marginTop: 12, fontStyle: "italic" },

  card: { background: "#fff", borderRadius: 18, padding: 16, marginBottom: 14, boxShadow: "0 2px 14px rgba(13,27,62,0.06)", border: `1px solid ${C.line}` },
  cardLabel: { fontFamily: FONT.display, fontSize: 15, fontWeight: 600, color: C.navy, marginBottom: 12 },

  cmpRow: { padding: "10px 0", borderBottom: `1px solid ${C.line}` },
  cmpLabel: { fontSize: 11, fontWeight: 700, color: "#8a92a6", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 6 },
  cmpVals: { display: "flex", gap: 10 },
  cmpVal: { flex: 1, fontSize: 12.5, color: "#3a4360", lineHeight: 1.4 },
  cmpTag: { display: "block", fontSize: 10, fontWeight: 700, color: C.navy, marginBottom: 2 },

  tip: { display: "flex", gap: 8, fontSize: 12.5, lineHeight: 1.5, color: "#3a4360", marginBottom: 9 },
  tipDot: { width: 5, height: 5, borderRadius: "50%", background: C.amber, marginTop: 7, flexShrink: 0 },

  noteCard: { background: "#FFF3D6", border: `1px solid ${C.amber}`, borderRadius: 14, padding: "12px 14px", fontSize: 12, lineHeight: 1.55, color: "#7a5a10" },
};
