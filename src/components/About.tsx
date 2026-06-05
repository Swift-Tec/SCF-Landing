import { Code2, PartyPopper } from "lucide-react"
import { content } from "@/content"
import Section from "@/components/apple/Section"
import SectionHeading from "@/components/apple/SectionHeading"
import FeatureCard from "@/components/apple/FeatureCard"
import FadeIn from "@/components/effects/FadeIn"
import vectorHeart from "@/assets/photos/Vector-2.png"
import vectorSCurve from "@/assets/photos/Vector@2x-3.png"
import FloatingDecoration from "@/components/effects/FloatingDecoration"

export default function About() {
  const { about } = content

  return (
    <Section
      id="about"
      decoration={
        <>
          <FloatingDecoration
            src={vectorHeart}
            className="absolute -right-16 top-1/2 -translate-y-1/2 w-64 opacity-70 md:w-80 lg:w-96"
            y={10}
            delay={0.15}
          />
          <FloatingDecoration
            src={vectorSCurve}
            className="absolute -left-14 bottom-16 w-56 -rotate-12 opacity-60 md:w-72 lg:w-80"
            y={8}
            rotate={-5}
            delay={0.35}
          />
        </>
      }
    >
      <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-16 xl:gap-x-28">
        <SectionHeading
          eyebrow={about.eyebrow}
          title={about.title}
          size="hero"
          tint="about"
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
