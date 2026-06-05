import "../../styles/landingpage.css";

export default function PortfolioFooter() {
  return (
      <footer className="lp-footer">
        Built with React TypeScript · {new Date().getFullYear()}
        <a href="/privacy">Privacy Policy</a>
      </footer>
    );
}