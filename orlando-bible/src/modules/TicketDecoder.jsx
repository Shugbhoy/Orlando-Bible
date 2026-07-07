import React, { useState, useMemo } from "react";
import { C, FONT } from "../theme";
import Header from "../components/Header";
import { Card, Row, Stepper, Seg, Toggle } from "../components/controls";
import { useTripProfile } from "../context/TripProfile";
import { computeTickets, recommendDays, gbp } from "../lib/tickets";

export default function TicketDecoder() {
  const { profile, update, plan } = useTripProfile();
  const suggested = useMemo(() => recommendDays(profile), [profile.nights, profile.focus]);

  const [disneyDays, setDisneyDays] = useState(suggested.disney || 4);
  const [universalDays, setUniversalDays] = useState(suggested.universal || 3);
  const [kids10plus, setKids10plus] = useState(0);
  const [disneyDiscount, setDisneyDiscount] = useState(true);
  const [expressHack, setExpressHack] = useState(true);

  const showDisney = profile.focus !== "universal";
  const showUniversal = profile.focus !== "disney";

  const L = {
    disneyDays: showDisney ? disneyDays : 0,
    universalDays: showUniversal ? universalDays : 0,
    kids10plus, disneyDiscount: showDisney ? disneyDiscount : false,
    expressHack: showUniversal ? expressHack : false,
    onsite: plan?.accom === "onsite",
  };
  const r = useMemo(() => computeTickets(profile, L), [profile, disneyDays, universalDays, kids10plus, disneyDiscount, expressHack, plan?.accom, showDisney, showUniversal]);

  const matchesSuggestion = disneyDays === suggested.disney && universalDays === suggested.universal;
  const applySuggested = () => { setDisneyDays(suggested.disney || 4); setUniversalDays(suggested.universal || 3); };

  const toneColor = { good: C.teal, warn: C.coral, note: C.amber };

  return (
    <>
      <Header
        title="The smart ticket play."
        subtitle="Most families over-buy. Here's the combo that beats two 14-day tickets on price — and still skips the queues."
      />
      <main style={S.main}>
        <Card label="Who's going" step="01">
          <Row>
            <Stepper label="Adults" min={1} value={profile.adults} onChange={(v) => update("adults", v)} />
            <Stepper label="Teens 13–17" value={profile.teens} onChange={(v) => update("teens", v)} />
          </Row>
          <Row>
            <Stepper label="Children 4–12" value={profile.children} onChange={(v) => update("children", v)} />
            <Stepper label="Of those, aged 10+" hint="pay adult prices" min={0} max={profile.children} value={Math.min(kids10plus, profile.children)} onChange={setKids10plus} />
          </Row>
        </Card>

        <Card label="Days in the parks" step="02">
          {showDisney && (
            <Seg label="Disney days" value={String(disneyDays)} onChange={(v) => setDisneyDays(Number(v))}
              opts={[["3", "3", ""], ["4", "4", "sweet spot"], ["5", "5", ""], ["7", "7", ""], ["14", "14", "unlimited"]]} />
          )}
          {showUniversal && (
            <Seg label="Universal 3-park days" value={String(universalDays)} onChange={(v) => setUniversalDays(Number(v))}
              opts={[["2", "2", ""], ["3", "3", "recommended"], ["14", "14", "unlimited"]]} />
          )}
          {!matchesSuggestion && (
            <button style={S.suggest} onClick={applySuggested}>
              Suggested for your trip: {showDisney && `${suggested.disney} Disney`}{showDisney && showUniversal && " / "}{showUniversal && `${suggested.universal} Universal`} — use this
            </button>
          )}
          <div style={{ height: 4 }} />
          {showDisney && <Toggle label="Apply Disney's live 20% discount?" hint="on right now, direct & UK sellers" on={disneyDiscount} onChange={setDisneyDiscount} />}
          {showDisney && <div style={{ height: 8 }} />}
          {showUniversal && <Toggle label="Use the one-night Royal Pacific Express hack?" hint="free skip-the-line, both days" on={expressHack} onChange={setExpressHack} />}
        </Card>

        {/* Smart Combo vs 14-day */}
        <section style={S.compareCard}>
          <div style={S.glow} aria-hidden="true" />
          <div style={S.eyebrow}>The Smart Combo · party of {r.heads}</div>
          <div style={S.smartBig}>{gbp(r.smartTotal)}</div>
          <div style={S.vsRow}>
            <span style={S.vsLabel}>
              {profile.focus === "both" ? "Two 14-day tickets would be" : profile.focus === "disney" ? "A Disney 14-day ticket would be" : "A Universal 14-day ticket would be"}
            </span>
            <span style={S.vsValue}>{gbp(r.alt14)}</span>
          </div>
          {r.saving > 0 && <div style={S.savedChip}>You save {gbp(r.saving)}</div>}
        </section>

        {/* Breakdown */}
        <Card label="What you're buying" step="03">
          {r.smartLines.map((l) => (
            <div key={l.k} style={S.bdLine}>
              <div>
                <div style={S.bdKey}>{l.k}</div>
                <div style={S.bdNote}>{l.note}</div>
              </div>
              <div style={S.bdVal}>{gbp(l.v)}</div>
            </div>
          ))}
        </Card>

        {/* Where to buy the tickets */}
        <section style={S.buyCard}>
          <div style={S.buyHead}>Where to buy your park tickets</div>
          <div style={S.buyBody}>
            <div style={S.buyPrimary}>{r.ticketSources.primary}</div>
            <p style={S.buyNote}>{r.ticketSources.note}</p>
            <div style={S.buyFallback}>{r.ticketSources.fallback}</div>
            <p style={S.buyNote}>{r.ticketSources.fallbackNote}</p>
            <p style={S.buyRule}>Always cross-check two or three, and never buy at the gate — it's the most expensive way in.</p>
          </div>
        </section>

        {/* Express value callout */}
        {expressHack && (
          <section style={S.expressCard}>
            <div style={S.expressHead}><Bolt />Why the hotel night is the masterstroke</div>
            <div style={S.expressBody}>
              <div style={S.expressBig}>{gbp(r.hotel)} → {gbp(r.expressValue)}</div>
              <p style={S.expressNote}>
                One night at Loews Royal Pacific gives every guest in the room free Universal Express
                Unlimited across check-in and check-out days. That {gbp(r.hotel)} unlocks about {gbp(r.expressValue)} of
                skip-the-line — often less than buying Express outright, and it saves hours.
              </p>
            </div>
          </section>
        )}

        {/* Booking sources */}
        {expressHack && (
          <Card label="Where to book that one night" step="04">
            <div style={S.sourceWrap}>
              {r.sources.map((s) => <span key={s} style={S.source}>{s}</span>)}
            </div>
            <p style={S.sourceNote}>
              Price-compare all four, but confirm free Express is included before you pay — the perk is
              tied to the qualifying on-site room, not every third-party rate.
            </p>
          </Card>
        )}

        {/* Insights */}
        {r.insights.length > 0 && (
          <Card label="Worth knowing" step="05">
            {r.insights.map((ins, i) => (
              <div key={i} style={S.insight}>
                <span style={{ ...S.insightBar, background: toneColor[ins.tone] }} />
                <span style={S.insightText}>{ins.text}</span>
              </div>
            ))}
          </Card>
        )}

        <div style={S.honest}>
          <p style={S.honestP}>
            <strong style={{ color: C.teal }}>Buy the days you'll use, not 14.</strong> On a fortnight
            you'll do maybe 4 Disney days and 2–3 at Universal — the rest is pool, rest and Kennedy. The
            Smart Combo prices exactly that, and the hotel night skips the queues the 14-day buyers pay extra for.
          </p>
          <p style={S.honestP}>
            <strong style={{ color: C.teal }}>We don't sell tickets.</strong> These figures point you at the
            cheapest honest route, not the biggest commission.
          </p>
        </div>

        <div style={{ height: 96 }} />
      </main>
    </>
  );
}

function Bolt() {
  return <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={{ marginRight: 7 }}><path d="M13 2L4 14h6l-1 8 9-12h-6z" fill={C.amber} /></svg>;
}

const S = {
  main: { padding: "18px 16px 0" },

  compareCard: { position: "relative", background: `linear-gradient(135deg, ${C.navy}, ${C.indigo})`, borderRadius: 20, padding: "22px 20px", color: "#fff", textAlign: "center", overflow: "hidden", marginBottom: 14, boxShadow: "0 8px 28px rgba(13,27,62,0.32)" },
  glow: { position: "absolute", top: -40, right: -40, width: 160, height: 160, background: `radial-gradient(circle, ${C.amber}55, transparent 70%)`, borderRadius: "50%" },
  eyebrow: { position: "relative", fontSize: 11.5, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.72)", marginBottom: 8 },
  smartBig: { position: "relative", fontFamily: FONT.display, fontSize: 46, fontWeight: 600, lineHeight: 1, color: C.amber, textShadow: "0 2px 18px rgba(244,166,35,0.4)" },
  vsRow: { position: "relative", display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.15)" },
  vsLabel: { fontSize: 12.5, color: "rgba(255,255,255,0.7)" },
  vsValue: { fontFamily: FONT.display, fontSize: 17, fontWeight: 500, color: "rgba(255,255,255,0.55)", textDecoration: "line-through", textDecorationColor: "rgba(255,107,107,0.7)" },
  savedChip: { position: "relative", display: "inline-block", marginTop: 14, fontSize: 13, fontWeight: 700, color: C.navy, background: C.amber, borderRadius: 8, padding: "6px 13px" },

  bdLine: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: `1px solid ${C.line}` },
  bdKey: { fontSize: 14, fontWeight: 600, color: C.navy },
  bdNote: { fontSize: 11.5, color: "#8a92a6", marginTop: 2 },
  bdVal: { fontFamily: FONT.display, fontSize: 16, fontWeight: 600, color: C.teal },

  buyCard: { background: "#fff", border: `1.5px solid ${C.teal}`, borderRadius: 18, marginBottom: 14, overflow: "hidden", boxShadow: "0 2px 14px rgba(26,158,143,0.14)" },
  buyHead: { padding: "13px 16px", background: "linear-gradient(90deg, #E2F5F2, #EAF7F5)", fontFamily: FONT.display, fontWeight: 600, fontSize: 14.5, color: C.navy },
  buyBody: { padding: "14px 16px 16px" },
  buyPrimary: { fontFamily: FONT.display, fontSize: 17, fontWeight: 600, color: C.teal },
  buyFallback: { fontFamily: FONT.display, fontSize: 14, fontWeight: 600, color: C.navy, marginTop: 12 },
  buyNote: { fontSize: 12.5, color: "#3a4360", lineHeight: 1.55, margin: "5px 0 0" },
  buyRule: { fontSize: 12, color: "#6b7591", lineHeight: 1.5, margin: "12px 0 0", fontStyle: "italic" },

  expressCard: { background: "#fff", border: `1.5px solid ${C.amber}`, borderRadius: 18, marginBottom: 14, overflow: "hidden", boxShadow: "0 2px 14px rgba(244,166,35,0.16)" },
  expressHead: { display: "flex", alignItems: "center", padding: "13px 16px", background: "linear-gradient(90deg, #FFF8EC, #FFF0EC)", fontFamily: FONT.display, fontWeight: 600, fontSize: 14.5, color: C.navy },
  expressBody: { padding: "14px 16px 16px" },
  expressBig: { fontFamily: FONT.display, fontSize: 26, fontWeight: 600, color: C.teal, marginBottom: 8 },
  expressNote: { fontSize: 12.5, color: "#3a4360", lineHeight: 1.55, margin: 0 },

  sourceWrap: { display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 10 },
  source: { fontSize: 12, fontWeight: 600, color: C.navy, background: C.cream, border: `1px solid ${C.line}`, borderRadius: 8, padding: "6px 11px" },
  sourceNote: { fontSize: 12, color: "#6b7591", lineHeight: 1.5, margin: 0 },

  insight: { display: "flex", alignItems: "stretch", gap: 11, padding: "9px 0", borderBottom: `1px solid ${C.line}` },
  insightBar: { width: 4, borderRadius: 3, flexShrink: 0 },
  insightText: { fontSize: 13, lineHeight: 1.45, color: "#3a4360", paddingTop: 1 },

  honest: { background: "#fff", borderRadius: 18, padding: 16, border: `1px solid ${C.line}`, boxShadow: "0 2px 14px rgba(13,27,62,0.06)" },
  honestP: { fontSize: 13, lineHeight: 1.55, color: "#3a4360", margin: "0 0 12px" },
};
