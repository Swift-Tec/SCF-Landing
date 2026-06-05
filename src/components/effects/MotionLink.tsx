import { motion, type HTMLMotionProps } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"

type MotionLinkProps = HTMLMotionProps<"a"> & {
  href: string
}

export default function MotionLink({ children, href, ...props }: MotionLinkProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.a
      href={href}
      whileHover={reducedMotion ? undefined : { scale: 1.02 }}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.a>
  )
}
