import React, { useState, useMemo } from "react";
import { C, FONT } from "../theme";
import Header from "../components/Header";
import { useTripProfile } from "../context/TripProfile";
import { buildItinerary } from "../lib/itinerary";
import { gbp } from "../lib/budget";

const TYPE = {
  arrival: { label: "Arrive", ramp: "#8a92a6" },
  departure: { label: "Home", ramp: "#8a92a6" },
  rest: { label: "Rest", ramp: C.teal },
  excursion: { label: "Day out", ramp: "#639922" },
  park: { label: "Park", ramp: C.navy },
};

export default function Itinerary() {
  const { profile, plan } = useTripProfile();
  const { days, bookings, foodTotal } = useMemo(() => buildItinerary(profile, plan), [profile, plan]);

  const parkDays = days.filter((d) => d.type === "park").length;
  const restDays = days.filter((d) => d.type === "rest").length;

  return (
    <>
      <Header
        title="Master Orlando, day by day."
        subtitle="Your whole fortnight sequenced to save time and money — rides, characters, parades and dining, in the right order."
      />
      <main style={S.main}>
        <section style={S.summary}>
          <div style={S.summaryGlow} aria-hidden="true" />
          <div style={S.summaryRow}>
            <Stat n={profile.nights} label="nights" />
            <Stat n={parkDays} label="park days" />
            <Stat n={restDays} label="rest days" />
          </div>
          <div style={S.foodTotalRow}>
            <span style={S.foodTotalLabel}>Estimated food, all {days.length} days</span>
            <span style={S.foodTotalVal}>{gbp(foodTotal)}</span>
          </div>
          <div style={S.summaryNote}>Built from your trip profile. Change party, nights or focus and the plan rebuilds.</div>
        </section>

        {/* Before you go */}
        <div style={S.essentials}>
          <div style={S.essTitle}>Before you fly — non-negotiables</div>
          <Ess text="Download both apps: My Disney Experience and the Universal Orlando app. They run wait times, mobile order, dining and Express." />
          <Ess text="Book Disney table-service 60 days out, 6am UK-evening, via the app. Cinderella's Royal Table goes fastest and needs paying in full." />
          <Ess text="MagicBands are optional — park entry works free on your phone (MagicMobile). Buy them for the kids as a treat, or skip them." />
        </div>

        {/* Booking checklist */}
        {bookings.length > 0 && (
          <section style={S.bookCard}>
            <div style={S.bookHead}>Your 60-day booking checklist</div>
            <div style={S.bookBody}>
              {bookings.map((b, i) => (
                <div key={i} style={S.bookRow}>
                  <span style={S.bookDay}>Day {b.day}</span>
                  <span style={S.bookText}>{b.text}</span>
                </div>
              ))}
              <p style={S.bookNote}>Reserve these the moment your 60-day window opens — the character meals vanish in minutes.</p>
            </div>
          </section>
        )}

        {/* Day by day */}
        {days.map((d) => <DayCard key={d.day} d={d} />)}

        <div style={S.honest}>
          <p style={S.honestP}>
            <strong style={{ color: C.teal }}>This is your skeleton, not a stopwatch.</strong> The rhythm,
            the park order and the dining are sequenced for you — but there's a best park for almost
            every date, so pin the exact park-to-day against a live crowd calendar nearer the time.
          </p>
        </div>

        <div style={{ height: 96 }} />
      </main>
    </>
  );
}

function Stat({ n, label }) {
  return (
    <div style={S.stat}>
      <div style={S.statN}>{n}</div>
      <div style={S.statL}>{label}</div>
    </div>
  );
}

function Ess({ text }) {
  return (
    <div style={S.ess}>
      <span style={S.essDot} />
      <span style={S.essText}>{text}</span>
    </div>
  );
}

function DayCard({ d }) {
  const [open, setOpen] = useState(false);
  const t = TYPE[d.type];
  const isPark = d.type === "park";

  return (
    <div style={{ ...S.day, ...(open ? S.dayOpen : {}) }}>
      <button style={S.dayTop} onClick={() => setOpen((o) => !o)}>
        <span style={{ ...S.dayNum, background: t.ramp }}>{d.day}</span>
        <div style={S.dayMid}>
          <div style={S.dayTitle}>{d.title}</div>
          <div style={S.dayType}>
            <span style={{ ...S.typePill, color: t.ramp }}>{t.label}</span>
            {d.dinnerKind && <span style={{ ...S.dinnerTag, ...(d.dinnerKind === "themed" ? S.dinnerThemed : {}) }}>{d.dinnerKind === "themed" ? "themed night" : "value night"}</span>}
            {d.dayCost > 0 && <span style={S.dayCostTag}>{gbp(d.dayCost)}</span>}
          </div>
        </div>
        <span style={S.dayChev}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={S.dayBody}>
          {isPark && !d.light && (
            <>
              <Section title="Rope drop">{d.ropeDrop}</Section>
              <Section title="Must-do rides">
                <div style={S.rideWrap}>
                  {d.rides.map((r) => <span key={r} style={S.ride}>{r}</span>)}
                </div>
              </Section>
              {d.characters && <Section title="Characters">{d.characters}</Section>}
              {d.show && <Section title="Parade & show">{d.show}</Section>}
            </>
          )}
          {isPark && d.light && <Section title="The day">A proper day off the parks — slides, the lazy river and the wave pool. Loungers go early.</Section>}

          <Section title="Eating">
            <div style={S.meal}><span style={S.mealK}>Breakfast</span><span style={S.mealV}>{d.meals.breakfast}{d.mealCosts && d.mealCosts.breakfast > 0 && <span style={S.mealCost}> · {gbp(d.mealCosts.breakfast)}</span>}</span></div>
            <div style={S.meal}><span style={S.mealK}>Lunch</span><span style={S.mealV}>{d.meals.lunch}{d.mealCosts && d.mealCosts.lunch > 0 && <span style={S.mealCost}> · {gbp(d.mealCosts.lunch)}</span>}</span></div>
            <div style={S.meal}><span style={S.mealK}>Dinner</span><span style={S.mealV}>{d.meals.dinner}{d.booking && <span style={S.bookFlag}> · book 60 days out</span>}{d.mealCosts && d.mealCosts.dinner > 0 && <span style={S.mealCost}> · {gbp(d.mealCosts.dinner)}</span>}</span></div>
            {d.dayCost > 0 && <div style={S.dayTotalRow}>Whole day, whole party: <strong>{gbp(d.dayCost)}</strong></div>}
          </Section>

          <Section title="Tips">
            {d.tips.map((tip, i) => (
              <div key={i} style={S.tip}><span style={S.tipDot} />{tip}</div>
            ))}
          </Section>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={S.section}>
      <div style={S.sectionT}>{title}</div>
      <div style={S.sectionC}>{children}</div>
    </div>
  );
}

const S = {
  main: { padding: "18px 16px 0" },

  summary: { position: "relative", background: `linear-gradient(135deg, ${C.navy}, ${C.indigo})`, borderRadius: 20, padding: "20px", color: "#fff", overflow: "hidden", marginBottom: 16, boxShadow: "0 8px 28px rgba(13,27,62,0.32)" },
  summaryGlow: { position: "absolute", top: -50, right: -40, width: 170, height: 170, background: `radial-gradient(circle, ${C.amber}55, transparent 70%)`, borderRadius: "50%" },
  summaryRow: { position: "relative", display: "flex", justifyContent: "space-around" },
  stat: { textAlign: "center" },
  statN: { fontFamily: FONT.display, fontSize: 30, fontWeight: 600, color: C.amber, lineHeight: 1 },
  statL: { fontSize: 11, color: "rgba(255,255,255,0.72)", marginTop: 4, textTransform: "uppercase", letterSpacing: 0.5 },
  foodTotalRow: { position: "relative", display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.15)" },
  foodTotalLabel: { fontSize: 12, color: "rgba(255,255,255,0.75)" },
  foodTotalVal: { fontFamily: FONT.display, fontSize: 20, fontWeight: 600, color: C.amber },
  summaryNote: { position: "relative", fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 14, textAlign: "center", lineHeight: 1.45 },

  essentials: { background: "#fff", borderRadius: 18, padding: 16, border: `1px solid ${C.line}`, boxShadow: "0 2px 14px rgba(13,27,62,0.06)", marginBottom: 14 },
  essTitle: { fontFamily: FONT.display, fontSize: 15, fontWeight: 600, color: C.navy, marginBottom: 11 },
  ess: { display: "flex", gap: 10, marginBottom: 10 },
  essDot: { width: 7, height: 7, borderRadius: "50%", background: C.amber, marginTop: 6, flexShrink: 0 },
  essText: { fontSize: 12.5, lineHeight: 1.5, color: "#3a4360" },

  bookCard: { background: "#fff", border: `1.5px solid ${C.amber}`, borderRadius: 18, overflow: "hidden", marginBottom: 14, boxShadow: "0 2px 14px rgba(244,166,35,0.16)" },
  bookHead: { padding: "13px 16px", background: "linear-gradient(90deg, #FFF8EC, #FFF0EC)", fontFamily: FONT.display, fontWeight: 600, fontSize: 14.5, color: C.navy },
  bookBody: { padding: "12px 16px 16px" },
  bookRow: { display: "flex", gap: 10, alignItems: "baseline", padding: "6px 0", borderBottom: `1px dashed ${C.line}` },
  bookDay: { fontSize: 11, fontWeight: 700, color: C.navy, background: "#FFF3D6", borderRadius: 6, padding: "2px 7px", flexShrink: 0 },
  bookText: { fontSize: 13, color: "#3a4360" },
  bookNote: { fontSize: 12, color: "#6b7591", lineHeight: 1.5, marginTop: 11, marginBottom: 0 },

  day: { background: "#fff", borderRadius: 14, border: `1px solid ${C.line}`, marginBottom: 9, overflow: "hidden", boxShadow: "0 1px 8px rgba(13,27,62,0.05)" },
  dayOpen: { boxShadow: "0 3px 16px rgba(13,27,62,0.1)" },
  dayTop: { width: "100%", background: "none", border: "none", display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", cursor: "pointer", textAlign: "left" },
  dayNum: { width: 34, height: 34, borderRadius: 10, color: "#fff", fontFamily: FONT.display, fontWeight: 600, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  dayMid: { flex: 1 },
  dayTitle: { fontSize: 14.5, fontWeight: 600, color: C.navy },
  dayType: { display: "flex", alignItems: "center", gap: 7, marginTop: 3 },
  typePill: { fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 },
  dinnerTag: { fontSize: 10.5, fontWeight: 600, color: C.teal, background: "#E2F5F2", borderRadius: 5, padding: "1px 6px" },
  dinnerThemed: { color: "#a06800", background: "#FFF3D6" },
  dayCostTag: { fontSize: 11, fontWeight: 700, color: C.navy, background: "#FFF3D6", borderRadius: 5, padding: "1px 7px" },
  dayChev: { fontSize: 9, color: "#b3bac9" },

  dayBody: { padding: "0 14px 14px", borderTop: `1px solid ${C.line}` },
  section: { marginTop: 12 },
  sectionT: { fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, color: C.teal, marginBottom: 5 },
  sectionC: { fontSize: 13, lineHeight: 1.5, color: "#3a4360" },

  rideWrap: { display: "flex", flexWrap: "wrap", gap: 5 },
  ride: { fontSize: 11.5, color: C.navy, background: C.cream, border: `1px solid ${C.line}`, borderRadius: 7, padding: "3px 8px" },

  meal: { display: "flex", gap: 10, padding: "3px 0" },
  mealK: { fontSize: 11.5, fontWeight: 700, color: "#8a92a6", width: 64, flexShrink: 0, textTransform: "uppercase", letterSpacing: 0.3, paddingTop: 1 },
  mealV: { fontSize: 13, color: "#3a4360", lineHeight: 1.4 },
  mealCost: { color: C.teal, fontWeight: 700 },
  bookFlag: { color: "#a06800", fontWeight: 600 },
  dayTotalRow: { fontSize: 12.5, color: "#3a4360", marginTop: 8, paddingTop: 8, borderTop: `1px dashed ${C.line}` },

  tip: { display: "flex", gap: 8, fontSize: 12.5, color: "#3a4360", lineHeight: 1.45, marginBottom: 6 },
  tipDot: { width: 6, height: 6, borderRadius: "50%", background: C.amber, marginTop: 6, flexShrink: 0 },

  honest: { background: "#fff", borderRadius: 18, padding: 16, border: `1px solid ${C.line}`, boxShadow: "0 2px 14px rgba(13,27,62,0.06)", marginTop: 4 },
  honestP: { fontSize: 13, lineHeight: 1.55, color: "#3a4360", margin: 0 },
};
