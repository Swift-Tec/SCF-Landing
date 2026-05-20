import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
}

const offsets = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 30 },
  right: { x: -30 },
  none: {},
}

export default function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  ...props
}: FadeInProps) {
  const offset = offsets[direction]

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
