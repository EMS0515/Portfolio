// App.tsx
import { type ReactNode } from "react";
import PortfolioHeader from "./components/global/PortfolioHeader";
import PortfolioFooter from "./components/global/PortfolioFooter";

function App({ children }: { children: ReactNode }) {
  return (
    <>
      <PortfolioHeader />
      {children}
      <PortfolioFooter />
    </>
  );
}

export default App;