import React, { useState, useMemo } from "react";
import { C, FONT } from "../theme";
import Header from "../components/Header";
import { CATEGORIES, BUY_THERE_INSTEAD } from "../lib/packingList";

const totalItems = CATEGORIES.reduce((n, c) => n + c.items.length, 0);

export default function PackingList() {
  const [checked, setChecked] = useState({});
  const toggle = (id) => setChecked((c) => ({ ...c, [id]: !c[id] }));
  const doneCount = useMemo(() => Object.values(checked).filter(Boolean).length, [checked]);

  return (
    <>
      <Header
        title="UK → Florida, packed."
        subtitle="Tick as you go. Nothing forgotten, nothing wasted on things cheaper to buy when you land."
      />
      <main style={S.main}>
        <section style={S.progress}>
          <div style={S.progressGlow} aria-hidden="true" />
          <div style={S.progressBig}>{doneCount} / {totalItems}</div>
          <div style={S.progressLabel}>packed</div>
          <div style={S.progressBar}>
            <div style={{ ...S.progressFill, width: `${totalItems ? (doneCount / totalItems) * 100 : 0}%` }} />
          </div>
        </section>

        {CATEGORIES.map((cat) => (
          <Card key={cat.id} label={cat.title}>
            {cat.items.map((item) => (
              <button key={item.id} style={S.item} onClick={() => toggle(item.id)}>
                <span style={{ ...S.box, ...(checked[item.id] ? S.boxOn : {}) }}>{checked[item.id] ? "✓" : ""}</span>
                <span style={{ ...S.itemText, ...(checked[item.id] ? S.itemTextOn : {}) }}>{item.text}</span>
              </button>
            ))}
          </Card>
        ))}

        <div style={S.buyCard}>
          <div style={S.buyHead}>Don't pack these — buy them at Walmart</div>
          {BUY_THERE_INSTEAD.map((t, i) => (
            <div key={i} style={S.buyLine}><span style={S.buyDot} />{t}</div>
          ))}
        </div>

        <div style={{ height: 96 }} />
      </main>
    </>
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

const S = {
  main: { padding: "18px 16px 0" },

  progress: { position: "relative", background: `linear-gradient(135deg, ${C.navy}, ${C.indigo})`, borderRadius: 20, padding: "20px", color: "#fff", textAlign: "center", overflow: "hidden", marginBottom: 16, boxShadow: "0 8px 28px rgba(13,27,62,0.32)" },
  progressGlow: { position: "absolute", top: -40, right: -40, width: 160, height: 160, background: `radial-gradient(circle, ${C.amber}55, transparent 70%)`, borderRadius: "50%" },
  progressBig: { position: "relative", fontFamily: FONT.display, fontSize: 34, fontWeight: 600, color: C.amber },
  progressLabel: { position: "relative", fontSize: 11, color: "rgba(255,255,255,0.72)", textTransform: "uppercase", letterSpacing: 0.6, marginTop: 2 },
  progressBar: { position: "relative", height: 8, background: "rgba(255,255,255,0.15)", borderRadius: 6, marginTop: 14, overflow: "hidden" },
  progressFill: { height: "100%", background: C.amber, borderRadius: 6, transition: "width .3s ease" },

  card: { background: "#fff", borderRadius: 18, padding: 16, marginBottom: 12, boxShadow: "0 2px 14px rgba(13,27,62,0.06)", border: `1px solid ${C.line}` },
  cardLabel: { fontFamily: FONT.display, fontSize: 15, fontWeight: 600, color: C.navy, marginBottom: 10 },

  item: { width: "100%", display: "flex", alignItems: "flex-start", gap: 10, background: "none", border: "none", padding: "8px 0", cursor: "pointer", textAlign: "left" },
  box: { width: 20, height: 20, borderRadius: 6, border: `2px solid ${C.line}`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", marginTop: 1 },
  boxOn: { background: C.teal, borderColor: C.teal },
  itemText: { fontSize: 13, lineHeight: 1.5, color: "#3a4360" },
  itemTextOn: { color: "#a8afc0", textDecoration: "line-through" },

  buyCard: { background: "#FFF8EC", border: `1px solid ${C.amber}`, borderRadius: 18, padding: 16 },
  buyHead: { fontFamily: FONT.display, fontSize: 14, fontWeight: 600, color: C.navy, marginBottom: 10 },
  buyLine: { display: "flex", gap: 8, fontSize: 12.5, lineHeight: 1.5, color: "#7a5a10", marginBottom: 8 },
  buyDot: { width: 5, height: 5, borderRadius: "50%", background: C.amber, marginTop: 7, flexShrink: 0 },
};
