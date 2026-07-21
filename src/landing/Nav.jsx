import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Icon, LogoMark } from '../components/ui'

const LINKS = [
  ['#philosophy', 'Philosophy'],
  ['#facilities', 'Facilities'],
  ['#coaches', 'Coaches'],
  ['#memberships', 'Membership'],
  ['#contact', 'Contact'],
]

export default function Nav({ onJoin }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <nav className="sticky top-0 w-full bg-void-black/80 backdrop-blur-md z-50 border-b border-white/5">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <a
          className="font-headline-md text-headline-md font-black text-electric-gold italic tracking-tighter flex items-center gap-2"
          href="#top"
        >
          <LogoMark />
          IMMC
        </a>

        <div className="hidden md:flex items-center gap-gutter">
          {LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="font-label-bold text-label-bold text-secondary hover:text-electric-gold transition-colors duration-200 uppercase"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/admin"
            className="font-label-sm text-label-sm uppercase text-secondary/50 hover:text-secondary transition-colors"
            title="Staff portal"
          >
            Staff
          </Link>
          <button
            onClick={onJoin}
            className="bg-electric-gold text-void-black font-label-bold text-label-bold px-6 py-3 uppercase rounded hover:scale-95 transition-transform duration-150"
          >
            Join IMMC
          </button>
        </div>

        <button
          className="md:hidden text-electric-gold"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>

      {/* Mobile drawer — the original export had a dead hamburger */}
      {open && (
        <div className="md:hidden border-t border-white/5 bg-void-black px-margin-mobile py-6 flex flex-col gap-1">
          {LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="font-label-bold text-label-bold uppercase text-secondary hover:text-electric-gold py-3 border-b border-white/5"
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false)
              onJoin()
            }}
            className="mt-4 bg-electric-gold text-void-black font-label-bold text-label-bold px-6 py-4 uppercase rounded"
          >
            Join IMMC
          </button>
          <Link
            to="/admin"
            className="mt-3 text-center font-label-sm text-label-sm uppercase text-secondary/50 py-2"
          >
            Staff Portal
          </Link>
        </div>
      )}
    </nav>
  )
}
