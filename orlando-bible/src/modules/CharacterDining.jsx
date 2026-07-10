import React, { useState } from "react";
import { C, FONT } from "../theme";
import Header from "../components/Header";
import { MEALS, TIPS } from "../lib/characterDining";

const TONE = { good: C.teal, note: C.amber };

export default function CharacterDining() {
  return (
    <>
      <Header
        title="Character dining, honestly ranked."
        subtitle="Which meals are worth booking, which need a park ticket, and the ones that don't."
      />
      <main style={S.main}>
        <div style={S.noTicketBanner}>
          <strong>Best-kept secret:</strong> four of these meals are at Disney resort hotels and need
          <strong> no park ticket at all</strong> — a genuine hack for turning a rest day into a magical one.
        </div>

        {MEALS.map((m) => <MealCard key={m.name} m={m} />)}

        <Card label="Booking tips">
          {TIPS.map((t, i) => (
            <div key={i} style={S.tip}><span style={S.tipDot} />{t}</div>
          ))}
        </Card>

        <div style={{ height: 96 }} />
      </main>
    </>
  );
}

function MealCard({ m }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={S.meal}>
      <button style={S.mealTop} onClick={() => setOpen((o) => !o)}>
        <div style={{ flex: 1 }}>
          <div style={S.mealTitle}>{m.name}</div>
          <div style={S.mealLoc}>{m.location}</div>
          <div style={{ ...S.ticketTag, color: m.needsTicket ? C.coral : C.teal }}>
            {m.needsTicket ? "Needs a park ticket" : "✓ No park ticket needed"}
          </div>
        </div>
        <span style={S.chev}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={S.mealBody}>
          <Section title="Price">{m.price}</Section>
          <Section title="Characters">{m.characters}</Section>
          <div style={{ ...S.verdict, borderColor: TONE[m.tone] }}>{m.verdict}</div>
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
  noTicketBanner: { background: "#E2F5F2", border: `1px solid ${C.teal}`, borderRadius: 14, padding: "12px 14px", fontSize: 12.5, lineHeight: 1.55, color: "#0f5c53", marginBottom: 16 },

  meal: { background: "#fff", borderRadius: 16, border: `1px solid ${C.line}`, marginBottom: 10, overflow: "hidden", boxShadow: "0 1px 8px rgba(13,27,62,0.05)" },
  mealTop: { width: "100%", background: "none", border: "none", display: "flex", alignItems: "flex-start", gap: 10, padding: "13px 15px", cursor: "pointer", textAlign: "left" },
  mealTitle: { fontFamily: FONT.display, fontSize: 14.5, fontWeight: 600, color: C.navy },
  mealLoc: { fontSize: 11.5, color: "#8a92a6", marginTop: 2 },
  ticketTag: { fontSize: 11, fontWeight: 700, marginTop: 4 },
  chev: { fontSize: 9, color: "#b3bac9", marginTop: 4 },
  mealBody: { padding: "0 15px 14px", borderTop: `1px solid ${C.line}` },

  section: { marginTop: 12 },
  sectionT: { fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, color: C.teal, marginBottom: 4 },
  sectionC: { fontSize: 13, lineHeight: 1.5, color: "#3a4360" },
  verdict: { marginTop: 12, fontSize: 12.5, lineHeight: 1.55, color: "#3a4360", background: C.cream, borderLeft: "3px solid", borderRadius: 8, padding: "9px 11px" },

  card: { background: "#fff", borderRadius: 18, padding: 16, marginBottom: 14, boxShadow: "0 2px 14px rgba(13,27,62,0.06)", border: `1px solid ${C.line}` },
  cardLabel: { fontFamily: FONT.display, fontSize: 15, fontWeight: 600, color: C.navy, marginBottom: 10 },
  tip: { display: "flex", gap: 8, fontSize: 12.5, lineHeight: 1.5, color: "#3a4360", marginBottom: 9 },
  tipDot: { width: 5, height: 5, borderRadius: "50%", background: C.amber, marginTop: 7, flexShrink: 0 },
};
