import { content } from "../content"

export default function EventDetails() {
  const { event } = content

  return (
    <section id="event" className="border-t border-white/5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-flame-400">
            {event.eyebrow}
          </p>
          <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            {event.title}
          </h2>
          <p className="mt-6 text-lg text-slate-400">{event.description}</p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {event.details.map((detail) => (
            <div
              key={detail.label}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-flame-500/40 hover:bg-white/[0.04]"
            >
              <div
                className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-flame-500/0 blur-2xl transition-colors group-hover:bg-flame-500/20"
                aria-hidden
              />
              <p className="relative text-xs font-medium uppercase tracking-widest text-flame-400">
                {detail.label}
              </p>
              <p className="relative mt-3 text-lg font-semibold text-white">
                {detail.value}
              </p>
              <p className="relative mt-1 text-sm text-slate-500">
                {detail.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
