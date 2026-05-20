import { Suspense, lazy } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { content } from "@/content"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import FadeIn from "@/components/effects/FadeIn"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

const GrainientBloom = lazy(() => import("@/components/effects/GrainientBloom"))

function ShaderFallback() {
  return <div className="absolute inset-0 bg-background" aria-hidden />
}

export default function Hero() {
  const { hero } = content
  const reducedMotion = useReducedMotion()
  const { scrollY } = useScroll()

  const bgY = useTransform(
    scrollY,
    [0, 1000],
    reducedMotion ? [0, 0] : [0, 250]
  )
  const logoScale = useTransform(
    scrollY,
    [0, 400],
    reducedMotion ? [1, 1] : [1, 0.85]
  )
  const logoOpacity = useTransform(
    scrollY,
    [0, 400],
    reducedMotion ? [1, 1] : [1, 0.5]
  )

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden">
      <motion.div
        className="absolute -inset-[60px]"
        style={{ y: bgY }}
      >
        <Suspense fallback={<ShaderFallback />}>
          <GrainientBloom
            className="h-full w-full"
            color1="#7c3aed"
            color2="#f97316"
            color3="#4c1d95"
            timeSpeed={0.2}
            grainAnimated
          />
        </Suspense>
      </motion.div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-20 pt-32 text-center md:pt-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
          style={{ scale: logoScale, opacity: logoOpacity }}
        >
          <img
            src={content.brand.logoWhite}
            alt="Swift logo"
            className="mx-auto h-48 w-48 object-contain md:h-64 md:w-64"
            loading="eager"
          />
        </motion.div>

        <FadeIn>
          <Badge
            variant="outline"
            className="mb-5 border-white/30 bg-white/10 px-4 py-1.5 font-sans text-xs uppercase tracking-[0.2em] text-white"
          >
            {hero.eyebrow}
          </Badge>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="max-w-4xl font-display text-5xl font-normal leading-[1.05] text-white md:text-7xl lg:text-8xl">
            {hero.title}
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-6 max-w-2xl font-sans text-lg font-light text-white/70 md:text-xl">
            {hero.subtitle}
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href={hero.primaryCta.href}
              className={cn(buttonVariants({ variant: "glass", size: "lg" }), "rounded-full px-8")}
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className={cn(buttonVariants({ variant: "glass", size: "lg" }), "rounded-full px-8")}
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.4} className="mt-20 w-full max-w-2xl">
          <Separator className="mb-10 bg-white/20" />
          <dl className="grid grid-cols-3 gap-6">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="font-sans text-2xl font-bold text-white md:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 font-sans text-xs font-light uppercase tracking-wide text-white/60">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  )
}
