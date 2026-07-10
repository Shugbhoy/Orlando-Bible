import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { C } from "./theme";
import { TripProfileProvider } from "./context/TripProfile";
import TabBar from "./components/TabBar";
import Plan from "./modules/Plan";
import BudgetCalculator from "./modules/BudgetCalculator";
import StayDecider from "./modules/StayDecider";
import TicketDecoder from "./modules/TicketDecoder";
import DealsTips from "./modules/DealsTips";
import Itinerary from "./modules/Itinerary";
import GuideMenu from "./modules/GuideMenu";
import Accessibility from "./modules/Accessibility";
import HeightChecker from "./modules/HeightChecker";

export default function App() {
  return (
    <TripProfileProvider>
      <BrowserRouter>
        <div style={S.frame}>
          <Routes>
            <Route path="/" element={<Plan />} />
            <Route path="/budget" element={<BudgetCalculator />} />
            <Route path="/stay" element={<StayDecider />} />
            <Route path="/tickets" element={<TicketDecoder />} />
            <Route path="/deals" element={<DealsTips />} />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/guide" element={<GuideMenu />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/height-checker" element={<HeightChecker />} />
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
