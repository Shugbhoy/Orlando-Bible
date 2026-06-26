import React, { useState, useMemo } from "react";
import { C, FONT } from "../theme";
import Header from "../components/Header";
import { Card, Row, Stepper, Seg, Toggle, Chip, ChipWrap } from "../components/controls";
import { useTripProfile } from "../context/TripProfile";
import { score, PRIORITIES } from "../lib/stay";

export default function StayDecider() {
  const { profile, update } = useTripProfile();
  // Module-local inputs
  const [firstTime, setFirstTime] = useState("yes");
  const [nonPark, setNonPark] = useState(3);
  const [underSix, setUnderSix] = useState(false);
  const [willDrive, setWillDrive] = useState("yes");
  const [priorities, setPriorities] = useState(["pool", "selfCater"]);

  const togglePri = (k) =>
    setPriorities((cur) => (cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k]));

  const p = { ...profile, firstTime, nonPark, underSix, willDrive, priorities };
  const r = useMemo(
    () => score(p),
    [profile, firstTime, nonPark, underSix, willDrive, priorities]
  );

  const verdictText =
    r.verdict === "tie" ? "It's a genuine toss-up"
      : r.verdict === "onsite" ? `${r.strength} on-site Disney`
      : `${r.strength} off-site villa`;

  return (
    <>
      <Header
        title="Villa or on-site? Let's settle it."
        subtitle="The honest call for your trip — no operator pushing you toward whatever they happen to sell."
      />
      <main style={S.main}>
        <Card label="Your party & trip" step="01">
          <Row>
            <Stepper label="Adults" min={1} value={profile.adults} onChange={(v) => update("adults", v)} />
            <Stepper label="Teens" value={profile.teens} onChange={(v) => update("teens", v)} />
          </Row>
          <Row>
            <Stepper label="Children" value={profile.children} onChange={(v) => update("children", v)} />
            <Stepper label="Nights" min={3} max={28} value={profile.nights} onChange={(v) => update("nights", v)} />
          </Row>
          <Toggle label="Travelling with under-6s?" hint="naps near the parks matter" on={underSix} onChange={setUnderSix} />
        </Card>

        <Card label="How you'll holiday" step="02">
          <Seg label="Park focus" value={profile.focus} onChange={(v) => update("focus", v)}
            opts={[["both", "Both", "Disney + Universal"], ["disney", "Disney-led", ""], ["universal", "Universal-led", ""]]} />
          <Seg label="First Orlando trip?" value={firstTime} onChange={setFirstTime}
            opts={[["yes", "First time", ""], ["no", "Been before", ""]]} />
          <Seg label="Happy to drive a hire car?" value={willDrive} onChange={setWillDrive}
            opts={[["yes", "Yes", "Will hire"], ["no", "Rather not", "No car"]]} />
          <Stepper label="Chill / non-park days" min={0} max={profile.nights} value={nonPark} onChange={setNonPark} wide />
        </Card>

        <Card label="What matters most" step="03">
          <ChipWrap>
            {PRIORITIES.map(([k, t]) => (
              <Chip key={k} label={t} on={priorities.includes(k)} onChange={() => togglePri(k)} />
            ))}
          </ChipWrap>
        </Card>

        <section style={S.verdictCard}>
          <div style={S.vGlow} aria-hidden="true" />
          <div style={S.vEyebrow}>For your trip, the call is</div>
          <div style={{ ...S.vBig, color: r.verdict === "tie" ? C.star : C.amber }}>{verdictText}</div>
          <div style={S.meterWrap}>
            <div style={S.meterTrack}>
              <span style={S.meterEndL}>On-site</span>
              <span style={S.meterEndR}>Off-site</span>
              <div style={S.meterMid} aria-hidden="true" />
              <div style={{ ...S.meterMark, left: `${50 + r.pos * 48}%` }} aria-hidden="true" />
            </div>
          </div>
        </section>

        <Card label="What's pushing you this way" step="04">
          {r.top.map((re, i) => (
            <div key={i} style={S.reason}>
              <span style={{ ...S.reasonDot, background: re.dir === "onsite" ? C.teal : C.amber }}>
                {re.dir === "onsite" ? "◀" : "▶"}
              </span>
              <span style={S.reasonText}>{re.text}</span>
            </div>
          ))}
          {r.verdict === "tie" && (
            <p style={S.tieNote}>
              Your factors cancel out almost exactly. Either works — so let the tie-breaker be feel: a
              villa pool and space, or rolling out of bed into the parks.
            </p>
          )}
        </Card>

        <div style={S.h2hWrap}>
          <Pane on={r.verdict === "onsite"} title="On-site Disney"
            pts={["Early entry & extended evening hours", "Walk or transport to parks — go car-light", "Pop back for naps & breaks", "Most immersive, least logistics"]} />
          <Pane on={r.verdict === "offsite"} title="Off-site villa"
            pts={["Private pool & far more space", "Kitchen — big food savings over a fortnight", "Cheaper per head for bigger groups", "Better base for a mixed Disney + Universal trip"]} />
        </div>

        <div style={S.honest}>
          <p style={S.honestP}>
            <strong style={{ color: C.teal }}>The fortnight maths.</strong> A villa kitchen quietly
            saves hundreds on food across two weeks — the single biggest reason off-site wins for
            longer family trips, and it never shows in a headline comparison.
          </p>
          <p style={S.honestP}>
            <strong style={{ color: C.teal }}>One thing that changed.</strong> Disney scrapped its free
            Magical Express airport bus in 2022, so on-site no longer means free transfers — factor
            that in if you were counting on it.
          </p>
        </div>

        <div style={{ height: 96 }} />
      </main>
    </>
  );
}

function Pane({ on, title, pts }) {
  return (
    <div style={{ ...S.pane, ...(on ? S.paneOn : {}) }}>
      <div style={{ ...S.paneTitle, color: on ? "#fff" : C.navy }}>
        {on && <span style={S.panePick}>Your pick</span>}
        {title}
      </div>
      {pts.map((t, i) => (
        <div key={i} style={{ ...S.panePt, color: on ? "rgba(255,255,255,.92)" : "#46506b" }}>
          <span style={{ color: on ? C.amber : C.teal, marginRight: 6 }}>•</span>
          {t}
        </div>
      ))}
    </div>
  );
}

const S = {
  main: { padding: "18px 16px 0" },

  verdictCard: { position: "relative", background: `linear-gradient(135deg, ${C.navy}, ${C.indigo})`, borderRadius: 20, padding: "22px 20px 26px", color: "#fff", textAlign: "center", overflow: "hidden", marginBottom: 14, boxShadow: "0 8px 28px rgba(13,27,62,0.32)" },
  vGlow: { position: "absolute", top: -40, right: -40, width: 160, height: 160, background: `radial-gradient(circle, ${C.amber}55, transparent 70%)`, borderRadius: "50%" },
  vEyebrow: { position: "relative", fontSize: 11.5, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.72)", marginBottom: 8 },
  vBig: { position: "relative", fontFamily: FONT.display, fontSize: 30, fontWeight: 600, lineHeight: 1.1, textShadow: "0 2px 18px rgba(244,166,35,0.35)" },
  meterWrap: { position: "relative", marginTop: 22, padding: "0 4px" },
  meterTrack: { position: "relative", height: 8, borderRadius: 6, background: "linear-gradient(90deg, #1A9E8F, #2a3a73 50%, #F4A623)" },
  meterMid: { position: "absolute", left: "50%", top: -4, width: 2, height: 16, background: "rgba(255,255,255,0.35)" },
  meterMark: { position: "absolute", top: "50%", width: 20, height: 20, borderRadius: "50%", background: "#fff", border: `3px solid ${C.amber}`, transform: "translate(-50%,-50%)", transition: "left .45s cubic-bezier(.2,.8,.2,1)", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" },
  meterEndL: { position: "absolute", left: 0, top: 14, fontSize: 10.5, color: "rgba(255,255,255,0.7)" },
  meterEndR: { position: "absolute", right: 0, top: 14, fontSize: 10.5, color: "rgba(255,255,255,0.7)" },

  reason: { display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 0", borderBottom: `1px solid ${C.line}` },
  reasonDot: { color: "#fff", fontSize: 10, width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 },
  reasonText: { fontSize: 13, lineHeight: 1.45, color: "#3a4360" },
  tieNote: { fontSize: 12.5, color: "#6b7591", lineHeight: 1.5, marginTop: 12, marginBottom: 0 },

  h2hWrap: { display: "flex", gap: 10, marginBottom: 14 },
  pane: { flex: 1, background: "#fff", borderRadius: 16, padding: 14, border: `1.5px solid ${C.line}`, transition: "all .2s" },
  paneOn: { background: `linear-gradient(150deg, ${C.teal}, ${C.tealDark})`, borderColor: C.teal, boxShadow: "0 6px 18px rgba(26,158,143,0.3)" },
  paneTitle: { fontFamily: FONT.display, fontSize: 14.5, fontWeight: 600, marginBottom: 10 },
  panePick: { display: "block", fontSize: 9.5, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.amber, marginBottom: 3 },
  panePt: { fontSize: 11.5, lineHeight: 1.4, marginBottom: 7, display: "flex" },

  honest: { background: "#fff", borderRadius: 18, padding: 16, border: `1px solid ${C.line}`, boxShadow: "0 2px 14px rgba(13,27,62,0.06)" },
  honestP: { fontSize: 13, lineHeight: 1.55, color: "#3a4360", margin: "0 0 12px" },
};
