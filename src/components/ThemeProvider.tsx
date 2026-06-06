import { type ReactNode, useEffect } from "react"

/** Landing site uses a fixed light theme to match the hero. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-theme", "light")
    root.classList.remove("dark")
  }, [])

  return <>{children}</>
}
