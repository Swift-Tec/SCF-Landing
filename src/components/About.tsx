import { content } from "@/content"
import AnimatedPhoto from "@/components/effects/AnimatedPhoto"
import FadeIn from "@/components/effects/FadeIn"
import StaggerChildren, {
  StaggerItem,
} from "@/components/effects/StaggerChildren"

export default function About() {
  const { about } = content

  return (
    <section id="about" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <FadeIn direction="left" className="lg:col-span-4">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {about.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl lg:text-6xl">
              {about.title}
            </h2>
          </FadeIn>

          <StaggerChildren className="flex flex-col gap-6 font-sans text-lg font-light text-muted-foreground lg:col-span-4">
            {about.body.map((paragraph, i) => (
              <StaggerItem key={i}>
                <p>{paragraph}</p>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <FadeIn delay={0.2} direction="right" className="lg:col-span-4">
            <AnimatedPhoto
              src={about.image.src}
              alt={about.image.alt}
              caption={about.image.caption}
              className="lg:scale-105"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
