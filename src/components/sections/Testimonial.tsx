import { testimonial } from "@/lib/content";

export default function Testimonial() {
  return (
    <section className="border-y border-line px-6 py-[var(--section-y)]">
      <div className="mx-auto w-full max-w-4xl text-center">
        <figure>
          <blockquote className="display text-xl leading-snug text-ink sm:text-2xl lg:text-3xl">
            <p>&ldquo;{testimonial.quote}&rdquo;</p>
          </blockquote>
          <figcaption className="mt-10">
            <span className="block font-display text-base font-semibold text-ink">
              {testimonial.name}
            </span>
            <span className="eyebrow mt-2 block">{testimonial.role}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
