import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { content } from "@/content"
import FadeIn from "@/components/effects/FadeIn"
import Footer from "@/components/Footer"
import Section from "@/components/apple/Section"
import SectionHeading from "@/components/apple/SectionHeading"
import { buttonVariants } from "@/components/ui/button"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

export default function RegisterCTA() {
  const { registerCta } = content
  const reducedMotion = useReducedMotion()

  return (
    <Section id="register" className="!pb-0" theme="dark">
      <div className="flex flex-col items-center gap-10 pb-16 text-center md:pb-24 lg:pb-32">
        <SectionHeading
          align="center"
          eyebrow="Join the next edition"
          title={registerCta.headline}
          description={registerCta.description}
          size="hero"
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

      <Footer embedded />
    </Section>
  )
}
