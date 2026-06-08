import { content } from "@/content"
import Section from "@/components/apple/Section"
import SectionHeading from "@/components/apple/SectionHeading"
import FadeIn from "@/components/effects/FadeIn"

export default function AgendaSection() {
  const { agenda } = content

  return (
    <Section id="agenda" fullHeight={false}>
      <SectionHeading eyebrow={agenda.eyebrow} title={agenda.title} />

      <div className="mt-14 space-y-16">
        {agenda.days.map((day, dayIndex) => (
          <FadeIn key={day.day} delay={dayIndex * 0.15}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-10">
              {/* Day label — sticky left column on desktop */}
              <div className="shrink-0 sm:w-48">
                <h3 className="font-sans text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  {day.day}
                </h3>
              </div>

              {/* Timeline */}
              <div className="relative flex-1 border-t border-border/60">
                {day.items.map((item, i) => (
                  <div
                    key={i}
                    className="group relative grid grid-cols-[7rem_1fr] items-start gap-x-6 border-b border-border/40 py-4 sm:grid-cols-[9rem_1fr_auto]"
                  >
                    {/* time */}
                    <span className="font-sans text-xs font-medium tabular-nums text-muted-foreground pt-0.5">
                      {item.time}
                    </span>

                    {/* event */}
                    <span className="font-sans text-sm font-medium text-foreground">
                      {item.event}
                    </span>

                    {/* location badge */}
                    <span className="col-span-2 ml-[calc(7rem+1.5rem)] mt-1 w-fit rounded-full border border-border/60 bg-muted/50 px-2.5 py-0.5 font-sans text-[11px] text-muted-foreground sm:col-span-1 sm:ml-0 sm:mt-0 sm:self-center">
                      {item.location}
                    </span>
                  </div>
                ))}

                {"note" in day && (day as { note?: string }).note && (
                  <p className="mt-4 font-sans text-xs leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground/60">Note:</span>{" "}
                    {(day as { note: string }).note}
                  </p>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Map */}
      <FadeIn delay={0.3} className="mt-16">
        <div className="overflow-hidden rounded-[2rem] border border-border/80 bg-card shadow-sm">
          <div className="relative h-72 w-full sm:h-96">
            <iframe
              title="Tecnológico de Monterrey, Campus Monterrey"
              src="https://maps.google.com/maps?q=Tecnol%C3%B3gico+de+Monterrey%2C+Campus+Monterrey%2C+Monterrey%2C+Mexico&z=16&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
          <div className="flex items-center gap-2 px-6 py-4">
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 text-foreground/70"
              aria-hidden="true"
            >
              <path
                d="M8 0C4.686 0 2 2.686 2 6c0 4.125 5.25 11 5.515 11.325a.625.625 0 0 0 .97 0C8.75 17 14 10.125 14 6 14 2.686 11.314 0 8 0Z"
                fill="currentColor"
              />
              <circle cx="8" cy="6" r="2.25" fill="white" />
            </svg>
            <span className="font-sans text-sm font-medium text-foreground/70">
              Tecnológico de Monterrey, Campus Monterrey
            </span>
          </div>
        </div>
      </FadeIn>
    </Section>
  )
}
