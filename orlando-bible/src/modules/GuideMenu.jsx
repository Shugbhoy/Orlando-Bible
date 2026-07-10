import React from "react";
import { useNavigate } from "react-router-dom";
import { C, FONT } from "../theme";
import Header from "../components/Header";

// The growing library of reference tools that don't fit in the primary
// five tabs. New additions go here first — flip ready:true once built,
// same pattern as Plan.jsx's module list.
const ITEMS = [
  { to: "/accessibility", title: "Accessibility (DAS/AAP)", desc: "Disney's DAS and Universal's AAP, decoded side by side.", ready: true, icon: "heart" },
  { to: "/height-checker", title: "Height Checker", desc: "Enter a height, see exactly which rides are in.", ready: true, icon: "ruler" },
  { to: "/packing-list", title: "Packing List", desc: "UK → Florida, tickable, nothing forgotten.", ready: true, icon: "bag" },
  { to: "/water-parks", title: "Water Parks", desc: "Volcano Bay, Typhoon Lagoon, Blizzard Beach & Aquatica compared.", ready: true, icon: "wave" },
  { to: "/character-dining", title: "Character Dining", desc: "Which meals are worth it, prices, and the 60-day booking window.", ready: false, icon: "fork" },
  { to: "/rainy-day", title: "Rainy Day Plan", desc: "What stays open, indoor rides ranked, the CityWalk fallback.", ready: false, icon: "cloud" },
  { to: "/baby-toddler", title: "Baby & Toddler", desc: "Rider Switch, Baby Care Centers, and what to pack.", ready: false, icon: "baby" },
  { to: "/money-cards", title: "Money & Cards", desc: "Revolut vs Chase vs Wise, tipping, and spotting a DCC scam.", ready: false, icon: "card" },
  { to: "/which-park", title: "Which Park Today?", desc: "A 3-question quiz to pick today's park.", ready: false, icon: "quiz" },
];

export default function GuideMenu() {
  const nav = useNavigate();
  return (
    <>
      <Header
        title="The rest of the Bible."
        subtitle="Everything that doesn't fit in a tab — reference tools and guides, all in one place."
      />
      <main style={S.main}>
        {ITEMS.map((m) => (
          <button key={m.to} style={S.card} onClick={() => m.ready && nav(m.to)} disabled={!m.ready}>
            <div style={{ ...S.cardIcon, opacity: m.ready ? 1 : 0.5 }}>
              <ItemIcon name={m.icon} />
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

function ItemIcon({ name }) {
  const p = { fill: "none", stroke: C.teal, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  const shapes = {
    heart: (<path d="M12 21s-7-4.5-9.5-9C.8 8.2 2 5 5 5c2 0 3.5 1.3 4 2.5C9.5 6.3 11 5 13 5c3 0 4.2 3.2 2.5 7-2.5 4.5-3.5 9-3.5 9z" {...p} />),
    ruler: (<><rect x="3" y="8" width="18" height="8" rx="1" {...p} /><path d="M7 8v3M11 8v3M15 8v3M19 8v3" {...p} /></>),
    bag: (<><path d="M6 8h12l-1 12H7L6 8z" {...p} /><path d="M9 8V6a3 3 0 016 0v2" {...p} /></>),
    wave: (<><path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" {...p} /><path d="M2 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" {...p} /></>),
    fork: (<path d="M6 3v7a2 2 0 002 2v9M8 3v6M16 3c-1.5 0-2 2-2 4s.5 4 2 4v6" {...p} />),
    cloud: (<><path d="M7 17a4 4 0 010-8 5 5 0 019.6-1.5A4 4 0 0118 17H7z" {...p} /><path d="M8 20l1-2M12 20l1-2M16 20l1-2" {...p} /></>),
    baby: (<><circle cx="12" cy="8" r="4" {...p} /><path d="M6 21c0-4 2.5-6 6-6s6 2 6 6" {...p} /></>),
    card: (<><rect x="3" y="6" width="18" height="12" rx="2" {...p} /><path d="M3 10h18" {...p} /></>),
    quiz: (<><circle cx="12" cy="12" r="9" {...p} /><path d="M9.5 9a2.5 2.5 0 015 .5c0 1.5-2 1.8-2 3.3" {...p} /><circle cx="12" cy="16.5" r="0.6" fill={C.teal} stroke="none" /></>),
  };
  return <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">{shapes[name]}</svg>;
}

const S = {
  main: { padding: "18px 16px 0" },
  card: { width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 14, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 18, padding: 16, marginBottom: 12, cursor: "pointer", boxShadow: "0 2px 14px rgba(13,27,62,0.06)" },
  cardIcon: { width: 46, height: 46, borderRadius: 12, background: C.cream, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  cardTitle: { fontFamily: FONT.display, fontSize: 16, fontWeight: 600, color: C.navy, display: "flex", alignItems: "center", gap: 8 },
  cardDesc: { fontSize: 12.5, color: "#6b7591", marginTop: 3, lineHeight: 1.45 },
  soon: { fontSize: 9.5, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: C.amber, background: "#FFF8EC", borderRadius: 6, padding: "2px 6px" },
  arrow: { fontSize: 26, color: C.teal, fontWeight: 300, lineHeight: 1 },
};
