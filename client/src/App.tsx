// App.tsx
import { type ReactNode } from "react";
import PortfolioHeader from "./components/global/PortfolioHeader";

function App({ children }: { children: ReactNode }) {
  return (
    <>
      <PortfolioHeader />
      {children}
    </>
  );
}

export default App;