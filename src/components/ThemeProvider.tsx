import { type ReactNode, useEffect } from "react"

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const apply = (dark: boolean) => {
      const root = document.documentElement
      root.setAttribute("data-theme", dark ? "dark" : "light")
      root.classList.toggle("dark", dark)
    }

    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    apply(mq.matches)

    const handler = (e: MediaQueryListEvent) => apply(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return <>{children}</>
}
