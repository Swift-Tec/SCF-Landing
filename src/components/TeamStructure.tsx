import { Laptop, UsersRound, Award } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { content } from "@/content"
import Section from "@/components/apple/Section"
import SectionHeading from "@/components/apple/SectionHeading"
import FeatureCard from "@/components/apple/FeatureCard"
import FadeIn from "@/components/effects/FadeIn"
import vectorSmiley from "@/assets/photos/Vector-4.png"
import vectorGoldSparkles from "@/assets/photos/Vector@2x-4.png"
import FloatingDecoration from "@/components/effects/FloatingDecoration"

const roleIcons: Record<string, LucideIcon> = {
  Builders: Laptop,
  Mentors: UsersRound,
  Judges: Award,
}

export default function TeamStructure() {
  const { teams } = content

  return (
    <Section
      id="teams"
      decoration={
        <>
          <FloatingDecoration
            src={vectorSmiley}
            className="absolute -right-16 top-16 w-60 -rotate-6 opacity-65 md:w-72 lg:w-80"
            y={10}
            delay={0.1}
          />
          <FloatingDecoration
            src={vectorGoldSparkles}
            className="absolute -left-10 bottom-14 w-56 rotate-6 opacity-60 md:w-68 lg:w-72"
            y={11}
            rotate={5}
            delay={0.3}
          />
        </>
      }
    >
      <SectionHeading
        eyebrow={teams.eyebrow}
        title={teams.title}
        description={teams.description}
        size="hero"
        tint="teams"
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
        {teams.roles.map((role, index) => (
          <FadeIn key={role.title} delay={index * 0.1}>
            <FeatureCard
              icon={roleIcons[role.title] ?? UsersRound}
              title={role.title}
              description={`${role.size}. ${role.body}`}
            />
          </FadeIn>
        ))}
      </div>
    </Section>
  )
}
