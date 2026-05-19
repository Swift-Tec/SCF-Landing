import { content } from "../content"

export default function TeamStructure() {
  const { teams } = content

  return (
    <section id="teams" className="border-t border-white/5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-flame-400">
            {teams.eyebrow}
          </p>
          <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            {teams.title}
          </h2>
          <p className="mt-6 text-lg text-slate-400">{teams.description}</p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {teams.roles.map((role, i) => (
            <div
              key={role.title}
              className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8"
            >
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-flame-500/15 text-sm font-bold text-flame-300">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-xl font-semibold text-white">{role.title}</h3>
              <p className="mt-1 text-sm font-medium text-flame-400">
                {role.size}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                {role.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
