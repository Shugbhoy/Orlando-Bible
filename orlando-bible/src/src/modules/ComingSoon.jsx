import React from "react";
import { C, FONT } from "../theme";
import Header from "../components/Header";

export default function ComingSoon({ title, subtitle, blurb }) {
  return (
    <>
      <Header title={title} subtitle={subtitle} />
      <main style={S.main}>
        <div style={S.card}>
          <div style={S.badge}>Next up</div>
          <p style={S.blurb}>{blurb}</p>
        </div>
        <div style={{ height: 96 }} />
      </main>
    </>
  );
}

const S = {
  main: { padding: "18px 16px 0" },
  card: { background: "#fff", borderRadius: 18, padding: 20, border: `1px solid ${C.line}`, boxShadow: "0 2px 14px rgba(13,27,62,0.06)", textAlign: "center" },
  badge: { display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.amber, background: "#FFF8EC", borderRadius: 8, padding: "5px 10px", marginBottom: 12 },
  blurb: { fontSize: 14, lineHeight: 1.6, color: "#46506b", margin: 0, fontFamily: FONT.body },
};
