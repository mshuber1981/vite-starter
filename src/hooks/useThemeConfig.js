import { useState, useEffect } from "react";

// Color definitions - same as in CLI but accessible to React
const THEME_COLORS = {
  blue: "#1976d2",
  purple: "#9c27b0",
  teal: "#009688",
  orange: "#ff9800",
  red: "#f44336",
  green: "#4caf50",
  indigo: "#3f51b5",
  pink: "#e91e63",
  amber: "#ffc107",
  cyan: "#00bcd4",
};

/**
 * Hook to load and provide theme configuration
 * Reads from vite-starter.config.json if available, falls back to default
 */
export function useThemeConfig() {
  const [primaryColor, setPrimaryColor] = useState("#1976d2"); // Default blue
  const [colorKey, setColorKey] = useState("blue");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConfiguration();
  }, []);

  const loadConfiguration = async () => {
    try {
      // Try to load config from public directory (accessible to React)
      const response = await fetch("/vite-starter.config.json");
      if (response.ok) {
        const config = await response.json();
        const color = THEME_COLORS[config.primaryColor] || THEME_COLORS.blue;
        setPrimaryColor(color);
        setColorKey(config.primaryColor || "blue");
      } else {
        // Config file doesn't exist, use defaults
        setPrimaryColor(THEME_COLORS.blue);
        setColorKey("blue");
      }
    } catch {
      // Fallback to default if any error occurs
      console.log("Using default theme configuration");
      setPrimaryColor(THEME_COLORS.blue);
      setColorKey("blue");
    } finally {
      setLoading(false);
    }
  };

  return {
    primaryColor,
    colorKey,
    loading,
    availableColors: THEME_COLORS,
    refreshConfig: loadConfiguration,
  };
}
