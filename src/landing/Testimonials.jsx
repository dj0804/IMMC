import { useStore } from '../store/AppStore'
import { getImage } from '../data/images'
import { Icon, Section, SectionHeading } from '../components/ui'

export default function Testimonials() {
  const { content } = useStore()

  return (
    <Section id="testimonials">
      <SectionHeading eyebrow="Members" highlight="Ask the floor," className="mb-12 max-w-3xl">
        not the brochure.
      </SectionHeading>

      <div className="grid md:grid-cols-3 gap-6">
        {content.testimonials.map((t) => (
          <figure
            key={t.id}
            className="bg-surface-charcoal border border-white/5 inner-glow rounded p-6 md:p-8 flex flex-col"
          >
            <Icon name="format_quote" className="text-electric-gold text-[40px] mb-4 opacity-60" />
            <blockquote className="font-body-md text-on-surface flex-1 mb-6">"{t.quote}"</blockquote>
            <figcaption className="pt-4 border-t border-surface-container-high/60">
              <span className="font-headline-md text-base uppercase italic text-primary block">
                {t.name}
              </span>
              <span className="font-label-sm text-label-sm uppercase text-secondary/60">
                {t.role}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}

export function CTABand({ onJoin }) {
  const img = getImage('ctaBand')
  return (
    <section className="relative w-full overflow-hidden" style={{ background: img.fallback }}>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity"
        style={{ backgroundImage: `url('${img.src}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-void-black via-void-black/85 to-void-black/60" />

      <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 md:py-28 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase italic text-primary mb-4">
            One session tells you <span className="text-electric-gold">everything.</span>
          </h2>
          <p className="font-body-lg text-secondary">
            ₹300, one day, full floor, a coach beside you. If it isn't for you, you've lost an
            afternoon.
          </p>
        </div>
        <button
          onClick={onJoin}
          className="shrink-0 bg-electric-gold text-void-black font-label-bold text-label-bold px-8 py-4 uppercase rounded hover:scale-95 transition-transform duration-150 shadow-[0_0_20px_rgba(255,219,23,0.3)]"
        >
          Book ₹300 Trial
        </button>
      </div>
    </section>
  )
}
