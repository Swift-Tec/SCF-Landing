import { Calendar, MapPin, Timer, Sparkles } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { content } from "@/content"
import Section from "@/components/apple/Section"
import SectionHeading from "@/components/apple/SectionHeading"
import FeatureCard from "@/components/apple/FeatureCard"
import FadeIn from "@/components/effects/FadeIn"

const detailIcons: Record<string, LucideIcon> = {
  Dates: Calendar,
  Location: MapPin,
  Format: Timer,
  Theme: Sparkles,
}

export default function EventDetails() {
  const { event } = content

  return (
    <Section
      id="event"
    >
      <SectionHeading
        eyebrow={event.eyebrow}
        title={event.title}
        description={event.description}
        size="hero"
      />

      <div className="mt-14 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {event.details.map((detail, index) => (
          <FadeIn key={detail.label} delay={index * 0.08} className="h-full">
            <FeatureCard
              icon={detailIcons[detail.label] ?? Sparkles}
              title={detail.value}
              description={detail.sub}
              className="h-full"
            />
          </FadeIn>
        ))}
      </div>
    </Section>
  )
}
