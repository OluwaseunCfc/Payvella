import { Link } from 'react-router-dom'
import { MdPhoneAndroid, MdWifi, MdBolt, MdTv } from 'react-icons/md'
import { mockTransactions } from '../../data/mockData'

const ICONS = {
  airtime: MdPhoneAndroid,
  data: MdWifi,
  electricity: MdBolt,
  cable: MdTv,
}

const STATUS_STYLES = {
  successful: 'bg-success-bg text-success',
  pending: 'bg-warning-bg text-warning',
  failed: 'bg-error-bg text-error',
}

const STATUS_LABELS = {
  successful: 'Successful',
  pending: 'Pending',
  failed: 'Failed',
}

const formatAmount = (amount) =>
  new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)

const formatDate = (isoString) => {
  const date = new Date(isoString)
  const isToday = new Date().toDateString() === date.toDateString()
  const time = date.toLocaleTimeString('en-NG', { hour: 'numeric', minute: '2-digit' })
  return isToday ? `Today, ${time}` : `${date.toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}`
}

export default function RecentTransactions({ transactions = mockTransactions }) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-title-lg text-text-primary">Recent Transactions</h2>
        <Link to="/transactions" className="text-label-md text-brand font-semibold">
          View All
        </Link>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-8 text-text-muted text-body-md">No transactions yet.</div>
      ) : (
        <div className="flex flex-col gap-2">
          {transactions.map((txn) => {
            const Icon = ICONS[txn.icon] || MdPhoneAndroid
            return (
              <Link
                key={txn.id}
                to={`/transactions/${txn.id}`}
                className="flex items-center justify-between gap-3 bg-card rounded-lg p-3 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-full bg-tangerine-light flex items-center justify-center text-brand shrink-0">
                    <Icon size={20} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-title-md text-text-primary truncate">{txn.title}</span>
                    <span className="text-body-sm text-text-secondary truncate">
                      {txn.subtitle} • {formatDate(txn.date)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end shrink-0 pl-2">
                  <span className="text-label-lg font-bold text-text-primary">-₦{formatAmount(txn.amount)}</span>
                  <span className={`text-label-sm px-2 py-0.5 rounded-full ${STATUS_STYLES[txn.status]}`}>
                    {STATUS_LABELS[txn.status]}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}