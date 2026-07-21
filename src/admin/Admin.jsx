import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/AppStore'
import { Icon, LogoMark } from '../components/ui'
import Login from './Login'
import Dashboard from './Dashboard'
import Members from './Members'
import Leads from './Leads'
import Packages from './Packages'
import Trainers from './Trainers'
import Equipment from './Equipment'
import Payments from './Payments'
import SiteContent from './SiteContent'

const NAV = [
  ['dashboard', 'Overview', 'grid_view'],
  ['members', 'Members', 'group'],
  ['leads', 'Leads', 'person_add'],
  ['packages', 'Packages', 'sell'],
  ['trainers', 'Trainers', 'sports'],
  ['equipment', 'Equipment', 'fitness_center'],
  ['payments', 'Payments', 'payments'],
  ['content', 'Site Content', 'edit_note'],
]

const SCREENS = {
  dashboard: Dashboard,
  members: Members,
  leads: Leads,
  packages: Packages,
  trainers: Trainers,
  equipment: Equipment,
  payments: Payments,
  content: SiteContent,
}

export default function Admin() {
  const { staff, signOut, members, leads } = useStore()
  const [screen, setScreen] = useState('dashboard')
  const [navOpen, setNavOpen] = useState(false)

  if (!staff) return <Login />

  const Screen = SCREENS[screen]

  const badge = (key) => {
    if (key === 'leads') return leads.filter((l) => l.status === 'New').length || null
    if (key === 'members') return members.filter((m) => m.status === 'Expiring').length || null
    return null
  }

  const go = (key) => {
    setScreen(key)
    setNavOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between gap-4 bg-surface-charcoal border-b border-surface-container-high px-margin-mobile py-3">
        <div className="flex items-center gap-2">
          <LogoMark size="h-6 w-6" />
          <span className="font-headline-md text-lg font-black text-electric-gold italic tracking-tighter">
            IMMC
          </span>
          <span className="font-label-sm uppercase tracking-wider text-secondary/60">Staff</span>
        </div>
        <button onClick={() => setNavOpen((v) => !v)} className="text-electric-gold">
          <Icon name={navOpen ? 'close' : 'menu'} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          navOpen ? 'block' : 'hidden'
        } lg:block lg:sticky lg:top-0 lg:h-screen w-full lg:w-60 shrink-0 bg-surface-charcoal border-r border-surface-container-high flex-col`}
      >
        <div className="hidden lg:flex items-center gap-2 px-5 py-5 border-b border-surface-container-high">
          <LogoMark size="h-7 w-7" />
          <div className="min-w-0">
            <span className="font-headline-md text-lg font-black text-electric-gold italic tracking-tighter block leading-none">
              IMMC
            </span>
            <span className="font-label-sm uppercase tracking-wider text-secondary/60">
              Staff portal
            </span>
          </div>
        </div>

        <nav className="p-3 flex flex-col gap-1 lg:flex-1 lg:overflow-y-auto">
          {NAV.map(([key, label, icon]) => {
            const n = badge(key)
            return (
              <button
                key={key}
                onClick={() => go(key)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded font-label-bold text-label-sm uppercase tracking-wider transition-colors text-left ${
                  screen === key
                    ? 'bg-electric-gold text-void-black'
                    : 'text-secondary hover:bg-surface-container-high hover:text-primary'
                }`}
              >
                <Icon name={icon} className="text-[20px]" />
                <span className="flex-1">{label}</span>
                {n && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-label-sm ${
                      screen === key ? 'bg-void-black/20 text-void-black' : 'bg-intensity-red/20 text-intensity-red'
                    }`}
                  >
                    {n}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        <div className="p-3 border-t border-surface-container-high space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded font-label-bold text-label-sm uppercase tracking-wider text-secondary hover:bg-surface-container-high hover:text-primary transition-colors"
          >
            <Icon name="public" className="text-[20px]" />
            View site
          </Link>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded font-label-bold text-label-sm uppercase tracking-wider text-secondary hover:bg-surface-container-high hover:text-primary transition-colors"
          >
            <Icon name="logout" className="text-[20px]" />
            Sign out · {staff.username}
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 p-margin-mobile md:p-8 bg-void-black">
        <Screen go={go} />
      </main>
    </div>
  )
}
