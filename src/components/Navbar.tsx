import { content } from "@/content"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "@/hooks/useTheme"
import { Sun, Moon } from "lucide-react"

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-6 py-3 shadow-2xl backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img
            src={content.brand.logoWhite}
            alt=""
            className="size-9"
          />
          <span className="font-sans text-sm font-semibold tracking-wide text-white">
            {content.brand.name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-sans text-sm text-white/70 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white",
            )}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <a
            href="#register"
            className={cn(buttonVariants({ variant: "glass", size: "sm" }), "rounded-full px-5")}
          >
            Register
          </a>
        </div>
      </div>
    </header>
  )
}
