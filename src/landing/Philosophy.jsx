import { useStore } from '../store/AppStore'
import { Icon, Photo, Section } from '../components/ui'

export function TrustBar() {
  const items = [
    ['location_on', 'Opposite Tiruvalam Road, near VIT'],
    ['group', 'Experienced Coaches'],
    ['fitness_center', 'Years of Transformation'],
  ]
  return (
    <div className="w-full bg-electric-gold py-3 px-margin-mobile">
      <div className="max-w-container-max mx-auto flex flex-wrap justify-center md:justify-between items-center gap-4 text-void-black font-label-bold uppercase text-xs md:text-sm">
        {items.map(([icon, label]) => (
          <div key={label} className="flex items-center gap-2">
            <Icon name={icon} className="text-[18px]" />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Philosophy() {
  const { content } = useStore()

  const heading = content.aboutHighlight
    ? content.aboutHeading.split(new RegExp(`(${escapeRe(content.aboutHighlight)})`, 'i'))
    : [content.aboutHeading]

  return (
    <Section id="philosophy">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase italic mb-6 text-primary">
            {heading.map((p, i) =>
              p.toLowerCase() === (content.aboutHighlight || '').toLowerCase() ? (
                <span key={i} className="text-electric-gold">
                  {p}
                </span>
              ) : (
                <span key={i}>{p}</span>
              )
            )}
          </h2>

          <p className="font-body-md text-secondary mb-8">{content.aboutBody}</p>

          <div className="space-y-6">
            {content.principles.map((p) => (
              <div key={p.n} className="flex gap-4 items-start">
                <div className="text-electric-gold font-display-xl text-[40px] leading-none opacity-50 italic">
                  {p.n}
                </div>
                <div>
                  <h3 className="font-headline-md text-xl mb-1 uppercase text-primary">{p.title}</h3>
                  <p className="text-secondary text-sm">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Photo
          imgKey="philosophy"
          className="h-[400px] md:h-[600px] w-full bg-surface-charcoal inner-glow rounded md:clip-slant"
          imgClassName="opacity-80 mix-blend-luminosity"
        />
      </div>
    </Section>
  )
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
