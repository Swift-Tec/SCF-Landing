import { GrainGradient } from "@paper-design/shaders-react"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

const COLORS = ["#f97316", "#6366f1", "#7c3aed", "#1e1b4b"]

type ShaderBackgroundProps = {
  className?: string
  opacity?: number
  speed?: number
}

export default function ShaderBackground({
  className,
  opacity = 0.55,
  speed = 0.25,
}: ShaderBackgroundProps) {
  const reducedMotion = useReducedMotion()

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <GrainGradient
        colors={COLORS}
        colorBack="#0a0a0f"
        softness={0.45}
        intensity={0.35}
        noise={0.35}
        shape="blob"
        speed={reducedMotion ? 0 : speed}
        style={{
          width: "100%",
          height: "100%",
          opacity,
        }}
      />
      <div className="absolute inset-0 bg-background/40" />
    </div>
  )
}
