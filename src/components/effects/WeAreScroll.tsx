import { useMemo, useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { content } from "@/content"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const SWIFTTEC_ORANGE = "#FF9500"
const DARK_BG = "#1d1d1f"

const WORD_STEP_VH = 38
const FINAL_STEP_VH = 55

type ScrollWordProps = {
  word: string
  index: number
  wordCount: number
  scrollYProgress: MotionValue<number>
  wordSegment: number
  wordScrollPortion: number
}

function ScrollWord({
  word,
  index,
  wordCount,
  scrollYProgress,
  wordSegment,
  wordScrollPortion,
}: ScrollWordProps) {
  const fade = wordSegment * 0.14
  const start = index * wordSegment
  const isLast = index === wordCount - 1
  const end = isLast ? wordScrollPortion - fade * 0.25 : (index + 1) * wordSegment

  const opacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0, fade, end - fade, end]
      : [start, start + fade, end - fade, end],
    index === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0],
  )
  const y = useTransform(
    scrollYProgress,
    index === 0
      ? [0, fade, end - fade, end]
      : [start, start + fade, end - fade, end],
    index === 0 ? [0, 0, 0, -16] : [16, 0, 0, -16],
  )
  const display = useTransform(opacity, (value) =>
    value > 0.04 ? "flex" : "none",
  )

  return (
    <motion.span
      aria-hidden
      className="col-start-1 row-start-1 items-center justify-center text-foreground"
      style={{
        opacity,
        y,
        display,
        position: "absolute",
        inset: 0,
      }}
    >
      {word}
    </motion.span>
  )
}

function FinaleHeadline() {
  return (
    <h2
      className="page-display flex flex-wrap items-baseline justify-center gap-x-[0.28em] px-6 pt-6 text-center md:pt-8"
    >
      <span className="text-white">We are </span>
      <span style={{ color: SWIFTTEC_ORANGE }}>SwiftTec</span>
      <span className="text-white">!</span>
    </h2>
  )
}

function StaticFinale({
  photoSrc,
  photoAlt,
}: {
  photoSrc: string
  photoAlt: string
}) {
  return (
    <section
      id="we-are"
      data-theme="dark"
      className="flex min-h-[100dvh] items-center justify-center bg-[#1d1d1f] px-6 py-16 md:px-10"
    >
      <div className="flex w-full max-w-6xl flex-col">
        <img
          src={photoSrc}
          alt={photoAlt}
          className="aspect-[16/10] w-full rounded-[2rem] object-cover"
          style={{ maxHeight: "min(62vh, 680px)" }}
        />
        <FinaleHeadline />
      </div>
    </section>
  )
}

export default function WeAreScroll() {
  const { weAreScroll } = content
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  const wordCount = weAreScroll.words.length
  const sectionHeightVh = wordCount * WORD_STEP_VH + FINAL_STEP_VH
  const wordScrollPortion =
    (wordCount * WORD_STEP_VH) / sectionHeightVh
  const wordSegment = wordScrollPortion / wordCount

  const longestWord = useMemo(
    () =>
      weAreScroll.words.reduce(
        (longest, word) => (word.length > longest.length ? word : longest),
        "",
      ),
    [weAreScroll.words],
  )

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const finaleFade = (1 - wordScrollPortion) * 0.22
  const finaleStart = wordScrollPortion

  const backgroundColor = useTransform(
    scrollYProgress,
    [finaleStart, finaleStart + finaleFade * 0.8],
    ["#ffffff", DARK_BG],
  )

  const wordsLayerOpacity = useTransform(
    scrollYProgress,
    [finaleStart - finaleFade * 0.15, finaleStart + finaleFade * 0.1],
    [1, 0],
  )
  const wordsLayerDisplay = useTransform(wordsLayerOpacity, (value) =>
    value > 0.02 ? "flex" : "none",
  )

  const finaleLayerOpacity = useTransform(
    scrollYProgress,
    [finaleStart, finaleStart + finaleFade * 0.75, 1],
    [0, 1, 1],
  )
  const finaleLayerDisplay = useTransform(finaleLayerOpacity, (value) =>
    value > 0.02 ? "flex" : "none",
  )

  const finaleTextOpacity = useTransform(
    scrollYProgress,
    [finaleStart + finaleFade * 0.25, finaleStart + finaleFade * 0.85, 1],
    [0, 1, 1],
  )
  const finaleTextY = useTransform(
    scrollYProgress,
    [finaleStart + finaleFade * 0.25, finaleStart + finaleFade * 0.85, 1],
    [24, 0, 0],
  )

  if (reducedMotion) {
    return (
      <StaticFinale
        photoSrc={weAreScroll.photo}
        photoAlt={weAreScroll.photoAlt}
      />
    )
  }

  return (
    <section
      ref={containerRef}
      id="we-are"
      className="relative bg-white"
      style={{ height: `${sectionHeightVh}vh` }}
      aria-label="We are SwiftTec"
    >
      <motion.div
        className="sticky top-0 h-[100dvh] overflow-hidden"
        style={{ backgroundColor }}
      >
        {/* Word rotation — white background, no photo */}
        <motion.div
          className="absolute inset-0 items-center justify-center px-6 md:px-10"
          style={{ opacity: wordsLayerOpacity, display: wordsLayerDisplay }}
        >
          <h2 className="page-display text-center text-balance text-foreground">
            <span className="inline-flex items-baseline justify-center gap-x-[0.28em]">
              <span>We are</span>
              <span
                className="relative inline-grid align-baseline"
                style={{ overflow: "clip", overflowClipMargin: "0.18em" }}
              >
                <span className="invisible col-start-1 row-start-1" aria-hidden>
                  {longestWord}
                </span>
                {weAreScroll.words.map((word, index) => (
                  <ScrollWord
                    key={word}
                    word={word}
                    index={index}
                    wordCount={wordCount}
                    scrollYProgress={scrollYProgress}
                    wordSegment={wordSegment}
                    wordScrollPortion={wordScrollPortion}
                  />
                ))}
              </span>
            </span>
          </h2>
        </motion.div>

        {/* Finale — photo with headline below */}
        <motion.div
          className="absolute inset-0 items-center justify-center px-6 md:px-10"
          style={{ opacity: finaleLayerOpacity, display: finaleLayerDisplay }}
        >
          <div className="flex w-full max-w-6xl flex-col">
            <img
              src={weAreScroll.photo}
              alt={weAreScroll.photoAlt}
              className="w-full rounded-[2rem] object-cover"
              style={{
                maxHeight: "min(62vh, 680px)",
                aspectRatio: "16 / 10",
              }}
            />

            <motion.div
              style={{ opacity: finaleTextOpacity, y: finaleTextY }}
            >
              <FinaleHeadline />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
