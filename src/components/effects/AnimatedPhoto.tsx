import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

type AnimatedPhotoProps = {
  src: string
  alt: string
  caption?: string
  captionClassName?: string
  className?: string
  imageClassName?: string
  featured?: boolean
  delay?: number
  enterScale?: number
}

export default function AnimatedPhoto({
  src,
  alt,
  caption,
  captionClassName,
  className,
  imageClassName,
  featured = false,
  delay = 0,
  enterScale = 0.98,
}: AnimatedPhotoProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.figure
      initial={reducedMotion ? false : { opacity: 0, y: 32, scale: enterScale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <motion.div
        className={cn(
          "overflow-hidden rounded-[2rem] border border-border/60 bg-white",
          featured && "rounded-[2.25rem]",
        )}
        whileHover={reducedMotion ? undefined : { scale: 1.02 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn(
            "aspect-[16/10] w-full object-cover",
            featured && "aspect-[21/9] md:aspect-[2.4/1]",
            imageClassName,
          )}
          whileHover={reducedMotion ? undefined : { scale: 1.04 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
      {caption ? (
        <figcaption
          className={cn(
            "mt-4 font-sans text-2xl font-semibold text-brand",
            captionClassName,
          )}
        >
          {caption}
        </figcaption>
      ) : null}
    </motion.figure>
  )
}
