import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type SectionProps = {
  id?: string
  children: ReactNode
  className?: string
  fullHeight?: boolean
  decoration?: ReactNode
  theme?: "light" | "dark"
}

export default function Section({
  id,
  children,
  className,
  fullHeight = true,
  decoration,
  theme,
}: SectionProps) {
  return (
    <section
      id={id}
      data-theme={theme}
      className={cn(
        "relative overflow-hidden bg-background",
        fullHeight && "flex min-h-[100dvh] flex-col justify-center",
        "py-20 md:py-28 lg:py-32",
        className,
      )}
    >
      {decoration}
      <div className="apple-section-shell">{children}</div>
    </section>
  )
}
