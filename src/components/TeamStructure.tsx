import { Laptop, UsersRound, Award } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { content } from "@/content"
import Section from "@/components/apple/Section"
import SectionHeading from "@/components/apple/SectionHeading"
import FeatureCard from "@/components/apple/FeatureCard"
import FadeIn from "@/components/effects/FadeIn"

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
    >
      <SectionHeading
        eyebrow={teams.eyebrow}
        title={teams.title}
        description={teams.description}
        size="hero"
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
