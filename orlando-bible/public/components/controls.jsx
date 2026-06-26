import React from "react";
import { C, FONT } from "../theme";

export function Card({ label, step, children }) {
  return (
    <section style={S.card}>
      <div style={S.cardHead}>
        {step && <span style={S.cardStep}>{step}</span>}
        <span style={S.cardLabel}>{label}</span>
      </div>
      {children}
    </section>
  );
}

export const Row = ({ children }) => <div style={S.row2}>{children}</div>;

export function Stepper({ label, value, onChange, min = 0, max = 99, step = 1, hint, wide }) {
  return (
    <div style={{ ...S.stepWrap, ...(wide ? { width: "100%" } : {}) }}>
      <div style={S.stepLabel}>
        {label}
        {hint && <em style={S.stepHint}> · {hint}</em>}
      </div>
      <div style={S.stepCtl}>
        <button style={S.stepBtn} onClick={() => onChange(Math.max(min, value - step))} aria-label={`decrease ${label}`}>–</button>
        <span style={S.stepVal}>{value}</span>
        <button style={S.stepBtn} onClick={() => onChange(Math.min(max, value + step))} aria-label={`increase ${label}`}>+</button>
      </div>
    </div>
  );
}

export function Seg({ label, value, onChange, opts }) {
  return (
    <div style={S.segWrap}>
      <div style={S.segLabel}>{label}</div>
      <div style={S.segRow}>
        {opts.map(([v, t, d]) => {
          const on = value === v;
          return (
            <button key={v} onClick={() => onChange(v)} style={{ ...S.segBtn, ...(on ? S.segOn : {}) }}>
              <span style={S.segT}>{t}</span>
              {d && <span style={{ ...S.segD, color: on ? "rgba(255,255,255,.85)" : "#7b8499" }}>{d}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Toggle({ label, hint, on, onChange }) {
  return (
    <button style={S.toggleRow} onClick={() => onChange(!on)}>
      <span>
        <span style={S.toggleLabel}>{label}</span>
        {hint && <span style={S.toggleHint}>{hint}</span>}
      </span>
      <span style={{ ...S.track, background: on ? C.teal : "#cfd5e2" }}>
        <span style={{ ...S.knob, transform: on ? "translateX(20px)" : "translateX(0)" }} />
      </span>
    </button>
  );
}

export function Chip({ label, on, onChange }) {
  return (
    <button onClick={() => onChange(!on)} style={{ ...S.chip, ...(on ? S.chipOn : {}) }}>
      {on ? "✓ " : ""}
      {label}
    </button>
  );
}

export const ChipWrap = ({ children }) => <div style={S.chipWrap}>{children}</div>;

const S = {
  card: { background: "#fff", borderRadius: 18, padding: 16, marginBottom: 14, boxShadow: "0 2px 14px rgba(13,27,62,0.06)", border: `1px solid ${C.line}` },
  cardHead: { display: "flex", alignItems: "center", gap: 9, marginBottom: 14 },
  cardStep: { fontFamily: FONT.display, fontSize: 12, fontWeight: 600, color: "#fff", background: C.teal, borderRadius: 7, padding: "3px 7px", letterSpacing: 0.5 },
  cardLabel: { fontFamily: FONT.display, fontSize: 16, fontWeight: 600, color: C.navy },

  row2: { display: "flex", gap: 10 },

  stepWrap: { flex: 1, marginBottom: 12 },
  stepLabel: { fontSize: 12.5, fontWeight: 600, color: "#46506b", marginBottom: 6 },
  stepHint: { color: C.teal, fontStyle: "normal", fontWeight: 600 },
  stepCtl: { display: "flex", alignItems: "center", justifyContent: "space-between", background: C.cream, border: `1px solid ${C.line}`, borderRadius: 12, padding: 4 },
  stepBtn: { width: 34, height: 34, borderRadius: 9, border: "none", background: "#fff", color: C.teal, fontSize: 20, fontWeight: 700, cursor: "pointer", boxShadow: "0 1px 3px rgba(13,27,62,0.12)", lineHeight: 1 },
  stepVal: { fontFamily: FONT.display, fontSize: 19, fontWeight: 600, color: C.navy, minWidth: 24, textAlign: "center" },

  segWrap: { marginBottom: 14 },
  segLabel: { fontSize: 12.5, fontWeight: 600, color: "#46506b", marginBottom: 7 },
  segRow: { display: "flex", gap: 7 },
  segBtn: { flex: 1, background: C.cream, border: `1px solid ${C.line}`, borderRadius: 12, padding: "9px 6px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 2, transition: "all .15s", textAlign: "center", color: C.navy },
  segOn: { background: C.teal, borderColor: C.teal, color: "#fff", boxShadow: "0 3px 10px rgba(26,158,143,0.35)" },
  segT: { fontSize: 12.5, fontWeight: 700, color: "inherit" },
  segD: { fontSize: 10 },

  toggleRow: { width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: C.cream, border: `1px solid ${C.line}`, borderRadius: 12, padding: "11px 13px", cursor: "pointer", marginTop: 2 },
  toggleLabel: { fontSize: 13.5, fontWeight: 600, color: C.navy, display: "block", textAlign: "left" },
  toggleHint: { fontSize: 11, color: "#8a92a6", display: "block", marginTop: 2, textAlign: "left" },
  track: { width: 44, height: 24, borderRadius: 12, padding: 2, transition: "background .2s", flexShrink: 0 },
  knob: { display: "block", width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "transform .2s", boxShadow: "0 1px 3px rgba(0,0,0,0.25)" },

  chipWrap: { display: "flex", flexWrap: "wrap", gap: 8 },
  chip: { background: C.cream, border: `1px solid ${C.line}`, borderRadius: 11, padding: "9px 12px", fontSize: 12.5, fontWeight: 600, color: "#46506b", cursor: "pointer", transition: "all .15s" },
  chipOn: { background: C.amber, borderColor: C.amber, color: C.navy, boxShadow: "0 3px 10px rgba(244,166,35,0.32)" },
};
