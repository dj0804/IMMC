import { useMemo, useState } from 'react'
import { useStore } from '../store/AppStore'
import { formatINR } from '../data/packages'
import { PAYMENT_METHODS, PAYMENT_STATUSES } from '../data/payments'
import { Icon, Pill, statusTone } from '../components/ui'
import { PageHeader, Panel, Table, Td, Tr, AInput, ASelect, EmptyState, ALabel, StatCard } from './adminUi'

export default function Payments() {
  const { payments, packages, updatePayment } = useStore()
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('All')
  const [method, setMethod] = useState('All')

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return payments.filter((p) => {
      if (status !== 'All' && p.status !== status) return false
      if (method !== 'All' && p.method !== method) return false
      if (!needle) return true
      return (
        p.memberName.toLowerCase().includes(needle) ||
        p.id.toLowerCase().includes(needle) ||
        p.memberId.toLowerCase().includes(needle)
      )
    })
  }, [payments, q, status, method])

  const collected = payments.filter((p) => p.status === 'Paid').reduce((s, p) => s + p.amountINR, 0)
  const outstanding = payments
    .filter((p) => p.status === 'Pending' || p.status === 'Overdue')
    .reduce((s, p) => s + p.amountINR, 0)
  const overdueCount = payments.filter((p) => p.status === 'Overdue').length

  const pkgName = (id) => packages.find((x) => x.id === id)?.name ?? id

  return (
    <div>
      <PageHeader
        title="Payments"
        subtitle={`${rows.length} of ${payments.length} transactions shown`}
      />

      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <StatCard label="Collected (all time)" value={formatINR(collected)} icon="check_circle" tone="cyan" />
        <StatCard label="Outstanding" value={formatINR(outstanding)} icon="schedule" tone="gold" />
        <StatCard label="Overdue accounts" value={overdueCount} icon="error" tone="red" />
      </div>

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
                placeholder="Member, membership ID, or payment ID"
              />
            </div>
          </div>
          <div>
            <ALabel>Status</ALabel>
            <ASelect value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>All</option>
              {PAYMENT_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </ASelect>
          </div>
          <div>
            <ALabel>Method</ALabel>
            <ASelect value={method} onChange={(e) => setMethod(e.target.value)}>
              <option>All</option>
              {PAYMENT_METHODS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </ASelect>
          </div>
        </div>
      </Panel>

      <Panel className="overflow-hidden">
        {rows.length === 0 ? (
          <EmptyState>No transactions match</EmptyState>
        ) : (
          <Table head={['Payment', 'Member', 'Package', 'Amount', 'Method', 'Date', 'Status']}>
            {rows.map((p) => (
              <Tr key={p.id}>
                <Td>
                  <span className="text-on-surface block">{p.id}</span>
                  <span className="font-label-sm text-secondary/60">{p.note}</span>
                </Td>
                <Td>
                  <span className="text-on-surface block">{p.memberName}</span>
                  <span className="font-label-sm text-secondary/60">{p.memberId}</span>
                </Td>
                <Td className="text-secondary whitespace-nowrap">{pkgName(p.packageId)}</Td>
                <Td className="text-on-surface whitespace-nowrap">{formatINR(p.amountINR)}</Td>
                <Td className="text-secondary whitespace-nowrap">{p.method}</Td>
                <Td className="text-secondary whitespace-nowrap">{p.date}</Td>
                <Td>
                  <select
                    value={p.status}
                    onChange={(e) => updatePayment(p.id, { status: e.target.value })}
                    className="bg-void-black border border-surface-container-high rounded px-2 py-1.5 text-label-sm uppercase tracking-wider text-on-surface outline-none focus:border-electric-gold transition-colors"
                  >
                    {PAYMENT_STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <div className="mt-1.5">
                    <Pill tone={statusTone(p.status)}>{p.status}</Pill>
                  </div>
                </Td>
              </Tr>
            ))}
          </Table>
        )}
      </Panel>
    </div>
  )
}
