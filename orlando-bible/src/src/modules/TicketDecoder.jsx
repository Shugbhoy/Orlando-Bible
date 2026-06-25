import React, { useState, useMemo } from "react";
import { C, FONT } from "../theme";
import Header from "../components/Header";
import { Card, Row, Stepper, Seg, Toggle } from "../components/controls";
import { useTripProfile } from "../context/TripProfile";
import { computeTickets, recommendDays, gbp } from "../lib/tickets";

export default function TicketDecoder() {
  const { profile, update } = useTripProfile();
  const rec = recommendDays(profile);

  const [disneyDays, setDisneyDays] = useState(rec.disney);
  const [universalDays, setUniversalDays] = useState(rec.universal);
  const [kids10plus, setKids10plus] = useState(0);
  const [hopper, setHopper] = useState(false);
  const [p2p, setP2p] = useState(true);
  const [epic, setEpic] = useState(true);
  const [disneyWater, setDisneyWater] = useState(false);
  const [uniWater, setUniWater] = useState(false);

  const L = { disneyDays, universalDays, kids10plus, hopper, p2p, epic, disneyWater, uniWater };
  const r = useMemo(() => computeTickets(profile, L), [profile, disneyDays, universalDays, kids10plus, hopper, p2p, epic, disneyWater, uniWater]);

  const suggested = recommendDays(profile);
  const matchesSuggestion = disneyDays === suggested.disney && universalDays === suggested.universal;
  const applySuggested = () => { setDisneyDays(suggested.disney); setUniversalDays(suggested.universal); };

  const toneColor = { good: C.teal, warn: C.coral, note: C.amber };

  return (
    <>
      <Header
        title="Tickets, decoded."
        subtitle="The most confusing — and most overspent — decision of the lot. Here's what you actually need, and what to skip."
      />
      <main style={S.main}>
        <Card label="Who's going" step="01">
          <Row>
            <Stepper label="Adults" min={1} value={profile.adults} onChange={(v) => update("adults", v)} />
            <Stepper label="Teens 13–17" value={profile.teens} onChange={(v) => update("teens", v)} />
          </Row>
          <Row>
            <Stepper label="Children 4–12" value={profile.children} onChange={(v) => update("children", v)} />
            <Stepper label="Nights" min={3} max={28} value={profile.nights} onChange={(v) => update("nights", v)} />
          </Row>
          <Stepper
            label="Of those children, how many are 10+?"
            hint="they pay adult ticket prices"
            min={0}
            max={profile.children}
            value={Math.min(kids10plus, profile.children)}
            onChange={setKids10plus}
            wide
          />
        </Card>

        <Card label="Where you'll spend your days" step="02">
          <Seg label="Park focus" value={profile.focus} onChange={(v) => update("focus", v)}
            opts={[["both", "Both", "Disney + Universal"], ["disney", "Disney-led", ""], ["universal", "Universal-led", ""]]} />
          <Row>
            <Stepper label="Disney days" min={0} max={14} value={disneyDays} onChange={setDisneyDays} />
            <Stepper label="Universal days" min={0} max={14} value={universalDays} onChange={setUniversalDays} />
          </Row>
          {!matchesSuggestion && (
            <button style={S.suggest} onClick={applySuggested}>
              Suggested for your trip: {suggested.disney} Disney / {suggested.universal} Universal — use this
            </button>
          )}
        </Card>

        <Card label="Add-ons worth deciding on" step="03">
          {disneyDays > 0 && (
            <Toggle label="Hop between Disney parks in a day?" hint="Park Hopper" on={hopper} onChange={setHopper} />
          )}
          {universalDays > 0 && (
            <>
              <div style={{ height: 8 }} />
              <Toggle label="Ride the Hogwarts Express / both Universal parks?" hint="Park-to-Park" on={p2p} onChange={setP2p} />
              <div style={{ height: 8 }} />
              <Toggle label="Include Epic Universe (the new park)?" hint="adds a third Universal park" on={epic} onChange={setEpic} />
            </>
          )}
          {(disneyDays > 0 || universalDays > 0) && (
            <>
              <div style={{ height: 8 }} />
              {disneyDays > 0 && <Toggle label="Add Disney water parks?" on={disneyWater} onChange={setDisneyWater} />}
              {universalDays > 0 && (<><div style={{ height: 8 }} /><Toggle label="Add Volcano Bay water park?" on={uniWater} onChange={setUniWater} /></>)}
            </>
          )}
        </Card>

        {/* Total */}
        <section style={S.totalCard}>
          <div style={S.totalGlow} aria-hidden="true" />
          <div style={S.totalEyebrow}>Estimated ticket spend · party of {r.heads}</div>
          <div style={S.totalBig}>{gbp(r.total)}</div>
          <div style={S.totalPer}>
            {r.adultEq} at adult price · {r.childEq} at child price
          </div>
        </section>

        {/* Ticket plan cards */}
        <div style={S.planWrap}>
          {r.disney && <TicketCard resort="Disney" data={r.disney} accent={C.teal} childEq={r.childEq} />}
          {r.universal && <TicketCard resort="Universal" data={r.universal} accent={C.amber} childEq={r.childEq} />}
          {!r.disney && !r.universal && (
            <div style={S.empty}>Set at least one Disney or Universal day above to see your ticket plan.</div>
          )}
        </div>

        {/* Where to buy */}
        {r.total > 0 && (
          <section style={S.buyCard}>
            <div style={S.buyHead}>
              <SparkIcon />
              <span>Buy through a UK reseller, not at the gate</span>
            </div>
            <div style={S.buyBody}>
              <div style={S.buyRow}><span>At the gate (approx)</span><strong>{gbp(r.gateTotal)}</strong></div>
              <div style={S.buyRow}><span>UK reseller (approx)</span><strong>{gbp(r.total)}</strong></div>
              <div style={{ ...S.buyRow, borderBottom: "none" }}>
                <span style={{ color: C.teal, fontWeight: 700 }}>You'd save roughly</span>
                <strong style={{ color: C.teal }}>{gbp(r.saving)}</strong>
              </div>
              <p style={S.buyNote}>
                UK resellers are typically cheaper than gate prices for 14-day tickets and let you
                spread the cost. Never pay at the turnstile — it's the most expensive way to buy.
              </p>
            </div>
          </section>
        )}

        {/* Insights */}
        {r.insights.length > 0 && (
          <Card label="Worth knowing" step="04">
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
            <strong style={{ color: C.teal }}>Don't over-buy days.</strong> A 14-day ticket gives
            unlimited entry — you don't need a ticket "day" for every night. Build in rest and
            non-park days; nobody does parks for a fortnight straight and enjoys it.
          </p>
          <p style={S.honestP}>
            <strong style={{ color: C.teal }}>We don't sell tickets.</strong> These figures point you
            at the cheapest honest route, not whatever earns the biggest commission.
          </p>
        </div>

        <div style={{ height: 96 }} />
      </main>
    </>
  );
}

function TicketCard({ resort, data, accent, childEq }) {
  return (
    <div style={{ ...S.tcard, borderColor: accent }}>
      <div style={{ ...S.tcardTop, background: accent }}>{resort}</div>
      <div style={S.tcardBody}>
        <div style={S.tcardTitle}>{data.title}</div>
        <div style={S.tcardAddons}>
          {data.addons.map((a) => (<span key={a} style={S.tcardChip}>{a}</span>))}
        </div>
        <div style={S.tcardPrices}>
          <span>{gbp(data.ppAdult)} / adult</span>
          {childEq > 0 && <span>{gbp(data.ppChild)} / child</span>}
        </div>
        <div style={S.tcardCost}>{gbp(data.cost)}</div>
      </div>
    </div>
  );
}

function SparkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" fill={C.amber} />
    </svg>
  );
}

const S = {
  main: { padding: "18px 16px 0" },

  suggest: { width: "100%", marginTop: 4, background: "#FFF8EC", border: `1px solid ${C.amber}`, borderRadius: 11, padding: "9px 12px", fontSize: 12, fontWeight: 600, color: C.navy, cursor: "pointer", lineHeight: 1.4 },

  totalCard: { position: "relative", background: `linear-gradient(135deg, ${C.navy}, ${C.indigo})`, borderRadius: 20, padding: "22px 20px", color: "#fff", textAlign: "center", overflow: "hidden", marginBottom: 14, boxShadow: "0 8px 28px rgba(13,27,62,0.32)" },
  totalGlow: { position: "absolute", top: -40, right: -40, width: 160, height: 160, background: `radial-gradient(circle, ${C.amber}55, transparent 70%)`, borderRadius: "50%" },
  totalEyebrow: { position: "relative", fontSize: 11.5, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.72)", marginBottom: 8 },
  totalBig: { position: "relative", fontFamily: FONT.display, fontSize: 46, fontWeight: 600, lineHeight: 1, color: C.amber, textShadow: "0 2px 18px rgba(244,166,35,0.4)" },
  totalPer: { position: "relative", fontSize: 12.5, color: "rgba(255,255,255,0.82)", marginTop: 9 },

  planWrap: { display: "flex", gap: 10, marginBottom: 14 },
  empty: { flex: 1, background: "#fff", borderRadius: 16, padding: 18, border: `1px dashed ${C.line}`, fontSize: 13, color: "#8a92a6", textAlign: "center", lineHeight: 1.5 },
  tcard: { flex: 1, background: "#fff", borderRadius: 16, border: "1.5px solid", overflow: "hidden", boxShadow: "0 2px 14px rgba(13,27,62,0.06)" },
  tcardTop: { color: "#fff", fontFamily: FONT.display, fontSize: 14, fontWeight: 600, padding: "8px 14px" },
  tcardBody: { padding: 14 },
  tcardTitle: { fontFamily: FONT.display, fontSize: 14.5, fontWeight: 600, color: C.navy, marginBottom: 9 },
  tcardAddons: { display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 11 },
  tcardChip: { fontSize: 10.5, fontWeight: 600, color: "#46506b", background: C.cream, border: `1px solid ${C.line}`, borderRadius: 7, padding: "3px 7px" },
  tcardPrices: { display: "flex", flexDirection: "column", gap: 2, fontSize: 11.5, color: "#6b7591", marginBottom: 8 },
  tcardCost: { fontFamily: FONT.display, fontSize: 22, fontWeight: 600, color: C.teal },

  buyCard: { background: "#fff", border: `1.5px solid ${C.amber}`, borderRadius: 18, marginBottom: 14, overflow: "hidden", boxShadow: "0 2px 14px rgba(244,166,35,0.16)" },
  buyHead: { display: "flex", alignItems: "center", gap: 8, padding: "13px 16px", background: "linear-gradient(90deg, #FFF8EC, #FFF0EC)", fontFamily: FONT.display, fontWeight: 600, fontSize: 14.5, color: C.navy },
  buyBody: { padding: "12px 16px 16px" },
  buyRow: { display: "flex", justifyContent: "space-between", fontSize: 13.5, padding: "7px 0", borderBottom: `1px dashed ${C.line}`, color: "#3a4360" },
  buyNote: { fontSize: 12, color: "#6b7591", lineHeight: 1.5, marginTop: 11, marginBottom: 0 },

  insight: { display: "flex", alignItems: "stretch", gap: 11, padding: "9px 0", borderBottom: `1px solid ${C.line}` },
  insightBar: { width: 4, borderRadius: 3, flexShrink: 0 },
  insightText: { fontSize: 13, lineHeight: 1.45, color: "#3a4360", paddingTop: 1 },

  honest: { background: "#fff", borderRadius: 18, padding: 16, border: `1px solid ${C.line}`, boxShadow: "0 2px 14px rgba(13,27,62,0.06)" },
  honestP: { fontSize: 13, lineHeight: 1.55, color: "#3a4360", margin: "0 0 12px" },
};
