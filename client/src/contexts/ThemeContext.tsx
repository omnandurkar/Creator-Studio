import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ReaderSize = "standard" | "large";

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  switchable: boolean;
  readerSize: ReaderSize;
  setReaderSize: (size: ReaderSize) => void;
  calmContrast: boolean;
  setCalmContrast: (enabled: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (switchable) {
      const stored = localStorage.getItem("theme");
      return (stored as Theme) || defaultTheme;
    }
    return defaultTheme;
  });
  const [readerSize, setReaderSize] = useState<ReaderSize>(() => (localStorage.getItem("creator-reader-size") as ReaderSize) || "standard");
  const [calmContrast, setCalmContrast] = useState(() => localStorage.getItem("creator-calm-contrast") === "true");
  const [reducedMotion, setReducedMotion] = useState(() => localStorage.getItem("creator-reduced-motion") === "true");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    if (switchable) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, switchable]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.readerSize = readerSize;
    root.classList.toggle("calm-contrast", calmContrast);
    root.classList.toggle("reduce-motion", reducedMotion);
    localStorage.setItem("creator-reader-size", readerSize);
    localStorage.setItem("creator-calm-contrast", String(calmContrast));
    localStorage.setItem("creator-reduced-motion", String(reducedMotion));
  }, [readerSize, calmContrast, reducedMotion]);

  const toggleTheme = switchable
    ? () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
      }
    : undefined;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, switchable, readerSize, setReaderSize, calmContrast, setCalmContrast, reducedMotion, setReducedMotion }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
