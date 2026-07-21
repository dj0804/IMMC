import { useMemo, useState } from 'react'
import { useStore } from '../store/AppStore'
import { formatINR } from '../data/packages'
import { MEMBER_STATUSES } from '../data/members'
import { Icon, Pill, statusTone, Button } from '../components/ui'
import { PageHeader, Panel, Table, Td, Tr, AInput, ASelect, EmptyState, ALabel } from './adminUi'

export default function Members() {
  const { members, packages, updateMember } = useStore()
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('All')
  const [pkg, setPkg] = useState('All')
  const [open, setOpen] = useState(null)

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return members.filter((m) => {
      if (status !== 'All' && m.status !== status) return false
      if (pkg !== 'All' && m.packageId !== pkg) return false
      if (!needle) return true
      return (
        m.name.toLowerCase().includes(needle) ||
        m.id.toLowerCase().includes(needle) ||
        m.phone.includes(needle)
      )
    })
  }, [members, q, status, pkg])

  const nameOf = (id) => packages.find((p) => p.id === id)?.name ?? id
  const member = members.find((m) => m.id === open)

  return (
    <div>
      <PageHeader title="Members" subtitle={`${rows.length} of ${members.length} shown`} />

      <Panel className="p-4 mb-4">
        <div className="grid md:grid-cols-[1fr_auto_auto] gap-3">
          <div>
            <ALabel>Search</ALabel>
            <div className="relative">
              <Icon
                name="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/50 text-[18px]"
              />
              <AInput
                className="pl-10"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Name, membership ID, or phone"
              />
            </div>
          </div>
          <div>
            <ALabel>Status</ALabel>
            <ASelect value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>All</option>
              {MEMBER_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </ASelect>
          </div>
          <div>
            <ALabel>Package</ALabel>
            <ASelect value={pkg} onChange={(e) => setPkg(e.target.value)}>
              <option value="All">All</option>
              {packages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </ASelect>
          </div>
        </div>
      </Panel>

      <Panel className="overflow-hidden">
        {rows.length === 0 ? (
          <EmptyState>No members match those filters</EmptyState>
        ) : (
          <Table head={['Member', 'Package', 'Valid until', 'Payment', 'Status', '']}>
            {rows.map((m) => (
              <Tr key={m.id}>
                <Td>
                  <span className="text-on-surface block">{m.name}</span>
                  <span className="font-label-sm text-secondary/60">
                    {m.id} · {m.phone}
                  </span>
                </Td>
                <Td>
                  <span className="text-on-surface">{nameOf(m.packageId)}</span>
                  {m.ptAddOn && (
                    <span className="font-label-sm text-electric-gold block">+ PT</span>
                  )}
                </Td>
                <Td className="text-secondary whitespace-nowrap">{m.endDate}</Td>
                <Td>
                  <Pill tone={statusTone(m.paymentStatus)}>{m.paymentStatus}</Pill>
                </Td>
                <Td>
                  <Pill tone={statusTone(m.status)}>{m.status}</Pill>
                </Td>
                <Td className="text-right">
                  <button
                    onClick={() => setOpen(m.id)}
                    className="font-label-bold text-label-sm uppercase text-electric-gold hover:underline underline-offset-4 whitespace-nowrap"
                  >
                    Manage
                  </button>
                </Td>
              </Tr>
            ))}
          </Table>
        )}
      </Panel>

      {member && (
        <Drawer member={member} packages={packages} onClose={() => setOpen(null)} onChange={updateMember} />
      )}
    </div>
  )
}

function Drawer({ member, packages, onClose, onChange }) {
  const pkg = packages.find((p) => p.id === member.packageId)

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-void-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-surface-charcoal border-l border-white/10 h-full overflow-y-auto">
        <div className="sticky top-0 bg-surface-charcoal border-b border-surface-container-high px-6 py-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-headline-md text-xl uppercase text-primary">{member.name}</h2>
            <span className="font-label-sm text-secondary/60">{member.id}</span>
          </div>
          <button onClick={onClose} className="text-secondary hover:text-electric-gold">
            <Icon name="close" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Row label="Phone" value={member.phone} />
            <Row label="Email" value={member.email} />
            <Row label="Package" value={`${pkg?.name} · ${pkg?.durationLabel}`} />
            <Row label="Value" value={formatINR(pkg?.priceINR ?? 0)} />
            <Row label="Started" value={member.startDate} />
            <Row label="Valid until" value={member.endDate} />
            <Row label="Personal training" value={member.ptAddOn ? 'Yes' : 'No'} />
            <Row label="Student rate" value={member.isStudent ? 'Yes' : 'No'} />
            <Row label="Joined via" value={member.joinedVia} />
            <Row
              label="Health declaration"
              value={member.healthDeclared ? 'Signed' : 'Outstanding'}
            />
          </div>

          <div>
            <ALabel>Membership status</ALabel>
            <div className="flex flex-wrap gap-2">
              {MEMBER_STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => onChange(member.id, { status: s })}
                  className={`font-label-bold text-label-sm uppercase px-3 py-2 rounded border transition-colors ${
                    member.status === s
                      ? 'bg-electric-gold text-void-black border-electric-gold'
                      : 'border-surface-container-high text-secondary hover:border-electric-gold hover:text-electric-gold'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <ALabel>Payment status</ALabel>
            <div className="flex flex-wrap gap-2">
              {['Paid', 'Pending', 'Overdue'].map((s) => (
                <button
                  key={s}
                  onClick={() => onChange(member.id, { paymentStatus: s })}
                  className={`font-label-bold text-label-sm uppercase px-3 py-2 rounded border transition-colors ${
                    member.paymentStatus === s
                      ? 'bg-electric-gold text-void-black border-electric-gold'
                      : 'border-surface-container-high text-secondary hover:border-electric-gold hover:text-electric-gold'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-surface-container-high space-y-3">
            <Button
              variant="adminGhost"
              className="w-full justify-center"
              onClick={() => {
                const end = new Date(member.endDate)
                end.setMonth(end.getMonth() + (pkg?.durationMonths || 1))
                onChange(member.id, { endDate: end.toISOString().slice(0, 10), status: 'Active' })
              }}
            >
              <Icon name="autorenew" className="text-[18px]" />
              Renew for another {pkg?.durationLabel ?? 'term'}
            </Button>

            {member.status !== 'Cancelled' && (
              <Button
                variant="danger"
                className="w-full justify-center"
                onClick={() => onChange(member.id, { status: 'Cancelled' })}
              >
                <Icon name="person_remove" className="text-[18px]" />
                Cancel membership
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-surface-container-high/50">
      <span className="font-label-sm uppercase tracking-wider text-on-surface-variant">{label}</span>
      <span className="text-table-cell text-on-surface text-right">{value}</span>
    </div>
  )
}
