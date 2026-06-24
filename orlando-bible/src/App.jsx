import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { C } from "./theme";
import { TripProfileProvider } from "./context/TripProfile";
import TabBar from "./components/TabBar";
import Plan from "./modules/Plan";
import BudgetCalculator from "./modules/BudgetCalculator";
import StayDecider from "./modules/StayDecider";
import ComingSoon from "./modules/ComingSoon";

export default function App() {
  return (
    <TripProfileProvider>
      <BrowserRouter>
        <div style={S.frame}>
          <Routes>
            <Route path="/" element={<Plan />} />
            <Route path="/budget" element={<BudgetCalculator />} />
            <Route path="/stay" element={<StayDecider />} />
            <Route
              path="/tickets"
              element={
                <ComingSoon
                  title="Tickets, decoded."
                  subtitle="The most confusing — and most overspent — decision of the lot."
                  blurb="The Ticket Decoder is the next module: how many days you actually need, whether Park Hopper earns its place, Disney-plus-Universal combinations, and where to buy without paying the markup."
                />
              }
            />
            <Route
              path="/more"
              element={
                <ComingSoon
                  title="More to come."
                  subtitle="The Orlando Bible is being built module by module."
                  blurb="Money setup and tipping, driving and tolls, beyond-the-parks days, and the Disney cruise + parks combo are all on the roadmap."
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <TabBar />
        </div>
      </BrowserRouter>
    </TripProfileProvider>
  );
}

const S = {
  frame: {
    maxWidth: 440, margin: "0 auto", background: C.cream, minHeight: "100vh",
    position: "relative", boxShadow: "0 0 60px rgba(13,27,62,0.18)",
    color: C.ink, fontFamily: "'Inter', system-ui, sans-serif",
  },
};
