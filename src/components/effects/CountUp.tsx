import { useEffect, useRef, useState } from "react"
import { animate, useInView } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"

type CountUpProps = {
  value: string
  duration?: number
  className?: string
}

// Splits a value like "$10K" into prefix ("$"), number (10) and suffix ("K").
function parseValue(value: string) {
  const match = value.match(/-?\d[\d,.]*/)
  if (!match) {
    return { prefix: value, target: null, suffix: "", decimals: 0 }
  }
  const raw = match[0]
  const numeric = Number(raw.replace(/,/g, ""))
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0
  return {
    prefix: value.slice(0, match.index),
    target: Number.isNaN(numeric) ? null : numeric,
    suffix: value.slice((match.index ?? 0) + raw.length),
    decimals,
  }
}

export default function CountUp({ value, duration = 1.4, className }: CountUpProps) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const { prefix, target, suffix, decimals } = parseValue(value)
  const [display, setDisplay] = useState(target === null ? value : `${prefix}0${suffix}`)

  useEffect(() => {
    if (target === null) return
    if (reducedMotion || !inView) {
      if (reducedMotion) setDisplay(value)
      return
    }

    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplay(`${prefix}${latest.toFixed(decimals)}${suffix}`)
      },
    })

    return () => controls.stop()
  }, [inView, reducedMotion, target, prefix, suffix, decimals, duration, value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
