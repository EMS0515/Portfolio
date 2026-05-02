// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles/themes.css";
import "./styles/global.css";
import App from "./App";
import { LandingPage } from "./pages/LandingPage";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App>
          <Routes>
            <Route path="/"              element={<LandingPage />} />
          </Routes>
        </App>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);