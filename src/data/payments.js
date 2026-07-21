import { members } from './members'
import { packages, PT_ADDON } from './packages'

export const PAYMENT_METHODS = ['UPI', 'Cash', 'Card', 'Bank Transfer']
export const PAYMENT_STATUSES = ['Paid', 'Pending', 'Overdue', 'Refunded']

const priceOf = (id) => packages.find((p) => p.id === id)?.priceINR ?? 0
const iso = (d) => d.toISOString().slice(0, 10)

// Derive the ledger from members so the two never disagree, then add a spread
// of historical renewals so the dashboard revenue chart has six months of shape.
let n = 0
const nextId = () => `PAY-${String(++n).padStart(4, '0')}`

const primary = members.map((m, i) => ({
  id: nextId(),
  memberId: m.id,
  memberName: m.name,
  packageId: m.packageId,
  amountINR: priceOf(m.packageId) + (m.ptAddOn ? PT_ADDON.priceINR : 0),
  method: PAYMENT_METHODS[i % PAYMENT_METHODS.length],
  status: m.paymentStatus === 'Paid' ? 'Paid' : m.paymentStatus,
  date: m.startDate,
  note: m.ptAddOn ? 'Package + PT add-on' : 'Package',
}))

// Historical renewals spread across the last 6 months.
const historical = []
for (let monthsBack = 1; monthsBack <= 6; monthsBack++) {
  const count = 3 + ((monthsBack * 2) % 4) // 3–6 per month, varied
  for (let k = 0; k < count; k++) {
    const m = members[(monthsBack * 5 + k) % members.length]
    const d = new Date()
    d.setMonth(d.getMonth() - monthsBack)
    d.setDate(3 + k * 4)
    historical.push({
      id: nextId(),
      memberId: m.id,
      memberName: m.name,
      packageId: m.packageId,
      amountINR: priceOf(m.packageId),
      method: PAYMENT_METHODS[(monthsBack + k) % PAYMENT_METHODS.length],
      status: 'Paid',
      date: iso(d),
      note: 'Renewal',
    })
  }
}

export const payments = [...primary, ...historical].sort((a, b) => b.date.localeCompare(a.date))
