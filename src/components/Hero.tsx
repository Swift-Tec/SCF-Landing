import { content } from "../content"
import logo from "../assets/logo.png"

export default function Hero() {
  const { hero } = content

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div
        className="absolute inset-x-0 -top-32 mx-auto h-[600px] max-w-4xl rounded-full bg-flame-500/20 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pb-28 pt-24 text-center md:pt-32">
        <div className="relative mb-8 glow-flame">
          <img
            src={logo}
            alt={`${content.brand.name} logo`}
            className="h-28 w-28 drop-shadow-[0_8px_32px_rgba(249,115,22,0.45)] md:h-32 md:w-32"
          />
        </div>

        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-flame-500/30 bg-flame-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-flame-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flame-400" />
          {hero.eyebrow}
        </p>

        <h1 className="max-w-3xl text-5xl font-bold leading-tight text-white md:text-7xl">
          <span className="text-gradient-flame">{hero.title}</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-400 md:text-xl">
          {hero.subtitle}
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={hero.primaryCta.href}
            className="rounded-full bg-flame-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-flame-500/30 transition hover:bg-flame-400"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5"
          >
            {hero.secondaryCta.label}
          </a>
        </div>

        <dl className="mt-20 grid w-full max-w-2xl grid-cols-3 gap-6 border-t border-white/5 pt-10">
          {hero.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="text-2xl font-bold text-white md:text-3xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
