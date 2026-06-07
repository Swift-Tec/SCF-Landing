import { useRef } from "react"
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion"
import { content } from "@/content"
import FadeIn from "@/components/effects/FadeIn"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

type FooterProps = {
  embedded?: boolean
  className?: string
}

const WATERMARK_COLOR = "rgba(255,255,255,0.09)"

export default function Footer({ embedded = false, className }: FooterProps) {
  const { footer } = content
  const reducedMotion = useReducedMotion()
  const watermarkRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: watermarkRef,
    offset: ["start end", "end end"],
  })

  const yPercent = useTransform(scrollYProgress, [0, 1], [18, 8])
  const watermarkScale = useTransform(scrollYProgress, [0, 1], [1, 1.04])
  const watermarkTransform = useMotionTemplate`translateX(-50%) translateY(${yPercent}%) scale(${watermarkScale})`

  const contentBlock = (
    <div className="flex min-h-0 flex-1 flex-col">
      <FadeIn direction="up">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="page-body !text-sm !text-white">{footer.copyright}</p>
          <motion.a
            href={footer.privacy.href}
            className="page-body !text-sm !text-white transition-colors hover:!text-white/80"
            whileHover={reducedMotion ? undefined : { x: 2 }}
            transition={{ duration: 0.2 }}
          >
            {footer.privacy.label}
          </motion.a>
        </div>
      </FadeIn>

      <div className="min-h-[6rem] flex-1 md:min-h-[10rem] lg:min-h-[14rem] xl:min-h-[18rem]" aria-hidden />

      <div
        ref={watermarkRef}
        className="pointer-events-none relative -mx-6 h-[clamp(7rem,19vw,16rem)] shrink-0 md:-mx-10"
        aria-hidden
      >
        <motion.p
          className="absolute bottom-0 left-1/2 origin-bottom font-sans font-semibold leading-[0.82] tracking-[0.04em] whitespace-nowrap"
          style={{
            color: WATERMARK_COLOR,
            fontSize: "clamp(5.5rem,19vw,16rem)",
            transform: reducedMotion ? "translateX(-50%) translateY(18%)" : watermarkTransform,
          }}
        >
          {footer.watermark}
        </motion.p>
      </div>
    </div>
  )

  if (embedded) {
    return (
      <footer
        className={cn(
          "relative flex w-full min-h-0 flex-1 flex-col border-t border-border/80 pt-24 md:pt-32 lg:pt-40",
          className,
        )}
      >
        {contentBlock}
      </footer>
    )
  }

  return (
    <footer data-theme="dark" className={cn("relative border-t border-border/80 bg-[#1d1d1f] py-32 text-white md:py-40", className)}>
      <div className="apple-section-shell flex min-h-[50vh] flex-col">{contentBlock}</div>
    </footer>
  )
}
