import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { content } from "@/content"
import FadeIn from "@/components/effects/FadeIn"
import FloatingDecoration from "@/components/effects/FloatingDecoration"
import Footer from "@/components/Footer"
import SectionHeading from "@/components/apple/SectionHeading"
import { buttonVariants } from "@/components/ui/button"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"
import vectorCursor from "@/assets/photos/Vector.png"
import vectorHeart from "@/assets/photos/Vector-2.png"
import vectorMail from "@/assets/photos/Vector@2x-1.png"

export default function RegisterCTA() {
  const { registerCta } = content
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="register"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden border-t border-border/80 bg-background pt-20 md:pt-28"
    >
      <FloatingDecoration
        src={vectorCursor}
        className="absolute -top-8 -right-10 w-52 rotate-6 opacity-75 md:w-64 lg:w-72"
        y={11}
        delay={0.1}
      />
      <FloatingDecoration
        src={vectorHeart}
        className="absolute -bottom-10 -left-14 w-64 opacity-60 md:w-80 lg:w-96"
        y={9}
        rotate={-5}
        delay={0.3}
      />
      <FloatingDecoration
        src={vectorMail}
        className="absolute left-1/2 top-1/3 -translate-x-1/2 w-52 -rotate-12 opacity-50 md:w-64 lg:w-72"
        y={8}
        duration={6}
        delay={0.2}
      />
      <div className="apple-section-shell flex flex-1 flex-col">
        <div className="flex flex-col items-start gap-10 pb-16 md:pb-24 lg:pb-32">
          <SectionHeading
            eyebrow="Join the next edition"
            title={registerCta.headline}
            description={registerCta.description}
            size="hero"
            tint="register"
          />

          <FadeIn delay={0.2} direction="none">
            <motion.div
              whileHover={reducedMotion ? undefined : { scale: 1.02 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/register"
                className={cn(
                  buttonVariants({ variant: "cta", size: "lg" }),
                  "inline-flex items-center gap-3 rounded-full px-10 py-4 text-lg font-semibold",
                )}
              >
                Register your team
                <motion.span
                  aria-hidden
                  className="inline-flex"
                  initial={false}
                  whileHover={reducedMotion ? undefined : { x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <ArrowRight className="size-5" />
                </motion.span>
              </Link>
            </motion.div>
          </FadeIn>
        </div>

        <Footer embedded className="mt-auto shrink-0" />
      </div>
    </section>
  )
}
