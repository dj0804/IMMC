import { useMemo, useState } from 'react'
import { useStore } from '../store/AppStore'
import { LEAD_STATUSES } from '../data/leads'
import { Icon, Pill, statusTone } from '../components/ui'
import { PageHeader, Panel, Table, Td, Tr, AInput, ASelect, EmptyState, ALabel } from './adminUi'

export default function Leads() {
  const { leads, packages, updateLead } = useStore()
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('All')

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return leads.filter((l) => {
      if (status !== 'All' && l.status !== status) return false
      if (!needle) return true
      return l.name.toLowerCase().includes(needle) || l.phone.includes(needle)
    })
  }, [leads, q, status])

  const counts = LEAD_STATUSES.map((s) => ({
    status: s,
    n: leads.filter((l) => l.status === s).length,
  }))

  const interestOf = (id) => packages.find((p) => p.id === id)?.name ?? '—'

  return (
    <div>
      <PageHeader title="Leads & Enquiries" subtitle={`${leads.length} in the pipeline`} />

      {/* Pipeline summary doubles as a filter */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        {counts.map((c) => (
          <button
            key={c.status}
            onClick={() => setStatus(status === c.status ? 'All' : c.status)}
            className={`text-left p-4 rounded border transition-colors ${
              status === c.status
                ? 'border-electric-gold bg-electric-gold/5'
                : 'border-white/5 bg-surface-charcoal hover:border-electric-gold/40'
            }`}
          >
            <span className="font-headline-md text-2xl text-primary block leading-none mb-1">
              {c.n}
            </span>
            <span className="font-label-sm uppercase tracking-wider text-on-surface-variant">
              {c.status}
            </span>
          </button>
        ))}
      </div>

      <Panel className="p-4 mb-4">
        <div className="grid md:grid-cols-[1fr_auto] gap-3">
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
                placeholder="Name or phone"
              />
            </div>
          </div>
          <div>
            <ALabel>Status</ALabel>
            <ASelect value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>All</option>
              {LEAD_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </ASelect>
          </div>
        </div>
      </Panel>

      <Panel className="overflow-hidden">
        {rows.length === 0 ? (
          <EmptyState>No enquiries match</EmptyState>
        ) : (
          <Table head={['Enquiry', 'Source', 'Interested in', 'Notes', 'Status']}>
            {rows.map((l) => (
              <Tr key={l.id}>
                <Td>
                  <span className="text-on-surface block">{l.name}</span>
                  <span className="font-label-sm text-secondary/60">
                    {l.phone} · {l.createdAt}
                  </span>
                </Td>
                <Td>
                  <Pill tone="neutral">{l.source}</Pill>
                </Td>
                <Td className="text-secondary whitespace-nowrap">{interestOf(l.interest)}</Td>
                <Td className="text-secondary max-w-[280px]">{l.notes}</Td>
                <Td>
                  <select
                    value={l.status}
                    onChange={(e) => updateLead(l.id, { status: e.target.value })}
                    className="bg-void-black border border-surface-container-high rounded px-2 py-1.5 text-label-sm uppercase tracking-wider text-on-surface outline-none focus:border-electric-gold transition-colors"
                  >
                    {LEAD_STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <div className="mt-1.5">
                    <Pill tone={statusTone(l.status)}>{l.status}</Pill>
                  </div>
                </Td>
              </Tr>
            ))}
          </Table>
        )}
      </Panel>

      <p className="font-label-sm text-secondary/50 mt-4">
        Enquiries submitted through the landing page contact form arrive here automatically.
      </p>
    </div>
  )
}
