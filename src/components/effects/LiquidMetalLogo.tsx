import { LiquidMetal } from "@paper-design/shaders-react"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { content } from "@/content"
import { cn } from "@/lib/utils"

type LiquidMetalLogoProps = {
  className?: string
  size?: number
}

export default function LiquidMetalLogo({
  className,
  size = 180,
}: LiquidMetalLogoProps) {
  const reducedMotion = useReducedMotion()

  return (
    <div
      className={cn("relative mx-auto", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <LiquidMetal
        image={content.brand.logoWhite}
        colorBack="#0a0a0f"
        colorTint="#f97316"
        shape="none"
        repetition={2}
        softness={0.15}
        shiftRed={0.25}
        shiftBlue={0.25}
        distortion={0.08}
        contour={0.35}
        angle={70}
        speed={reducedMotion ? 0 : 0.8}
        scale={0.65}
        fit="contain"
        width={size}
        height={size}
      />
    </div>
  )
}
