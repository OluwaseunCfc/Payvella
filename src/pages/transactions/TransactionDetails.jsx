import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  MdArrowBack,
  MdPhoneAndroid,
  MdWifi,
  MdBolt,
  MdTv,
  MdSportsSoccer,
  MdSchool,
  MdAccountBalanceWallet,
  MdCheckCircle,
  MdSchedule,
  MdCancel,
  MdReceiptLong,
  MdSupportAgent,
} from 'react-icons/md'
import { mockTransactions } from '../../data/mockData'

const ICONS = {
  airtime: MdPhoneAndroid,
  data: MdWifi,
  electricity: MdBolt,
  cable: MdTv,
  betting: MdSportsSoccer,
  exam_pin: MdSchool,
  wallet_funding: MdAccountBalanceWallet,
}

const STATUS_CONFIG = {
  successful: { icon: MdCheckCircle, color: 'text-success', bg: 'bg-success-bg', label: 'Successful' },
  pending: { icon: MdSchedule, color: 'text-warning', bg: 'bg-warning-bg', label: 'Pending' },
  failed: { icon: MdCancel, color: 'text-error', bg: 'bg-error-bg', label: 'Failed' },
}

const formatMoney = (num) =>
  new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)

const formatFullDate = (isoString) =>
  new Date(isoString).toLocaleString('en-NG', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

export default function TransactionDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const transaction = mockTransactions.find((txn) => txn.id === id)

  if (!transaction) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 gap-3 text-center py-12">
        <span className="text-headline-md">🔍</span>
        <p className="text-title-md text-text-primary">Transaction not found</p>
        <button
          type="button"
          onClick={() => navigate('/transactions')}
          className="text-body-sm text-brand font-semibold"
        >
          Back to Transaction History
        </button>
      </div>
    )
  }

  const Icon = ICONS[transaction.category] || MdAccountBalanceWallet
  const statusConfig = STATUS_CONFIG[transaction.status]
  const StatusIcon = statusConfig.icon
  const isCredit = !!transaction.isCredit
  const total = transaction.amount + (transaction.fee || 0)

  return (
    <div className="flex flex-col gap-4 pb-4">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-text-secondary self-start"
      >
        <MdArrowBack size={18} />
        <span className="text-label-md">Back</span>
      </button>

      {/* Status summary */}
      <div className="flex flex-col items-center gap-3 py-4">
        <div className={`w-16 h-16 rounded-full ${statusConfig.bg} flex items-center justify-center`}>
          <Icon size={28} className={statusConfig.color} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className={`text-label-md px-2.5 py-1 rounded-full ${statusConfig.bg} ${statusConfig.color} flex items-center gap-1`}>
            <StatusIcon size={14} />
            {statusConfig.label}
          </span>
          <span className={`text-display-sm font-extrabold ${isCredit ? 'text-brand' : 'text-text-primary'}`}>
            {isCredit ? '+' : '-'}₦{formatMoney(transaction.amount)}
          </span>
          <span className="text-body-sm text-text-secondary">{transaction.title}</span>
        </div>
      </div>

      {/* Details card */}
      <section className="bg-card rounded-lg p-4 flex flex-col divide-y divide-border">
        <div className="flex items-center justify-between py-2.5">
          <span className="text-body-sm text-text-secondary">Transaction Reference</span>
          <span className="text-body-sm text-text-primary font-semibold">{transaction.id}</span>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <span className="text-body-sm text-text-secondary">Date & Time</span>
          <span className="text-body-sm text-text-primary font-semibold">{formatFullDate(transaction.date)}</span>
        </div>
        {transaction.network && (
          <div className="flex items-center justify-between py-2.5">
            <span className="text-body-sm text-text-secondary">Provider</span>
            <span className="text-body-sm text-text-primary font-semibold">{transaction.network}</span>
          </div>
        )}
        {transaction.recipient && (
          <div className="flex items-center justify-between py-2.5">
            <span className="text-body-sm text-text-secondary">Recipient</span>
            <span className="text-body-sm text-text-primary font-semibold">{transaction.recipient}</span>
          </div>
        )}
        <div className="flex items-center justify-between py-2.5">
          <span className="text-body-sm text-text-secondary">Payment Method</span>
          <span className="text-body-sm text-text-primary font-semibold">{transaction.paymentMethod}</span>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <span className="text-body-sm text-text-secondary">Transaction Fee</span>
          <span className="text-body-sm text-text-primary font-semibold">
            {transaction.fee ? `₦${formatMoney(transaction.fee)}` : 'Free'}
          </span>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <span className="text-title-md text-text-primary font-semibold">Total</span>
          <span className="text-title-md text-text-primary font-bold">₦{formatMoney(total)}</span>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Link
          to={`/transactions/${transaction.id}/receipt`}
          className="w-full h-12 rounded-md bg-brand hover:bg-brand-dark text-white text-label-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <MdReceiptLong size={18} />
          <span>View Receipt</span>
        </Link>
        {transaction.status === 'failed' && (
          <Link
            to="/help"
            className="w-full h-12 rounded-md bg-tangerine-light hover:bg-tangerine-soft text-brand text-label-lg font-bold flex items-center justify-center gap-2 transition-all"
          >
            <MdSupportAgent size={18} />
            <span>Get Help With This Transaction</span>
          </Link>
        )}
      </div>
    </div>
  )
}