import { useRef } from "react"
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion"
import { content } from "@/content"
import FadeIn from "@/components/effects/FadeIn"
import { sectionTints } from "@/lib/sectionTints"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

type FooterProps = {
  embedded?: boolean
  className?: string
}

export default function Footer({ embedded = false, className }: FooterProps) {
  const { footer } = content
  const footerColor = sectionTints.footer
  const reducedMotion = useReducedMotion()
  const watermarkRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: watermarkRef,
    offset: ["start end", "end end"],
  })

  const yPercent = useTransform(scrollYProgress, [0, 1], [18, 8])
  const watermarkScale = useTransform(scrollYProgress, [0, 1], [1, 1.04])
  const watermarkTransform = useMotionTemplate`translateY(${yPercent}%) scale(${watermarkScale})`

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
        className="pointer-events-none relative -mx-6 h-[clamp(6.5rem,18vw,11.5rem)] shrink-0 overflow-hidden md:-mx-10"
        aria-hidden
      >
        <motion.p
          className="absolute bottom-0 left-0 origin-bottom-left font-sans font-semibold leading-[0.82] tracking-[0.04em] whitespace-nowrap"
          style={{
            color: footerColor,
            fontSize: "clamp(5.5rem, 16vw, 13rem)",
            transform: reducedMotion ? "translateY(18%)" : watermarkTransform,
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
