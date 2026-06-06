import { content } from "@/content"
import Section from "@/components/apple/Section"
import SectionHeading from "@/components/apple/SectionHeading"
import FadeIn from "@/components/effects/FadeIn"

export default function LearnSection() {
  const { learn } = content

  return (
    <Section id="learn" fullHeight={false}>
      <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-x-20 xl:gap-x-28">
        <SectionHeading
          eyebrow={learn.eyebrow}
          title={learn.title}
          description={learn.description}
          size="hero"
        />
        <FadeIn delay={0.1}>
          <img
            src={learn.image}
            alt={learn.imageAlt}
            className="aspect-[4/3] w-full rounded-3xl object-cover"
          />
        </FadeIn>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {learn.categories.map((cat, i) => (
          <FadeIn key={cat.title} delay={i * 0.08}>
            <article className="rounded-2xl border border-border/80 bg-card p-6">
              <h3 className="font-sans text-base font-semibold text-foreground">
                {cat.title}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
                {cat.body}
              </p>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  )
}
