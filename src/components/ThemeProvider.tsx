import { type ReactNode, useEffect } from "react"

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null
    const theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark"
    document.documentElement.setAttribute("data-theme", theme)
  }, [])

  return <>{children}</>
}
