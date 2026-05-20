import { useEffect, useState, useCallback } from "react"

type Theme = "light" | "dark"

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark"
  const stored = localStorage.getItem("theme") as Theme | null
  if (stored === "light" || stored === "dark") return stored
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    const listener = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem("theme")
      if (!stored) {
        setThemeState(e.matches ? "light" : "dark")
      }
    }
    const mq = window.matchMedia("(prefers-color-scheme: light)")
    mq.addEventListener("change", listener)
    return () => mq.removeEventListener("change", listener)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"))
  }, [])

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
  }, [])

  return { theme, toggleTheme, setTheme, isDark: theme === "dark" }
}
