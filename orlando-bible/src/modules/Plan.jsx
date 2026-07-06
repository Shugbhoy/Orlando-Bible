import React from "react";
import { useNavigate } from "react-router-dom";
import { C, FONT } from "../theme";
import Header from "../components/Header";
import TripSummary from "./TripSummary";

const MODULES = [
  { to: "/budget", title: "Budget Calculator", desc: "Your honest all-in cost in pounds, hidden extras and all.", ready: true, icon: "coins" },
  { to: "/stay", title: "Stay Decider", desc: "Villa or on-site? Settle it for your exact trip.", ready: true, icon: "bed" },
  { to: "/tickets", title: "Ticket Decoder", desc: "How many days, Park Hopper, where to buy — without the markup.", ready: true, icon: "ticket" },
  { to: "/deals", title: "Deals & Tips", desc: "Lived money-and-time savers. See what a family of 4 could save.", ready: true, icon: "tag" },
];

export default function Plan() {
  const nav = useNavigate();
  return (
    <>
      <Header
        title="Plan Orlando like you've been eight times."
        subtitle="Honest tools for UK families — built to save you money and time, not sell you a package."
      />
      <main style={S.main}>
        <TripSummary />
        <button style={S.hero} className="hero-glow" onClick={() => nav("/itinerary")}>
          <div style={S.heroGlow} aria-hidden="true" />
          <Sparkle x={26} y={22} size={9} delay={0} />
          <Sparkle x={"88%"} y={20} size={7} delay={0.9} />
          <Sparkle x={"78%"} y={64} size={11} delay={1.7} />
          <div style={S.heroText}>
            <div style={S.heroEyebrow}>The centrepiece</div>
            <div style={S.heroTitle}>Your day-by-day plan</div>
            <div style={S.heroDesc}>14 days sequenced — rides, characters, parades & dining, in the right order.</div>
          </div>
          <span style={S.heroArrow}>›</span>
        </button>
        <div style={S.intro}>
          Start anywhere. Your party and dates carry across every tool, so you only enter them once.
        </div>
        {MODULES.map((m) => (
          <button key={m.to} style={S.card} onClick={() => m.ready && nav(m.to)} disabled={!m.ready}>
            <div style={{ ...S.cardIcon, opacity: m.ready ? 1 : 0.5 }}>
              <ModIcon name={m.icon} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={S.cardTitle}>
                {m.title}
                {!m.ready && <span style={S.soon}>Soon</span>}
              </div>
              <div style={S.cardDesc}>{m.desc}</div>
            </div>
            {m.ready && <span style={S.arrow}>›</span>}
          </button>
        ))}
        <div style={{ height: 96 }} />
      </main>
    </>
  );
}

function Sparkle({ x, y, size, delay }) {
  // The same four-point twinkle used in the header skyline — reused here so
  // the hero card feels native to the app rather than a bolted-on flourish.
  return (
    <svg
      className="twinkle"
      style={{ position: "absolute", left: x, top: y, animationDelay: `${delay}s` }}
      width={size * 2} height={size * 2} viewBox="0 0 20 20" aria-hidden="true"
    >
      <path d="M10 1 L12 8 L19 10 L12 12 L10 19 L8 12 L1 10 L8 8 Z" fill="#FFF3CF" />
    </svg>
  );
}

function ModIcon({ name }) {
  const p = { fill: "none", stroke: C.teal, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  const shapes = {
    coins: (<><ellipse cx="9" cy="7" rx="6" ry="3" {...p} /><path d="M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3" {...p} /><ellipse cx="15" cy="14" rx="6" ry="3" {...p} /><path d="M9 17v1c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" {...p} /></>),
    bed: (<><path d="M3 18v-6h18v6M3 12V8a2 2 0 012-2h5a2 2 0 012 2v4M3 18h18" {...p} /></>),
    ticket: (<><path d="M3 8a2 2 0 012-2h14a2 2 0 012 2 2 2 0 000 4 2 2 0 000 4 2 2 0 01-2 2H5a2 2 0 01-2-2 2 2 0 000-4 2 2 0 000-4z" {...p} /><path d="M14 6v12" strokeDasharray="2 2" {...p} /></>),
    tag: (<><path d="M3 7a2 2 0 012-2h6l8 8a2 2 0 010 3l-5 5a2 2 0 01-3 0l-8-8z" {...p} /><circle cx="8.5" cy="9.5" r="1.4" fill={C.teal} stroke="none" /></>),
  };
  return <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">{shapes[name]}</svg>;
}

const S = {
  main: { padding: "18px 16px 0" },
  hero: { width: "100%", textAlign: "left", position: "relative", background: `linear-gradient(135deg, ${C.navy}, ${C.tealDark} 60%, ${C.teal})`, border: "none", borderRadius: 24, padding: "26px 24px 28px", marginBottom: 16, cursor: "pointer", overflow: "hidden", boxShadow: "0 10px 30px rgba(26,158,143,0.35)" },
  heroGlow: { position: "absolute", top: -60, right: -50, width: 200, height: 200, background: `radial-gradient(circle, ${C.amber}66, transparent 70%)`, borderRadius: "50%" },
  heroText: { position: "relative", maxWidth: 280 },
  heroEyebrow: { fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: C.amber },
  heroTitle: { fontFamily: FONT.display, fontSize: 24, fontWeight: 600, color: "#fff", marginTop: 5, textShadow: "0 2px 14px rgba(0,0,0,0.2)" },
  heroDesc: { fontSize: 13, color: "rgba(255,255,255,0.9)", marginTop: 6, lineHeight: 1.5 },
  heroArrow: { position: "absolute", bottom: 20, right: 22, fontSize: 30, color: "#fff", fontWeight: 300 },
  intro: { fontSize: 13.5, lineHeight: 1.55, color: "#46506b", margin: "0 4px 16px" },
  card: { width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 14, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 18, padding: 16, marginBottom: 12, cursor: "pointer", boxShadow: "0 2px 14px rgba(13,27,62,0.06)" },
  cardIcon: { width: 46, height: 46, borderRadius: 12, background: C.cream, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  cardTitle: { fontFamily: FONT.display, fontSize: 16, fontWeight: 600, color: C.navy, display: "flex", alignItems: "center", gap: 8 },
  cardDesc: { fontSize: 12.5, color: "#6b7591", marginTop: 3, lineHeight: 1.45 },
  soon: { fontSize: 9.5, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: C.amber, background: "#FFF8EC", borderRadius: 6, padding: "2px 6px" },
  arrow: { fontSize: 26, color: C.teal, fontWeight: 300, lineHeight: 1 },
};
