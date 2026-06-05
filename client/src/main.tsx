// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles/themes.css";
import "./styles/global.css";
import App from "./App";
import { LandingPage } from "./pages/LandingPage";
import FluidBall from "./pages/fluidBall";
import PyBoard from "./pages/pyboard";
import Resume from "./pages/resume";
import PrivacyPolicy from "./pages/privacyPolicy";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App>
          <Routes>
            <Route path="/"              element={<LandingPage />} />
            <Route path="/fluidball"     element={<FluidBall />} />
            <Route path="/pyboard"       element={<PyBoard />} />
            <Route path="/resume"        element={<Resume />} />
            <Route path="/privacy"       element={<PrivacyPolicy />} />
          </Routes>
        </App>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);