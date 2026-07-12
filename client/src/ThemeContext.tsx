import React, { createContext, useContext, useEffect, useState } from "react";

export type Settings = {
  darkMode: boolean;
  compactSidebar: boolean;
  emailAlerts: boolean;
  pushNotifications: boolean;
  autoRefresh: boolean;
};

const defaultSettings: Settings = {
  darkMode: true,
  compactSidebar: false,
  emailAlerts: true,
  pushNotifications: false,
  autoRefresh: true,
};

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  resetSettings: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const stored = localStorage.getItem("transitly-settings");
      return stored ? JSON.parse(stored) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    localStorage.setItem("transitly-settings", JSON.stringify(settings));
    
    // Sync dark mode class on document element
    const root = document.documentElement;
    if (settings.darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [settings]);

  const toggleTheme = () => {
    setSettings((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem("transitly-settings");
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark: settings.darkMode,
        toggleTheme,
        settings,
        updateSetting,
        resetSettings,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
