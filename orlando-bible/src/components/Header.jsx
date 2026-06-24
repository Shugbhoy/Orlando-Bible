import React from "react";
import { C, FONT } from "../theme";
import { Mark } from "./Brand";
import SkylineScene from "./SkylineScene";

export default function Header({ title, subtitle }) {
  return (
    <header style={S.header}>
      <SkylineScene style={S.scene} />
      <div style={S.brandRow}>
        <Mark />
        <div>
          <div style={S.wordmark}>
            The <span style={{ color: C.amber }}>Orlando</span> Bible
          </div>
          <div style={S.tagline}>Maximise the magic. Mind the money.</div>
        </div>
      </div>
      <h1 style={S.h1}>{title}</h1>
      {subtitle && <p style={S.sub}>{subtitle}</p>}
    </header>
  );
}

const S = {
  header: { position: "relative", padding: "0 20px 26px", color: "#fff", overflow: "hidden" },
  scene: { position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 },
  brandRow: { position: "relative", zIndex: 1, display: "flex", gap: 12, alignItems: "center", paddingTop: "calc(22px + env(safe-area-inset-top))" },
  wordmark: { fontFamily: FONT.display, fontWeight: 600, fontSize: 21, letterSpacing: 0.2, lineHeight: 1 },
  tagline: { fontSize: 12, color: "rgba(255,255,255,0.82)", marginTop: 3, letterSpacing: 0.3 },
  h1: { position: "relative", zIndex: 1, fontFamily: FONT.display, fontWeight: 600, fontSize: 27, lineHeight: 1.12, margin: "70px 0 8px", maxWidth: 320 },
  sub: { position: "relative", zIndex: 1, fontSize: 14, color: "rgba(255,255,255,0.88)", lineHeight: 1.45, maxWidth: 330, margin: 0 },
};
