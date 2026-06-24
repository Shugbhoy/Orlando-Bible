import React from "react";
import { NavLink } from "react-router-dom";
import { C } from "../theme";

function TabIcon({ name, on }) {
  const col = on ? C.amber : "#6b7591";
  const p = { fill: "none", stroke: col, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  const shapes = {
    compass: (<><circle cx="12" cy="12" r="9" {...p} /><polygon points="16,8 11,11 8,16 13,13" fill={col} stroke="none" /></>),
    coins: (<><ellipse cx="9" cy="7" rx="6" ry="3" {...p} /><path d="M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3" {...p} /><ellipse cx="15" cy="14" rx="6" ry="3" {...p} /><path d="M9 17v1c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" {...p} /></>),
    ticket: (<><path d="M3 8a2 2 0 012-2h14a2 2 0 012 2 2 2 0 000 4 2 2 0 000 4 2 2 0 01-2 2H5a2 2 0 01-2-2 2 2 0 000-4 2 2 0 000-4z" {...p} /><path d="M14 6v12" strokeDasharray="2 2" {...p} /></>),
    bed: (<><path d="M3 18v-6h18v6M3 12V8a2 2 0 012-2h5a2 2 0 012 2v4M3 18h18" {...p} /></>),
    dots: (<><circle cx="5" cy="12" r="1.6" fill={col} /><circle cx="12" cy="12" r="1.6" fill={col} /><circle cx="19" cy="12" r="1.6" fill={col} /></>),
  };
  return <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">{shapes[name]}</svg>;
}

const TABS = [
  { to: "/", label: "Plan", icon: "compass", end: true },
  { to: "/budget", label: "Budget", icon: "coins" },
  { to: "/tickets", label: "Tickets", icon: "ticket" },
  { to: "/stay", label: "Stay", icon: "bed" },
  { to: "/more", label: "More", icon: "dots" },
];

export default function TabBar() {
  return (
    <nav style={S.tabBar}>
      {TABS.map((t) => (
        <NavLink key={t.to} to={t.to} end={t.end} style={S.tab}>
          {({ isActive }) => (
            <>
              <TabIcon name={t.icon} on={isActive} />
              <span style={{ color: isActive ? C.amber : "#6b7591" }}>{t.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

const S = {
  tabBar: {
    position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
    width: "100%", maxWidth: 440, background: C.navy, display: "flex",
    justifyContent: "space-around", padding: "8px 4px calc(10px + env(safe-area-inset-bottom))",
    boxShadow: "0 -4px 20px rgba(13,27,62,0.28)", zIndex: 20,
  },
  tab: {
    background: "none", border: "none", display: "flex", flexDirection: "column",
    alignItems: "center", gap: 3, fontSize: 10.5, fontWeight: 600, cursor: "pointer",
    flex: 1, padding: "2px 0",
  },
};
