import { createContext, useContext, useMemo, useState } from 'react'
import { siteContent as seedContent } from '../data/content'
import { packages as seedPackages, PT_ADDON } from '../data/packages'
import { trainers as seedTrainers } from '../data/trainers'
import { equipment as seedEquipment } from '../data/equipment'
import { members as seedMembers } from '../data/members'
import { leads as seedLeads } from '../data/leads'
import { payments as seedPayments } from '../data/payments'

const AppCtx = createContext(null)

// In-memory only. Refreshing the page resets everything to seed — deliberate
// for a pitch demo; there is no backend and nothing is persisted.
export function AppStore({ children }) {
  const [content, setContent] = useState(seedContent)
  const [packages, setPackages] = useState(seedPackages)
  const [trainers, setTrainers] = useState(seedTrainers)
  const [equipment, setEquipment] = useState(seedEquipment)
  const [members, setMembers] = useState(seedMembers)
  const [leads, setLeads] = useState(seedLeads)
  const [payments, setPayments] = useState(seedPayments)
  const [staff, setStaff] = useState(null)

  const value = useMemo(() => {
    const patch = (setter) => (id, changes) =>
      setter((rows) => rows.map((r) => (r.id === id ? { ...r, ...changes } : r)))

    // Registration completes here. A member registered on the landing page
    // appears in the admin directory immediately — same array.
    const registerMember = (draft) => {
      const pkg = seedPackages.concat(packages).find((p) => p.id === draft.packageId)
      const seq = members.length + 1
      const id = `IMMC-${String(new Date().getFullYear()).slice(2)}-${String(seq).padStart(4, '0')}`
      const start = new Date()
      const end = new Date(start)
      end.setMonth(end.getMonth() + (draft.durationMonths ?? pkg?.durationMonths ?? 1))

      const base = pkg?.priceINR ?? 0
      const student = draft.isStudent ? Math.round(base * ((pkg?.studentDiscountPct ?? 0) / 100)) : 0
      const amount = base - student + (draft.ptAddOn ? PT_ADDON.priceINR : 0)

      const member = {
        id,
        name: draft.name,
        phone: draft.phone,
        email: draft.email,
        packageId: draft.packageId,
        durationMonths: draft.durationMonths ?? pkg?.durationMonths ?? 1,
        startDate: start.toISOString().slice(0, 10),
        endDate: end.toISOString().slice(0, 10),
        status: 'Active',
        ptAddOn: !!draft.ptAddOn,
        healthDeclared: true,
        paymentStatus: draft.method === 'Cash' ? 'Pending' : 'Paid',
        isStudent: !!draft.isStudent,
        joinedVia: 'Website',
      }

      setMembers((m) => [member, ...m])
      setPayments((p) => [
        {
          id: `PAY-${String(p.length + 1).padStart(4, '0')}`,
          memberId: id,
          memberName: draft.name,
          packageId: draft.packageId,
          amountINR: amount,
          method: draft.method,
          status: draft.method === 'Cash' ? 'Pending' : 'Paid',
          date: member.startDate,
          note: draft.ptAddOn ? 'New registration + PT add-on' : 'New registration',
        },
        ...p,
      ])
      return member
    }

    return {
      content,
      setContent,
      updateContent: (changes) => setContent((c) => ({ ...c, ...changes })),
      updateTestimonial: (id, changes) =>
        setContent((c) => ({
          ...c,
          testimonials: c.testimonials.map((t) => (t.id === id ? { ...t, ...changes } : t)),
        })),

      packages,
      updatePackage: patch(setPackages),

      trainers,
      updateTrainer: patch(setTrainers),

      equipment,
      updateEquipment: patch(setEquipment),

      members,
      updateMember: patch(setMembers),
      registerMember,

      leads,
      updateLead: patch(setLeads),
      addLead: (lead) =>
        setLeads((l) => [
          { id: `ld${l.length + 1}`, status: 'New', createdAt: new Date().toISOString().slice(0, 10), ...lead },
          ...l,
        ]),

      payments,
      updatePayment: patch(setPayments),

      staff,
      signIn: (username) => setStaff({ username, since: Date.now() }),
      signOut: () => setStaff(null),
    }
  }, [content, packages, trainers, equipment, members, leads, payments, staff])

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

export const useStore = () => {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error('useStore must be used inside <AppStore>')
  return ctx
}
