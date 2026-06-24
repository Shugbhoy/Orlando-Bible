import React, { createContext, useContext, useState } from "react";

/**
 * The Trip Profile is the spine of the app: the core inputs every module
 * needs (party, nights, season, park focus). A family sets these once and
 * every module reads them. Module-specific inputs (e.g. the budget's
 * accommodation choice, or the decider's "first time?" flag) stay local to
 * that module.
 */

const DEFAULT_PROFILE = {
  adults: 2,
  teens: 0,
  children: 2,
  infants: 0,
  nights: 14,
  season: "shoulder", // offpeak | shoulder | peak
  focus: "both", // both | disney | universal
};

const TripProfileContext = createContext(null);

export function TripProfileProvider({ children }) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const update = (key, value) =>
    setProfile((prev) => ({ ...prev, [key]: value }));

  const heads = profile.adults + profile.teens + profile.children;

  return (
    <TripProfileContext.Provider value={{ profile, update, setProfile, heads }}>
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
