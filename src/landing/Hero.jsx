import { useStore } from '../store/AppStore'
import { getImage } from '../data/images'
import { Icon } from '../components/ui'

const CHIPS = [
  ['schedule', '6AM–10PM, Mon–Sat'],
  ['person_play', '1:1 Floor Coaching'],
  ['confirmation_number', '₹300 Trial Day'],
]

export default function Hero({ onJoin }) {
  const { content } = useStore()
  const hero = getImage('hero')

  // Tagline is CMS-editable; we highlight the configured word in gold.
  const parts = content.taglineHighlight
    ? content.tagline.split(new RegExp(`(${content.taglineHighlight})`, 'i'))
    : [content.tagline]

  return (
    <header
      id="top"
      className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-void-black" style={{ background: hero.fallback }}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: `url('${hero.src}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void-black via-void-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-void-black via-void-black/50 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20">
        <div className="max-w-3xl">
          <h1 className="font-display-xl text-[44px] leading-[1.05] sm:text-[64px] md:text-display-xl lg:text-[100px] md:leading-none text-primary uppercase italic mb-6">
            {parts.map((p, i) =>
              p.toLowerCase() === (content.taglineHighlight || '').toLowerCase() ? (
                <span key={i} className="text-electric-gold">
                  {p}
                </span>
              ) : (
                <span key={i}>{p}</span>
              )
            )}
          </h1>

          <p className="font-body-lg text-body-lg text-secondary mb-10 max-w-xl">
            {content.heroSub}
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={onJoin}
              className="bg-electric-gold text-void-black font-label-bold text-label-bold px-8 py-4 uppercase rounded hover:scale-95 transition-transform duration-150 shadow-[0_0_20px_rgba(255,219,23,0.3)]"
            >
              Book ₹300 Trial
            </button>
            <a
              className="border-2 border-primary text-primary font-label-bold text-label-bold px-8 py-4 uppercase rounded hover:bg-primary hover:text-void-black transition-colors duration-150"
              href="#facilities"
            >
              Explore Facilities
            </a>
          </div>

          <div className="flex flex-wrap gap-3 md:gap-4 font-label-bold uppercase text-secondary">
            {CHIPS.map(([icon, label]) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-surface-charcoal/80 px-4 py-2 rounded border border-white/10 inner-glow text-xs md:text-sm"
              >
                <Icon name={icon} className="text-electric-gold text-[18px]" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
