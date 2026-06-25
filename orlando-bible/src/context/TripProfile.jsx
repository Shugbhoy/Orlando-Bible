
import React, { createContext, useContext, useState } from "react";
import { defaultApplied } from "../lib/deals";

/**
 * The Trip Profile is the spine of the app. It now holds three things, all
 * "set once, read everywhere":
 *   profile      — core identity (party, nights, season, focus)
 *   plan         — the Budget module's choices (accommodation, transport, tier)
 *   dealsApplied — which Deals & Tips savings the user is counting
 *
 * Holding all three centrally is what lets the home-screen summary show a
 * single "your trip, before & after the Bible's savings" figure.
 */

const DEFAULT_PROFILE = {
  adults: 2, teens: 0, children: 2, infants: 0,
  nights: 14, season: "shoulder", focus: "both",
};
const DEFAULT_PLAN = { accom: "villa", transport: "car", tier: "mid" };

const TripProfileContext = createContext(null);

export function TripProfileProvider({ children }) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [plan, setPlan] = useState(DEFAULT_PLAN);
  const [dealsApplied, setDealsApplied] = useState(defaultApplied);

  const update = (key, value) => setProfile((p) => ({ ...p, [key]: value }));
  const updatePlan = (key, value) => setPlan((p) => ({ ...p, [key]: value }));
  const toggleDeal = (id) => setDealsApplied((a) => ({ ...a, [id]: !a[id] }));

  const heads = profile.adults + profile.teens + profile.children;

  return (
    <TripProfileContext.Provider
      value={{ profile, update, setProfile, plan, updatePlan, dealsApplied, toggleDeal, setDealsApplied, heads }}
    >
      {children}
    </TripProfileContext.Provider>
  );
}

export function useTripProfile() {
  const ctx = useContext(TripProfileContext);
  if (!ctx)
    throw new Error("useTripProfile must be used inside <TripProfileProvider>");
  return ctx;
}
