// Portfolio Header Component with link to go to main landing page and my name

import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";



const THEMES = ["light", "dark", "ocean", "forest"] as const;

const PortfolioHeader = () => {
    const { theme, setTheme } = useTheme();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return (
        <header>
        <h1>My Portfolio</h1>
        <Link to="/">Home</Link>
        <div className="lp-theme-picker">
            <button
                className="lp-theme-toggle"
                onClick={() => setDropdownOpen(o => !o)}
                aria-label="Change theme"
            >
                {theme.charAt(0).toUpperCase() + theme.slice(1)} ▾
            </button>
            {dropdownOpen && (
                <div className="lp-theme-dropdown">
                {THEMES.map(t => (
                    <button
                    key={t}
                    className={`lp-theme-option ${theme === t ? "active" : ""}`}
                    onClick={() => { setTheme(t); setDropdownOpen(false); }}
                    >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                ))}
                </div>
            )}
            </div>
        </header>
    );
};

export default PortfolioHeader;