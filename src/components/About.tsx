import { Code2, PartyPopper } from "lucide-react"
import { content } from "@/content"
import Section from "@/components/apple/Section"
import SectionHeading from "@/components/apple/SectionHeading"
import FeatureCard from "@/components/apple/FeatureCard"
import FadeIn from "@/components/effects/FadeIn"

export default function About() {
  const { about } = content

  return (
    <Section
      id="about"
    >
      <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-16 xl:gap-x-28">
        <SectionHeading
          eyebrow={about.eyebrow}
          title={about.title}
        size="hero"
      />

        <div className="flex flex-col gap-6 lg:pt-4">
          <FadeIn delay={0.1}>
            <FeatureCard
              icon={Code2}
              title="A Swift-native community."
              description={about.body[0]}
            />
          </FadeIn>
          <FadeIn delay={0.18}>
            <FeatureCard
              icon={PartyPopper}
              title="Our flagship hackathon."
              description={about.body[1]}
            />
          </FadeIn>
        </div>
      </div>
    </Section>
  )
}
