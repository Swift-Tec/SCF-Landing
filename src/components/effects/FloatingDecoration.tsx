import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

type FloatingDecorationProps = {
  src: string
  className?: string
  y?: number
  rotate?: number
  duration?: number
  delay?: number
}

export default function FloatingDecoration({
  src,
  className,
  y = 10,
  rotate = 4,
  duration = 5.5,
  delay = 0,
}: FloatingDecorationProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return (
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className={cn("pointer-events-none select-none", className)}
      />
    )
  }

  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -y, 0],
        rotate: [0, rotate, -rotate * 0.5, 0],
      }}
      transition={{
        opacity: { duration: 0.7, delay },
        scale: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay: delay + 0.8 },
        rotate: {
          duration: duration * 1.15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 1,
        },
      }}
      className={cn("pointer-events-none select-none", className)}
    />
  )
}
