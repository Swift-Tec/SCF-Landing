import { content } from "../content"
import logo from "../assets/logo.png"

export default function Footer() {
  const { footer, brand } = content

  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="h-8 w-8" />
          <span className="text-sm text-slate-400">
            {brand.name} · by {brand.org}
          </span>
        </div>

        <nav className="flex items-center gap-6">
          {footer.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-slate-500">{footer.copyright}</p>
      </div>
    </footer>
  )
}
