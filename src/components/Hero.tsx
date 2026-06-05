import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { content } from "@/content"
import FloatingDecoration from "@/components/effects/FloatingDecoration"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { sectionTints } from "@/lib/sectionTints"
import { cn } from "@/lib/utils"
import vectorCursor from "@/assets/photos/Vector.png"
import vectorSparkles from "@/assets/photos/Vector-1.png"
import vectorSwirl from "@/assets/photos/Vector@2x-2.png"

const titleStyle = {
  fontSize: "clamp(3rem, 10vw, 7.5rem)",
  lineHeight: 0.92,
  letterSpacing: "0.05em",
} as const

const bottomTitleStyle = {
  fontSize: "clamp(3.25rem, 11vw, 8rem)",
  lineHeight: 0.9,
  letterSpacing: "0.06em",
} as const

const EASE = [0.22, 1, 0.36, 1] as const

type HeroTitleProps = {
  text: string
  color: string
  className?: string
  delay?: number
  layout?: "inline" | "stacked"
  align?: "left" | "center"
  size?: "default" | "large"
}

function HeroTitle({
  text,
  color,
  className,
  delay = 0.3,
  layout = "inline",
  align = "center",
  size = "default",
}: HeroTitleProps) {
  const reducedMotion = useReducedMotion()
  const words = text.split(" ")
  const style = size === "large" ? bottomTitleStyle : titleStyle

  const wordClassName =
    layout === "stacked"
      ? "block"
      : "inline-block mr-[0.22em] last:mr-0"

  const alignClass =
    layout === "stacked"
      ? align === "center"
        ? "flex flex-col items-center text-center"
        : "flex flex-col items-start text-left"
      : align === "center"
        ? "text-center"
        : "text-left"

  if (reducedMotion) {
    return (
      <h1
        className={cn("font-sans font-semibold", alignClass, className)}
        style={{ ...style, color }}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className={wordClassName}>
            {word}
          </span>
        ))}
      </h1>
    )
  }

  return (
    <motion.h1
      className={cn("font-sans font-semibold", alignClass, className)}
      style={{ ...style, color }}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.14, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className={wordClassName}
          variants={{
            hidden: { opacity: 0, y: 48, filter: "blur(8px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.75, ease: EASE },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  )
}

export default function Hero() {
  const { hero } = content
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40])
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.96])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden bg-background"
    >
      <FloatingDecoration
        src={vectorSparkles}
        className="absolute -top-8 -right-12 z-20 w-56 opacity-80 md:w-72 lg:w-80"
        y={14}
        rotate={5}
        duration={6}
        delay={0.2}
      />
      <FloatingDecoration
        src={vectorCursor}
        className="absolute bottom-20 -left-8 z-20 w-44 -rotate-12 opacity-85 md:w-60 lg:w-72"
        y={10}
        rotate={-6}
        duration={5}
        delay={0.5}
      />
      <FloatingDecoration
        src={vectorSwirl}
        className="absolute -bottom-6 -right-10 z-20 w-48 rotate-6 opacity-75 md:w-64 lg:w-72"
        y={12}
        rotate={4}
        duration={6.5}
        delay={0.35}
      />

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-7xl items-center justify-center px-5 py-24 md:px-10 md:py-28">
        <motion.div
          className="pointer-events-none relative z-10 flex w-full max-w-[min(100%,46rem)] flex-col items-center gap-5 text-center md:gap-7"
          style={
            reducedMotion
              ? undefined
              : { y: contentY, scale: contentScale }
          }
        >
          <HeroTitle
            text={hero.titleTop}
            color={sectionTints.heroTop}
            delay={0.35}
            layout="stacked"
            align="center"
          />

          <motion.div
            className="pointer-events-auto w-full"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: EASE }}
          >
            <img
              src={hero.photo.src}
              alt={hero.photo.alt}
              className="h-auto w-full rounded-[2.25rem] object-cover md:rounded-[3rem] lg:rounded-[3.5rem]"
              loading="eager"
            />
          </motion.div>

          <HeroTitle
            text={hero.titleBottom}
            color={sectionTints.heroBottom}
            delay={0.55}
            layout="inline"
            align="center"
            size="large"
          />
        </motion.div>
      </div>
    </section>
  )
}
