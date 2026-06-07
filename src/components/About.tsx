import { motion } from "framer-motion"
import { Code2, PartyPopper } from "lucide-react"
import { content } from "@/content"
import Section from "@/components/apple/Section"
import FeatureCard from "@/components/apple/FeatureCard"
import FadeIn from "@/components/effects/FadeIn"

export default function About() {
  const { about } = content

  return (
    <Section id="about">
      <div className="flex flex-col items-center text-center">
        <p className="page-eyebrow mb-6 text-muted-foreground">
          {about.eyebrow}
        </p>
        <h2 className="page-display text-foreground">
          We are{" "}
          <motion.span
            className="cursor-default"
            whileHover={{ color: "#FF9500" }}
            transition={{ duration: 0.2 }}
          >
            SwiftTec
          </motion.span>
          .
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {about.subtitle}
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <FadeIn delay={0.1} className="h-full">
          <FeatureCard
            icon={Code2}
            title="A Swift-native community."
            description={about.body[0]}
            className="h-full"
          />
        </FadeIn>
        <FadeIn delay={0.18} className="h-full">
          <FeatureCard
            icon={PartyPopper}
            title="Our flagship hackathon."
            description={about.body[1]}
            className="h-full"
          />
        </FadeIn>
      </div>
    </Section>
  )
}
