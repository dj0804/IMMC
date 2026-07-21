import { getImage } from '../data/images'

export const Icon = ({ name, className = '' }) => (
  <span className={`material-symbols-outlined ${className}`}>{name}</span>
)

/**
 * Image with a gradient fallback painted underneath. If the src 404s (the
 * Stitch URLs are temporary), the gradient shows instead of a broken icon.
 */
export function Photo({ imgKey, className = '', imgClassName = '', children }) {
  const { src, fallback, alt } = getImage(imgKey)
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: fallback }}>
      {src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`w-full h-full object-cover ${imgClassName}`}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      )}
      {children}
    </div>
  )
}

/**
 * Logo badge. The supplied logo is a mockup render with a baked-in grey
 * texture rather than a transparent asset, so we frame it as a deliberate
 * gold-bordered tile and zoom past the mockup's margin. Swap in a transparent
 * PNG later and only the `scale` below needs dropping.
 */
export function LogoMark({ size = 'h-8 w-8', className = '' }) {
  const { src, fallback, alt } = getImage('logo')
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded border border-electric-gold/60 ${size} ${className}`}
      style={{ background: fallback }}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover scale-[1.35]"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    </span>
  )
}

export function Button({ variant = 'primary', as = 'button', className = '', children, ...rest }) {
  const Tag = as
  const base =
    'inline-flex items-center justify-center gap-2 font-label-bold text-label-bold uppercase transition-all duration-150 rounded disabled:opacity-40 disabled:pointer-events-none'
  const variants = {
    primary:
      'bg-electric-gold text-void-black px-8 py-4 hover:scale-[0.98] active:scale-[0.96] shadow-[0_0_20px_rgba(255,219,23,0.3)]',
    secondary:
      'border-2 border-primary text-primary px-8 py-4 hover:bg-primary hover:text-void-black',
    ghost: 'text-secondary hover:text-electric-gold px-4 py-2',
    // Admin density: same gold, smaller footprint
    admin:
      'bg-electric-gold text-void-black px-4 py-2 text-xs hover:scale-[0.98] active:scale-[0.96]',
    adminGhost:
      'border border-surface-container-high text-secondary px-4 py-2 text-xs hover:border-electric-gold hover:text-electric-gold',
    danger:
      'border border-intensity-red/50 text-intensity-red px-4 py-2 text-xs hover:bg-intensity-red hover:text-void-black',
  }
  return (
    <Tag className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

export function Field({ label, error, children, hint }) {
  return (
    <label className="block">
      <span className="font-label-bold text-label-bold uppercase text-on-surface-variant block mb-2">
        {label}
      </span>
      {children}
      {hint && !error && <span className="text-label-sm text-secondary/60 mt-1 block">{hint}</span>}
      {error && <span className="text-label-sm text-intensity-red mt-1 block">{error}</span>}
    </label>
  )
}

// DESIGN.md input spec: void-black bg, charcoal border, gold on focus
export const inputClass =
  'w-full bg-void-black border border-surface-container-high rounded px-4 py-3 text-on-surface placeholder:text-primary/40 outline-none focus:border-electric-gold transition-colors'

export const Input = ({ className = '', ...p }) => (
  <input className={`${inputClass} ${className}`} {...p} />
)

export function Pill({ tone = 'neutral', children, className = '' }) {
  // Accent-to-status mapping (see plan's token translation)
  const tones = {
    active: 'bg-tertiary-fixed/15 text-tertiary-fixed border-tertiary-fixed/30',
    warn: 'bg-electric-gold/15 text-electric-gold border-electric-gold/30',
    danger: 'bg-intensity-red/15 text-intensity-red border-intensity-red/30',
    cancelled: 'bg-hyper-pink/15 text-hyper-pink border-hyper-pink/30',
    neutral: 'bg-surface-container-high text-secondary border-surface-bright',
  }
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-label-sm font-label-bold uppercase tracking-wider ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

export const statusTone = (status) =>
  ({
    Active: 'active',
    Paid: 'active',
    Converted: 'active',
    Excellent: 'active',
    Good: 'active',
    Expiring: 'warn',
    Pending: 'warn',
    'Trial Booked': 'warn',
    Fair: 'warn',
    Expired: 'danger',
    Overdue: 'danger',
    'Needs Service': 'danger',
    Lost: 'danger',
    Cancelled: 'cancelled',
    Refunded: 'cancelled',
    New: 'neutral',
    Contacted: 'neutral',
  })[status] ?? 'neutral'

export function Section({ id, className = '', children }) {
  return (
    <section
      id={id}
      className={`py-20 md:py-section-gap px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto ${className}`}
    >
      {children}
    </section>
  )
}

export function SectionHeading({ eyebrow, children, highlight, className = '' }) {
  return (
    <div className={className}>
      {eyebrow && (
        <span className="font-label-bold text-label-bold uppercase text-electric-gold block mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase italic text-primary">
        {highlight ? <span className="text-electric-gold">{highlight} </span> : null}
        {children}
      </h2>
    </div>
  )
}

export function Card({ className = '', children, ...rest }) {
  return (
    <div
      className={`bg-surface-charcoal border border-white/5 inner-glow rounded ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
