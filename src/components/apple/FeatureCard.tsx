import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import TiltCard from "@/components/effects/TiltCard"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

type FeatureCardProps = {
  icon: LucideIcon
  title: string
  description: string
  href?: string
  className?: string
  titleClassName?: string
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
  className,
  titleClassName,
}: FeatureCardProps) {
  const reducedMotion = useReducedMotion()

  const card = (
    <TiltCard className="h-full">
      <article
        className={cn(
          "flex h-full min-h-[260px] flex-col rounded-[2rem] border border-border/80 bg-card p-8 transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.12)] md:p-9",
          className,
        )}
      >
        <motion.div
          className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-border/80 text-muted-foreground"
          whileHover={reducedMotion ? undefined : { scale: 1.08, rotate: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        >
          <Icon className="size-6 stroke-[1.6]" aria-hidden />
        </motion.div>
        <h3
          className={cn(
            "mt-8 font-sans text-xl font-semibold leading-snug tracking-[0.035em] text-foreground md:text-2xl",
            titleClassName,
          )}
        >
          {title}
        </h3>
        <p className="mt-4 flex-1 font-sans text-base leading-relaxed text-muted-foreground md:text-[1.0625rem]">
          {description}
        </p>
      </article>
    </TiltCard>
  )

  if (href) {
    return (
      <a href={href} className="block h-full transition-opacity hover:opacity-90">
        {card}
      </a>
    )
  }

  return card
}
