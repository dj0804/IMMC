import { useState } from 'react'
import Nav from './Nav'
import Hero from './Hero'
import Philosophy, { TrustBar } from './Philosophy'
import Facilities from './Facilities'
import Coaches from './Coaches'
import Memberships from './Memberships'
import Testimonials, { CTABand } from './Testimonials'
import Location from './Location'
import Footer from './Footer'
import RegistrationFlow from './RegistrationFlow'

export default function Landing() {
  const [reg, setReg] = useState({ open: false, initial: {} })

  const openReg = (packageId = 'quarterly', extra = {}) =>
    setReg({ open: true, initial: { packageId, ...extra } })

  return (
    <div className="overflow-x-hidden">
      <Nav onJoin={() => openReg('trial')} />
      <Hero onJoin={() => openReg('trial')} />
      <TrustBar />
      <Philosophy />
      <Facilities />
      <Coaches />
      <Memberships onSelect={openReg} />
      <Testimonials />
      <CTABand onJoin={() => openReg('trial')} />
      <Location />
      <Footer />

      <RegistrationFlow
        open={reg.open}
        initial={reg.initial}
        onClose={() => setReg({ open: false, initial: {} })}
      />
    </div>
  )
}
