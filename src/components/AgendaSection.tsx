import { content } from "@/content"
import Section from "@/components/apple/Section"
import SectionHeading from "@/components/apple/SectionHeading"
import FadeIn from "@/components/effects/FadeIn"
import TiltCard from "@/components/effects/TiltCard"

const dotColors = ["#FF6B6B", "#FFCC00", "#4CD964", "#007AFF", "#AF52DE"]

export default function AgendaSection() {
  const { agenda } = content

  return (
    <Section id="agenda" fullHeight={false}>
      <SectionHeading
        eyebrow={agenda.eyebrow}
        title={agenda.title}
      />

      <div className="mt-14 grid items-stretch gap-6 sm:grid-cols-2">
        {agenda.days.map((day, dayIndex) => (
          <FadeIn key={day.day} delay={dayIndex * 0.1} className="h-full">
            <TiltCard className="h-full">
              <article className="flex h-full min-h-[260px] flex-col rounded-[2rem] border border-border/80 bg-card p-8 transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.12)] md:p-9">
                <h3 className="font-sans text-xl font-semibold leading-snug tracking-[0.035em] text-foreground md:text-2xl">
                  {day.day}
                </h3>
                <ul className="mt-8 flex flex-1 flex-col gap-3.5">
                  {day.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: dotColors[i % dotColors.length] }}
                        aria-hidden
                      />
                      <span className="font-sans text-base leading-relaxed text-muted-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </TiltCard>
          </FadeIn>
        ))}
      </div>
    </Section>
  )
}
