import React, { useState } from "react";
import { C, FONT } from "../theme";
import { APP_TIERS } from "../lib/apps";

const TIER_COLOR = { Essential: C.coral, Recommended: C.teal, Bonus: C.amber, "Once you land": C.navy };

export default function AppsSection() {
  const [open, setOpen] = useState(false);
  const total = APP_TIERS.reduce((n, t) => n + t.apps.length, 0);

  return (
    <section style={S.wrap}>
      <button style={S.top} onClick={() => setOpen((o) => !o)}>
        <div style={S.icon}><Phone /></div>
        <div style={{ flex: 1 }}>
          <div style={S.title}>Before you fly: download these</div>
          <div style={S.sub}>{total} apps, tiered — so everyone gets the insider's head start.</div>
        </div>
        <span style={S.chev}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={S.body}>
          {APP_TIERS.map((tier) => (
            <div key={tier.tier} style={S.tier}>
              <div style={S.tierHead}>
                <span style={{ ...S.tierBadge, background: TIER_COLOR[tier.tier] }}>{tier.tier}</span>
              </div>
              <div style={S.tierBlurb}>{tier.blurb}</div>
              {tier.apps.map((app) => (
                <div key={app.name} style={S.app}>
                  <div style={S.appMain}>
                    {app.url ? (
                      <a href={app.url} target="_blank" rel="noopener noreferrer" style={S.appName}>
                        {app.name} <span style={S.ext}>{app.store ? "· find in app store ↗" : "↗"}</span>
                      </a>
                    ) : (
                      <span style={S.appNamePlain}>{app.name}</span>
                    )}
                    <div style={S.appWhat}>{app.what}</div>
                    {!app.url && <div style={S.appHint}>Search your app store</div>}
                  </div>
                </div>
              ))}
            </div>
          ))}
          <p style={S.foot}>Links open the official site, which sends you to the right app store for your phone.</p>
        </div>
      )}
    </section>
  );
}

function Phone() {
  const p = { fill: "none", stroke: "#fff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  return <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="3" width="12" height="18" rx="2" {...p} /><path d="M11 18h2" {...p} /></svg>;
}

const S = {
  wrap: { background: "#fff", borderRadius: 18, border: `1px solid ${C.line}`, marginBottom: 18, overflow: "hidden", boxShadow: "0 2px 14px rgba(13,27,62,0.06)" },
  top: { width: "100%", background: "none", border: "none", display: "flex", alignItems: "center", gap: 12, padding: "15px 16px", cursor: "pointer", textAlign: "left" },
  icon: { width: 44, height: 44, borderRadius: 12, background: `linear-gradient(150deg, ${C.navy}, ${C.indigo})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  title: { fontFamily: FONT.display, fontSize: 16.5, fontWeight: 600, color: C.navy },
  sub: { fontSize: 12, color: "#8a92a6", marginTop: 2 },
  chev: { fontSize: 10, color: "#b3bac9" },

  body: { padding: "0 16px 16px", borderTop: `1px solid ${C.line}` },
  tier: { marginTop: 16 },
  tierHead: { marginBottom: 6 },
  tierBadge: { fontSize: 11, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase", color: "#fff", borderRadius: 7, padding: "3px 9px" },
  tierBlurb: { fontSize: 12, color: "#6b7591", lineHeight: 1.45, marginBottom: 10 },

  app: { display: "flex", padding: "9px 0", borderBottom: `1px solid ${C.line}` },
  appMain: { flex: 1 },
  appName: { fontSize: 13.5, fontWeight: 600, color: C.teal, textDecoration: "none" },
  appNamePlain: { fontSize: 13.5, fontWeight: 600, color: C.navy },
  ext: { fontSize: 11, color: C.teal },
  appWhat: { fontSize: 12, color: "#3a4360", lineHeight: 1.45, marginTop: 2 },
  appHint: { fontSize: 11, color: "#a06800", fontStyle: "italic", marginTop: 2 },

  foot: { fontSize: 11, color: "#8a92a6", lineHeight: 1.45, marginTop: 14, marginBottom: 0 },
};
