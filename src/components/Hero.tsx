import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import { CalendarDays, MapPin } from "lucide-react"
import { content } from "@/content"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const EASE = [0.22, 1, 0.36, 1] as const

const RAINBOW =
  "linear-gradient(90deg, #FF6B6B 0%, #FF9500 20%, #FFCC00 40%, #4CD964 60%, #007AFF 80%, #AF52DE 100%)"

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
      className="relative min-h-[100dvh] bg-white"
    >
      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-6xl items-center justify-center px-5 py-24 md:px-10 md:py-28">
        <motion.div
          className="pointer-events-none relative z-10 flex w-full flex-col items-center overflow-visible text-center"
          style={reducedMotion ? undefined : { y: contentY, scale: contentScale }}
        >
          <motion.h1
            className="-mb-4 font-sans font-semibold text-foreground md:-mb-5"
            style={{
              fontSize: "clamp(2.5rem, 9vw, 6rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
            initial={reducedMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            Swift
          </motion.h1>

          <motion.h1
            className="overflow-visible leading-none"
            initial={reducedMotion ? false : { opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.35, ease: EASE }}
          >
            <span
              className="inline-block translate-y-1.5 overflow-visible px-1 pb-[0.5em] pt-0 md:translate-y-2"
              style={{
                fontSize: "clamp(4.5rem, 18vw, 11rem)",
                lineHeight: 1.3,
                fontFamily: "'Pacifico', cursive",
                background: RAINBOW,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                WebkitBoxDecorationBreak: "clone",
                boxDecorationBreak: "clone",
              }}
            >
              challenge
            </span>
          </motion.h1>

          <motion.h1
            className="-mt-8 font-sans font-semibold text-foreground md:-mt-10"
            style={{
              fontSize: "clamp(2.5rem, 9vw, 6rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
            initial={reducedMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          >
            fest 2026
          </motion.h1>

          <motion.div
            className="pointer-events-auto mt-12 flex flex-col items-center gap-5 md:mt-14 md:gap-6"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: EASE }}
          >
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-base text-muted-foreground md:text-lg">
              <span className="flex items-center gap-2">
                <CalendarDays className="size-4 shrink-0 md:size-[1.125rem]" aria-hidden />
                {hero.date}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0 md:size-[1.125rem]" aria-hidden />
                {hero.venue}
              </span>
            </div>
            <Link
              to="/register"
              className={cn(
                buttonVariants({ variant: "cta", size: "default" }),
                "rounded-full px-10 py-3 text-base font-semibold md:px-12 md:py-3.5 md:text-lg",
              )}
            >
              {hero.ctaLabel}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
