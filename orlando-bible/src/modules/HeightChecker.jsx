import React, { useState, useMemo } from "react";
import { C, FONT } from "../theme";
import Header from "../components/Header";
import { checkHeight, CM_PER_INCH } from "../lib/heightRequirements";

export default function HeightChecker() {
  const [unit, setUnit] = useState("cm"); // cm | in
  const [heightCm, setHeightCm] = useState(110);

  const heightIn = heightCm / CM_PER_INCH;
  const { canRideSolo, needsCompanion, tooSmall } = useMemo(() => checkHeight(heightIn), [heightIn]);

  const displayHeight = unit === "cm" ? `${heightCm} cm` : `${(heightIn).toFixed(0)}"`;

  const step = unit === "cm" ? 1 : 2.54;
  const bump = (dir) => setHeightCm((h) => Math.max(60, Math.min(200, h + dir * step)));

  const groupByPark = (list) => {
    const byPark = {};
    for (const r of list) {
      if (!byPark[r.park]) byPark[r.park] = [];
      byPark[r.park].push(r);
    }
    return byPark;
  };

  return (
    <>
      <Header
        title="Tall enough to ride?"
        subtitle="Enter a height and see exactly which rides are in — and which need a bit more growing."
      />
      <main style={S.main}>
        <section style={S.hero}>
          <div style={S.heroGlow} aria-hidden="true" />
          <div style={S.unitToggle}>
            <button style={{ ...S.unitBtn, ...(unit === "cm" ? S.unitBtnOn : {}) }} onClick={() => setUnit("cm")}>cm</button>
            <button style={{ ...S.unitBtn, ...(unit === "in" ? S.unitBtnOn : {}) }} onClick={() => setUnit("in")}>inches</button>
          </div>
          <div style={S.heightRow}>
            <button style={S.stepBtn} onClick={() => bump(-1)} aria-label="shorter">–</button>
            <div style={S.heightBig}>{displayHeight}</div>
            <button style={S.stepBtn} onClick={() => bump(1)} aria-label="taller">+</button>
          </div>
          <div style={S.heroNote}>Measure with shoes on, standing straight — the same way the parks do it.</div>
        </section>

        <section style={S.summaryRow}>
          <SummaryChip n={canRideSolo.length} label="ride solo" color={C.teal} />
          <SummaryChip n={needsCompanion.length} label="need a companion" color={C.amber} />
          <SummaryChip n={tooSmall.length} label="not yet" color={C.coral} />
        </section>

        {needsCompanion.length > 0 && (
          <RideGroup
            title="Can ride — with a Supervising Companion (14+)"
            color={C.amber}
            groups={groupByPark(needsCompanion)}
          />
        )}

        <RideGroup title="Can ride solo" color={C.teal} groups={groupByPark(canRideSolo)} defaultOpen />

        {tooSmall.length > 0 && (
          <RideGroup title="Not tall enough yet" color={C.coral} groups={groupByPark(tooSmall)} showGap heightIn={heightIn} />
        )}

        <div style={S.honest}>
          <p style={S.honestP}>
            <strong style={{ color: C.teal }}>Rider Switch / Child Swap is free.</strong> If one member
            of your party doesn't meet a height requirement, one adult can ride while the other waits
            with them, then swap — without queuing twice. Ask at the ride entrance.
          </p>
          <p style={S.honestP}>
            <strong style={{ color: C.teal }}>A few Epic Universe rides are marked "unconfirmed."</strong> They're
            new enough that a firm published height isn't out yet — treat those numbers as a sensible
            estimate and double-check at the ride on the day.
          </p>
        </div>

        <div style={{ height: 96 }} />
      </main>
    </>
  );
}

function SummaryChip({ n, label, color }) {
  return (
    <div style={S.chip}>
      <div style={{ ...S.chipN, color }}>{n}</div>
      <div style={S.chipL}>{label}</div>
    </div>
  );
}

function RideGroup({ title, color, groups, defaultOpen, showGap, heightIn }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const parks = Object.keys(groups);
  if (parks.length === 0) return null;
  return (
    <div style={S.group}>
      <button style={S.groupTop} onClick={() => setOpen((o) => !o)}>
        <span style={{ ...S.groupDot, background: color }} />
        <span style={S.groupTitle}>{title}</span>
        <span style={S.groupChev}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={S.groupBody}>
          {parks.map((park) => (
            <div key={park} style={S.parkBlock}>
              <div style={S.parkName}>{park}</div>
              {groups[park].map((r) => (
                <div key={r.name} style={S.rideRow}>
                  <span style={S.rideName}>{r.name}{r.unconfirmed && <span style={S.unconfirmedTag}> · verify</span>}</span>
                  <span style={S.rideMeta}>
                    {showGap && heightIn != null ? `needs +${Math.ceil((r.companion || r.solo) - heightIn)}"` : `${r.solo === 0 ? "no min" : r.solo + '"'}`}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const S = {
  main: { padding: "18px 16px 0" },

  hero: { position: "relative", background: `linear-gradient(135deg, ${C.navy}, ${C.indigo})`, borderRadius: 20, padding: "22px 20px", color: "#fff", textAlign: "center", overflow: "hidden", marginBottom: 14, boxShadow: "0 8px 28px rgba(13,27,62,0.32)" },
  heroGlow: { position: "absolute", top: -40, right: -40, width: 160, height: 160, background: `radial-gradient(circle, ${C.amber}55, transparent 70%)`, borderRadius: "50%" },
  unitToggle: { position: "relative", display: "flex", justifyContent: "center", gap: 6, marginBottom: 16 },
  unitBtn: { background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 8, padding: "5px 14px", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)", cursor: "pointer" },
  unitBtnOn: { background: C.amber, color: C.navy },
  heightRow: { position: "relative", display: "flex", alignItems: "center", justifyContent: "center", gap: 20 },
  stepBtn: { width: 44, height: 44, borderRadius: 12, border: "none", background: "rgba(255,255,255,0.14)", color: "#fff", fontSize: 24, fontWeight: 700, cursor: "pointer" },
  heightBig: { fontFamily: FONT.display, fontSize: 40, fontWeight: 600, color: C.amber, minWidth: 130 },
  heroNote: { position: "relative", fontSize: 11.5, color: "rgba(255,255,255,0.7)", marginTop: 14 },

  summaryRow: { display: "flex", gap: 8, marginBottom: 16 },
  chip: { flex: 1, background: "#fff", borderRadius: 14, padding: "12px 8px", textAlign: "center", border: `1px solid ${C.line}`, boxShadow: "0 1px 8px rgba(13,27,62,0.05)" },
  chipN: { fontFamily: FONT.display, fontSize: 24, fontWeight: 600, lineHeight: 1 },
  chipL: { fontSize: 10, color: "#8a92a6", marginTop: 4, textTransform: "uppercase", letterSpacing: 0.3 },

  group: { background: "#fff", borderRadius: 16, border: `1px solid ${C.line}`, marginBottom: 10, overflow: "hidden", boxShadow: "0 1px 8px rgba(13,27,62,0.05)" },
  groupTop: { width: "100%", background: "none", border: "none", display: "flex", alignItems: "center", gap: 10, padding: "13px 15px", cursor: "pointer", textAlign: "left" },
  groupDot: { width: 9, height: 9, borderRadius: "50%", flexShrink: 0 },
  groupTitle: { flex: 1, fontFamily: FONT.display, fontSize: 13.5, fontWeight: 600, color: C.navy },
  groupChev: { fontSize: 9, color: "#b3bac9" },
  groupBody: { padding: "0 15px 12px", borderTop: `1px solid ${C.line}` },
  parkBlock: { marginTop: 10 },
  parkName: { fontSize: 10.5, fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 5 },
  rideRow: { display: "flex", justifyContent: "space-between", gap: 10, padding: "5px 0" },
  rideName: { fontSize: 12.5, color: "#3a4360", lineHeight: 1.4 },
  rideMeta: { fontSize: 11.5, color: "#8a92a6", flexShrink: 0 },
  unconfirmedTag: { color: C.amber, fontStyle: "italic" },

  honest: { background: "#fff", borderRadius: 18, padding: 16, border: `1px solid ${C.line}`, boxShadow: "0 2px 14px rgba(13,27,62,0.06)" },
  honestP: { fontSize: 13, lineHeight: 1.55, color: "#3a4360", margin: "0 0 12px" },
};
