"use client"

import { useEffect, useState } from "react"
import { create } from "zustand"

type Theme = "light" | "dark" | "system"

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light", // Changé de "dark" à "light"
  setTheme: (theme) => set({ theme }),
}))

export function useTheme() {
  const { theme, setTheme } = useThemeStore()
  const [mounted, setMounted] = useState(false)

  // Apply theme class to document
  useEffect(() => {
    setMounted(true)

    const applyTheme = () => {
      const root = window.document.documentElement

      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        root.classList.remove("light", "dark")
        root.classList.add(systemTheme)
      } else {
        root.classList.remove("light", "dark")
        root.classList.add(theme)
      }
    }

    applyTheme()

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      if (theme === "system") {
        applyTheme()
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  return { theme: mounted ? theme : "light", setTheme }
}

