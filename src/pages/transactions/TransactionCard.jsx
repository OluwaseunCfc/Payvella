import { Link } from 'react-router-dom'
import { MdPhoneAndroid, MdWifi, MdBolt, MdTv, MdSportsSoccer, MdSchool, MdAccountBalanceWallet } from 'react-icons/md'

const ICONS = {
  airtime: MdPhoneAndroid,
  data: MdWifi,
  electricity: MdBolt,
  cable: MdTv,
  betting: MdSportsSoccer,
  exam_pin: MdSchool,
  wallet_funding: MdAccountBalanceWallet,
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
  return isToday ? `Today, ${time}` : date.toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })
}

export default function TransactionCard({ transaction }) {
  const Icon = ICONS[transaction.category] || MdAccountBalanceWallet
  const isCredit = !!transaction.isCredit

  return (
    <Link
      to={`/transactions/${transaction.id}`}
      className="flex items-center justify-between gap-3 bg-card rounded-lg p-3 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
            isCredit ? 'bg-tangerine-light text-brand' : 'bg-border/40 text-text-secondary'
          }`}
        >
          <Icon size={20} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-title-md text-text-primary truncate">{transaction.title}</span>
          <span className="text-body-sm text-text-secondary truncate">
            {transaction.subtitle} • {formatDate(transaction.date)}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end shrink-0 pl-2">
        <span className={`text-label-lg font-bold ${isCredit ? 'text-brand' : 'text-text-primary'}`}>
          {isCredit ? '+' : '-'}₦{formatAmount(transaction.amount)}
        </span>
        <span className={`text-label-sm px-2 py-0.5 rounded-full ${STATUS_STYLES[transaction.status]}`}>
          {STATUS_LABELS[transaction.status]}
        </span>
      </div>
    </Link>
  )
}