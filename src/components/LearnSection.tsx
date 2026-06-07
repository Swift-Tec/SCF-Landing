import { Trophy, Mic, Wrench, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { content } from "@/content"
import Section from "@/components/apple/Section"
import SectionHeading from "@/components/apple/SectionHeading"
import FeatureCard from "@/components/apple/FeatureCard"
import FadeIn from "@/components/effects/FadeIn"

const categoryIcons: Record<string, LucideIcon> = {
  Hackathon: Trophy,
  Talks: Mic,
  Workshops: Wrench,
  Networking: Users,
}

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

      <div className="mt-14 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {learn.categories.map((cat, i) => (
          <FadeIn key={cat.title} delay={i * 0.08} className="h-full">
            <FeatureCard
              icon={categoryIcons[cat.title] ?? Trophy}
              title={cat.title}
              description={cat.body}
              className="h-full"
            />
          </FadeIn>
        ))}
      </div>
    </Section>
  )
}
