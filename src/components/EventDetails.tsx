import { Calendar, MapPin, Timer, Sparkles } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { content } from "@/content"
import Section from "@/components/apple/Section"
import SectionHeading from "@/components/apple/SectionHeading"
import FeatureCard from "@/components/apple/FeatureCard"
import FadeIn from "@/components/effects/FadeIn"
import vectorAsterisk from "@/assets/photos/Vector-3.png"
import vectorFlower from "@/assets/photos/Vector@2x-5.png"
import FloatingDecoration from "@/components/effects/FloatingDecoration"

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
      decoration={
        <>
          <FloatingDecoration
            src={vectorAsterisk}
            className="absolute -left-20 bottom-12 w-64 rotate-12 opacity-65 md:w-80 lg:w-96"
            y={12}
            rotate={6}
          />
          <FloatingDecoration
            src={vectorFlower}
            className="absolute -right-14 top-16 w-60 -rotate-6 opacity-60 md:w-72 lg:w-80"
            y={9}
            rotate={-4}
            delay={0.25}
          />
        </>
      }
    >
      <SectionHeading
        eyebrow={event.eyebrow}
        title={event.title}
        description={event.description}
        size="hero"
        tint="event"
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
