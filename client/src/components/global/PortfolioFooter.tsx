// PortfolioFooter.tsx
import "../../styles/headerFooter.css";

export default function PortfolioFooter() {
  return (
    <footer className="pf-footer">
      <span className="pf-footer-copy">
        Built with React · TypeScript · {new Date().getFullYear()}
      </span>
      <nav className="pf-footer-links">
        <a href="/privacy" className="pf-footer-link">Privacy Policy</a>
      </nav>
    </footer>
  );
}