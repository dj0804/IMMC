import { useMemo } from 'react'
import { useStore } from '../store/AppStore'
import { formatINR } from '../data/packages'
import { Icon, Pill, statusTone } from '../components/ui'
import { PageHeader, Panel, StatCard, Table, Td, Tr, EmptyState } from './adminUi'

export default function Dashboard({ go }) {
  const { members, leads, payments, equipment } = useStore()

  const stats = useMemo(() => {
    const active = members.filter((m) => m.status === 'Active').length
    const expiring = members.filter((m) => m.status === 'Expiring')
    const newLeads = leads.filter((l) => l.status === 'New').length
    const overdue = payments.filter((p) => p.status === 'Overdue')

    // Revenue for the current calendar month
    const thisMonth = new Date().toISOString().slice(0, 7)
    const mrr = payments
      .filter((p) => p.status === 'Paid' && p.date.startsWith(thisMonth))
      .reduce((s, p) => s + p.amountINR, 0)

    return { active, expiring, newLeads, overdue, mrr }
  }, [members, leads, payments])

  // Six-month revenue series for the chart
  const series = useMemo(() => {
    const out = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date()
      d.setDate(1)
      d.setMonth(d.getMonth() - i)
      const key = d.toISOString().slice(0, 7)
      const total = payments
        .filter((p) => p.status === 'Paid' && p.date.startsWith(key))
        .reduce((s, p) => s + p.amountINR, 0)
      out.push({ key, label: d.toLocaleString('en-IN', { month: 'short' }), total })
    }
    return out
  }, [payments])

  const peak = Math.max(...series.map((s) => s.total), 1)
  const flagged = equipment.filter((e) => e.flagged)

  return (
    <div>
      <PageHeader
        title="Overview"
        subtitle={`${members.length} members on record · ${new Date().toLocaleDateString('en-IN', {
          dateStyle: 'medium',
        })}`}
      />

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Active members" value={stats.active} icon="group" tone="cyan" sub={`${members.length} total`} />
        <StatCard
          label="Revenue this month"
          value={formatINR(stats.mrr)}
          icon="payments"
          tone="gold"
          sub="Paid transactions only"
        />
        <StatCard label="New leads" value={stats.newLeads} icon="person_add" tone="plain" sub={`${leads.length} in pipeline`} />
        <StatCard
          label="Needs attention"
          value={stats.expiring.length + stats.overdue.length}
          icon="warning"
          tone="red"
          sub={`${stats.expiring.length} expiring · ${stats.overdue.length} overdue`}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        {/* Revenue chart — hand-rolled bars, no chart library dependency */}
        <Panel className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-6">
            <span className="font-label-bold text-label-sm uppercase tracking-wider text-on-surface-variant">
              Revenue · last 6 months
            </span>
            <span className="font-label-sm text-label-sm text-secondary/60">Paid only</span>
          </div>

          <div className="flex items-end justify-between gap-2 h-48">
            {series.map((s) => (
              <div key={s.key} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="font-label-sm text-label-sm text-secondary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {formatINR(s.total)}
                </span>
                <div
                  className="w-full bg-electric-gold/80 hover:bg-electric-gold rounded-sm transition-colors min-h-[2px]"
                  style={{ height: `${(s.total / peak) * 100}%` }}
                  title={`${s.label}: ${formatINR(s.total)}`}
                />
                <span className="font-label-sm text-label-sm uppercase text-secondary/60">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-5">
          <span className="font-label-bold text-label-sm uppercase tracking-wider text-on-surface-variant block mb-4">
            Equipment flagged
          </span>
          {flagged.length === 0 ? (
            <EmptyState icon="check_circle">Nothing flagged</EmptyState>
          ) : (
            <ul className="space-y-3">
              {flagged.map((e) => (
                <li key={e.id} className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-table-cell text-on-surface block">{e.name}</span>
                    <span className="font-label-sm text-label-sm text-secondary/60 uppercase">
                      {e.zone.replace('-', ' ')}
                    </span>
                  </div>
                  <Pill tone={statusTone(e.condition)}>{e.condition}</Pill>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => go('equipment')}
            className="mt-5 font-label-bold text-label-sm uppercase text-electric-gold hover:underline underline-offset-4"
          >
            Manage inventory →
          </button>
        </Panel>
      </div>

      <Panel className="overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-4 py-4 border-b border-surface-container-high">
          <span className="font-label-bold text-label-sm uppercase tracking-wider text-on-surface-variant">
            Needs attention
          </span>
          <button
            onClick={() => go('members')}
            className="font-label-bold text-label-sm uppercase text-electric-gold hover:underline underline-offset-4"
          >
            All members →
          </button>
        </div>

        {stats.expiring.length + stats.overdue.length === 0 ? (
          <EmptyState icon="check_circle">All clear</EmptyState>
        ) : (
          <Table head={['Member', 'Issue', 'Detail', 'Status']}>
            {stats.expiring.map((m) => (
              <Tr key={`e-${m.id}`}>
                <Td>
                  <span className="text-on-surface block">{m.name}</span>
                  <span className="font-label-sm text-secondary/60">{m.id}</span>
                </Td>
                <Td>
                  <span className="flex items-center gap-2 text-secondary">
                    <Icon name="event_busy" className="text-electric-gold text-[18px]" />
                    Membership expiring
                  </span>
                </Td>
                <Td className="text-secondary">Ends {m.endDate}</Td>
                <Td>
                  <Pill tone={statusTone(m.status)}>{m.status}</Pill>
                </Td>
              </Tr>
            ))}
            {stats.overdue.map((p) => (
              <Tr key={`o-${p.id}`}>
                <Td>
                  <span className="text-on-surface block">{p.memberName}</span>
                  <span className="font-label-sm text-secondary/60">{p.memberId}</span>
                </Td>
                <Td>
                  <span className="flex items-center gap-2 text-secondary">
                    <Icon name="error" className="text-intensity-red text-[18px]" />
                    Payment overdue
                  </span>
                </Td>
                <Td className="text-secondary">
                  {formatINR(p.amountINR)} · due {p.date}
                </Td>
                <Td>
                  <Pill tone="danger">Overdue</Pill>
                </Td>
              </Tr>
            ))}
          </Table>
        )}
      </Panel>
    </div>
  )
}
