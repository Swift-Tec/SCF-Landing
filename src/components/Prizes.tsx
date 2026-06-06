import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import {
  animate,
  motion,
  useMotionValue,
} from "framer-motion"
import {
  Headphones,
  Tablet,
  Gift,
  Crown,
  Medal,
  Trophy,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { content } from "@/content"
import Section from "@/components/apple/Section"
import SectionHeading from "@/components/apple/SectionHeading"
import FadeIn from "@/components/effects/FadeIn"
import { useReducedMotion } from "@/hooks/useReducedMotion"


const EASE = [0.22, 1, 0.36, 1] as const
const WHEEL_COOLDOWN_MS = 500

type RankVisual = {
  icon: typeof Headphones
  rankIcon: typeof Crown
}

const visuals: Record<number, RankVisual> = {
  1: { icon: Headphones, rankIcon: Crown },
  2: { icon: Tablet, rankIcon: Medal },
  3: { icon: Gift, rankIcon: Trophy },
}

export default function Prizes() {
  const { prizes } = content
  const reducedMotion = useReducedMotion()

  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const wheelLockRef = useRef(false)

  const [step, setStep] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const [index, setIndex] = useState(0)

  const count = prizes.items.length

  const measure = useCallback(() => {
    const track = trackRef.current
    const viewport = viewportRef.current
    if (!track || !viewport) return
    const firstCard = track.children[0] as HTMLElement | undefined
    if (!firstCard) return
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0
    setStep(firstCard.offsetWidth + gap)
    setMaxScroll(Math.max(0, track.scrollWidth - viewport.offsetWidth))
  }, [])

  useLayoutEffect(() => {
    measure()
  }, [measure])

  useEffect(() => {
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [measure])

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(next, count - 1))
      const target = -Math.min(clamped * step, maxScroll)
      setIndex(clamped)
      if (reducedMotion) {
        x.set(target)
      } else {
        animate(x, target, { type: "spring", stiffness: 260, damping: 32 })
      }
    },
    [count, step, maxScroll, reducedMotion, x],
  )

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const onWheel = (event: WheelEvent) => {
      const dominant =
        Math.abs(event.deltaX) >= Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY

      if (Math.abs(dominant) < 24) return

      event.preventDefault()

      if (wheelLockRef.current) return
      wheelLockRef.current = true
      window.setTimeout(() => {
        wheelLockRef.current = false
      }, WHEEL_COOLDOWN_MS)

      if (dominant < 0) {
        goTo(index + 1)
      } else {
        goTo(index - 1)
      }
    }

    viewport.addEventListener("wheel", onWheel, { passive: false })
    return () => viewport.removeEventListener("wheel", onWheel)
  }, [goTo, index])

  return (
    <Section
      id="prizes"
      className="!px-0"
    >
      <div className="apple-section-shell">
        <SectionHeading
          eyebrow={prizes.eyebrow}
          title={prizes.title}
          description={prizes.description}
          size="hero"
        />
      </div>

      <FadeIn delay={0.1} className="mt-14">
        <div ref={viewportRef} className="overflow-hidden px-6 md:px-10">
          <motion.div
            ref={trackRef}
            className="flex gap-6 md:gap-8"
            style={{ x }}
          >
            {prizes.items.map((prize, i) => {
              const v = visuals[prize.rank] ?? visuals[1]
              const Icon = v.icon
              const RankIcon = v.rankIcon
              const visualSrc = prize.imageBack ?? prize.image
              const isActive = i === index
              return (
                <motion.article
                  key={prize.rank}
                  initial={reducedMotion ? false : { opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                  animate={
                    reducedMotion
                      ? undefined
                      : { scale: isActive ? 1 : 0.97, opacity: isActive ? 1 : 0.88 }
                  }
                  className="relative grid w-[min(calc(100vw-2.5rem),64rem)] shrink-0 grid-rows-[auto_1fr] gap-10 rounded-[2.75rem] border border-border/80 bg-card p-10 md:min-h-[640px] md:grid-cols-[1.05fr_0.95fr] md:grid-rows-1 md:gap-12 md:p-12 lg:min-h-[700px] lg:p-14"
                >
                  <div className="col-span-full flex items-start justify-between md:col-span-2">
                    <span className="page-eyebrow inline-flex items-center gap-2 !text-xs text-muted-foreground">
                      <RankIcon className="size-3.5" />
                      {prize.place}
                    </span>
                    <span className="font-sans text-6xl font-semibold leading-none text-foreground/15 md:text-7xl">
                      {String(prize.rank).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="relative flex min-h-[18rem] items-center justify-center md:min-h-[24rem]">
                    {visualSrc ? (
                      <motion.div
                        className="relative aspect-square w-full max-w-[26rem] md:max-w-[30rem] lg:max-w-[34rem]"
                        animate={
                          reducedMotion || !isActive
                            ? undefined
                            : { y: [0, -10, 0] }
                        }
                        transition={
                          reducedMotion || !isActive
                            ? undefined
                            : { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }
                      >
                        <img
                          src={visualSrc}
                          alt={prize.imageAlt}
                          loading="lazy"
                          className="h-full w-full object-contain"
                        />
                      </motion.div>
                    ) : (
                      <div className="flex size-36 items-center justify-center rounded-[2rem] border border-border/80 text-muted-foreground md:size-44">
                        <Icon className="size-16 md:size-20" strokeWidth={1.3} />
                      </div>
                    )}
                  </div>

                  <div className="flex min-w-0 flex-col justify-center md:pr-2">
                    <p className="page-eyebrow !text-xs text-muted-foreground">{prize.tag}</p>
                    <h3 className="mt-4 font-sans text-4xl font-semibold leading-[1.05] tracking-[0.035em] text-foreground md:text-5xl lg:text-6xl">
                      {prize.name}
                    </h3>
                    <p className="page-body mt-5 !text-base md:!text-lg">
                      {prize.detail}
                    </p>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </FadeIn>

      <div className="apple-section-shell mt-10 flex items-center justify-end gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {prizes.items.map((prize, i) => (
              <button
                key={prize.rank}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to ${prize.place}`}
                className="relative flex h-2 items-center"
              >
                {i === index ? (
                  <motion.span
                    layoutId="prize-indicator"
                    className="block h-2 w-8 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                ) : (
                  <span className="block h-2 w-2 rounded-full bg-foreground/25 transition-opacity hover:bg-foreground/40" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label="Previous prize"
              whileTap={reducedMotion ? undefined : { scale: 0.92 }}
              className="inline-flex size-11 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronLeft className="size-5" />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={index === count - 1}
              aria-label="Next prize"
              whileTap={reducedMotion ? undefined : { scale: 0.92 }}
              className="inline-flex size-11 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronRight className="size-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </Section>
  )
}
