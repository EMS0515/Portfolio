import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "ocean" | "forest";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "app-theme";

/* Detect system preference (only used on first load if no saved theme) */
const getSystemTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

/* Get initial theme (localStorage → system → fallback) */
const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";

  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (saved) return saved;

  return getSystemTheme();
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  /* Apply theme to DOM */
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  /* Optional: react to system changes IF user hasn't chosen manually */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return; // user already chose → don't override

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const listener = () => {
      setThemeState(media.matches ? "dark" : "light");
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/* Hook */
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};