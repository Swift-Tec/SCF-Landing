import { content } from "../content"
import logo from "../assets/logo.png"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-3">
          <img src={logo} alt="" className="h-9 w-9" />
          <span className="text-sm font-semibold tracking-wide text-white">
            {content.brand.name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#register"
          className="rounded-full bg-flame-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-flame-500/20 transition hover:bg-flame-400"
        >
          Register
        </a>
      </div>
    </header>
  )
}
