import { useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Link } from "react-router-dom"
import { content } from "@/content"
import MotionLink from "@/components/effects/MotionLink"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/useReducedMotion"

export default function Navbar() {
  const reducedMotion = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24)
  })

  return (
    <motion.header
      initial={reducedMotion ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 rounded-full border transition-all duration-300",
        scrolled
          ? "border-border bg-background/85 py-2.5 shadow-lg backdrop-blur-xl"
          : "border-transparent bg-transparent py-3 shadow-none",
      )}
    >
      <div className="flex items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2.5">
          <span className="font-sans text-base font-semibold tracking-tight text-foreground">
            {content.brand.name}
          </span>
        </a>

        <motion.nav
          className="hidden items-center gap-8 md:flex"
          initial={reducedMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
          }}
        >
          {content.nav.map((item) => (
            <MotionLink
              key={item.href}
              href={item.href}
              variants={{
                hidden: { opacity: 0, y: -8 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans text-base font-normal text-[#515154] transition-colors hover:text-foreground"
            >
              {item.label}
            </MotionLink>
          ))}
        </motion.nav>

        <div className="flex items-center gap-2">
          <motion.div
            whileHover={reducedMotion ? undefined : { scale: 1.03 }}
            whileTap={reducedMotion ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              to="/register"
              className={cn(
                buttonVariants({ variant: "cta", size: "default" }),
                "rounded-full px-6 text-base font-semibold",
              )}
            >
              Register
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
