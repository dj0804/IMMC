import { Link } from 'react-router-dom'
import { LogoMark } from '../components/ui'

export default function Footer() {
  return (
    <footer className="w-full bg-void-black border-t border-surface-charcoal py-16 md:py-20 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-gutter text-center md:text-left">
        <div className="font-headline-md text-headline-md font-black text-electric-gold flex items-center gap-2">
          <LogoMark className="opacity-60" />
          IMMC
        </div>

        <div className="font-body-md text-secondary text-sm">
          © {new Date().getFullYear()} IMMC Vellore. Mind-Muscle Connection.
        </div>

        <div className="flex flex-wrap justify-center gap-6 font-label-sm text-label-sm uppercase">
          <a className="text-secondary hover:text-electric-gold transition-all" href="#contact">
            Instagram
          </a>
          <a className="text-secondary hover:text-electric-gold transition-all" href="#contact">
            Privacy Policy
          </a>
          <a className="text-secondary hover:text-electric-gold transition-all" href="#contact">
            Terms of Service
          </a>
          <Link className="text-secondary hover:text-electric-gold transition-all" to="/admin">
            Staff Portal
          </Link>
        </div>
      </div>
    </footer>
  )
}
