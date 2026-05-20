import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type AnimatedPhotoProps = {
  src: string
  alt: string
  caption?: string
  className?: string
  imageClassName?: string
  featured?: boolean
}

export default function AnimatedPhoto({
  src,
  alt,
  caption,
  className,
  imageClassName,
  featured = false,
}: AnimatedPhotoProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("group", className)}
    >
      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-border bg-card",
          featured && "rounded-3xl",
        )}
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "aspect-[16/10] w-full object-cover",
            featured && "aspect-[21/9] md:aspect-[2.4/1]",
            imageClassName,
          )}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 font-sans text-xs font-medium uppercase tracking-[0.18em] text-primary">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  )
}
