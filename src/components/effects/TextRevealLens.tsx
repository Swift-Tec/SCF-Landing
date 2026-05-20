import { useRef } from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

type TextRevealLensProps = {
  text: string
  className?: string
}

export default function TextRevealLens({ text, className }: TextRevealLensProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const lensX = useMotionValue(50)
  const lensY = useMotionValue(50)

  const clipPath = useMotionTemplate`circle(130px at ${lensX}% ${lensY}%)`

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reducedMotion || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    lensX.set(((e.clientX - rect.left) / rect.width) * 100)
    lensY.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      className={cn("relative select-none py-8", className)}
    >
      <p className="font-display text-center text-5xl text-muted-foreground/35 md:text-7xl lg:text-8xl">
        {text}
      </p>

      {reducedMotion ? (
        <p className="absolute inset-0 flex items-center justify-center font-display text-5xl text-primary md:text-7xl lg:text-8xl">
          {text}
        </p>
      ) : (
        <motion.p
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-5xl text-foreground md:text-7xl lg:text-8xl"
          style={{ clipPath }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}
