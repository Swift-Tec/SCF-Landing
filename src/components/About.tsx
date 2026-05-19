import { content } from "../content"

export default function About() {
  const { about } = content

  return (
    <section id="about" className="border-t border-white/5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="text-xs font-medium uppercase tracking-widest text-flame-400">
              {about.eyebrow}
            </p>
            <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">
              {about.title}
            </h2>
          </div>
          <div className="space-y-6 text-lg text-slate-400 md:col-span-8">
            {about.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
