import { motion } from "framer-motion"
import { tintColor, type SectionTint } from "@/lib/sectionTints"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

const EASE = [0.22, 1, 0.36, 1] as const

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
  titleClassName?: string
  size?: "default" | "hero"
  tint: SectionTint
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
  size = "default",
  tint,
}: SectionHeadingProps) {
  const reducedMotion = useReducedMotion()
  const color = tintColor(tint)
  const words = title.split(" ")

  return (
    <div
      className={cn(
        "max-w-5xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        reducedMotion ? (
          <p className="page-eyebrow text-muted-foreground">{eyebrow}</p>
        ) : (
          <motion.p
            className="page-eyebrow text-muted-foreground"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {eyebrow}
          </motion.p>
        )
      ) : null}

      <h2
        className={cn(
          "text-balance mt-4",
          size === "hero" ? "page-display" : "page-display-sm",
          titleClassName,
        )}
        style={{ color }}
      >
        {reducedMotion ? (
          title
        ) : (
          words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="inline-block mr-[0.22em] last:mr-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
            >
              {word}
            </motion.span>
          ))
        )}
      </h2>

      {description ? (
        reducedMotion ? (
          <p
            className={cn(
              "page-body mt-7 max-w-2xl",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        ) : (
          <motion.p
            className={cn(
              "page-body mt-7 max-w-2xl",
              align === "center" && "mx-auto",
            )}
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
          >
            {description}
          </motion.p>
        )
      ) : null}
    </div>
  )
}
