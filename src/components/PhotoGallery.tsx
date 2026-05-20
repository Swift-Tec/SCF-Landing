import { content } from "@/content"
import AnimatedPhoto from "@/components/effects/AnimatedPhoto"
import FadeIn from "@/components/effects/FadeIn"

export default function PhotoGallery() {
  const { gallery } = content

  return (
    <section id="gallery" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="max-w-2xl">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {gallery.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl lg:text-6xl">
            {gallery.title}
          </h2>
          <p className="mt-6 font-sans text-lg font-light text-muted-foreground">
            {gallery.description}
          </p>
        </FadeIn>

        <div className="mt-14 flex flex-col gap-10">
          <AnimatedPhoto
            src={gallery.featured.src}
            alt={gallery.featured.alt}
            caption={gallery.featured.caption}
            featured
          />

          <div className="grid gap-8 md:grid-cols-2">
            {gallery.photos.map((photo, index) => (
              <AnimatedPhoto
                key={photo.caption}
                src={photo.src}
                alt={photo.alt}
                caption={photo.caption}
                className={index === 0 ? "md:row-span-1" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
