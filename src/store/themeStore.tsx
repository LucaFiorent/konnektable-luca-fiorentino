import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

// store for theme management
const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      // initial state: get from the localStorage or set default to light
      theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
      toggleTheme: () => {
        const newTheme = get().theme === "light" ? "dark" : "light";
        set({ theme: newTheme }); // update with new theme

        // set the new theme in localStorage
        localStorage.setItem("theme", newTheme);
        // set theme document (html element)
        document.documentElement.classList.toggle("dark", newTheme === "dark");
      },
    }),
    {
      name: "theme-storage", // key for store state in localStorage
    }
  )
);

// apply initial theme
const theme = localStorage.getItem("theme") || "light"; // get theme from localStorage or default to "light"
document.documentElement.classList.toggle("dark", theme === "dark"); // toggle "dark" class

export default useThemeStore;
