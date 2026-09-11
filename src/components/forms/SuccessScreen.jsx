import { Link } from 'react-router-dom'
import { MdCheckCircle } from 'react-icons/md'

const formatAmount = (amount) =>
  new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-NG', { day: '2-digit', month: 'long', year: 'numeric' })

export default function SuccessScreen({ amount, reference, date = new Date(), onDone, receiptTo }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-5 text-center py-8">
      <div className="w-20 h-20 rounded-full bg-success-bg flex items-center justify-center">
        <MdCheckCircle size={48} className="text-success" />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-headline-md text-text-primary">Payment Successful</h1>
        <span className="text-display-sm text-text-primary font-extrabold">₦{formatAmount(amount)}</span>
      </div>

      <div className="w-full bg-card rounded-lg p-4 flex flex-col gap-2.5 divide-y divide-border">
        <div className="flex items-center justify-between pb-2.5">
          <span className="text-body-sm text-text-secondary">Transaction Reference</span>
          <span className="text-body-sm text-text-primary font-semibold">{reference}</span>
        </div>
        <div className="flex items-center justify-between pt-2.5">
          <span className="text-body-sm text-text-secondary">Date</span>
          <span className="text-body-sm text-text-primary font-semibold">{formatDate(date)}</span>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 pt-2">
        {receiptTo && (
          <Link
            to={receiptTo}
            className="w-full h-12 rounded-md bg-tangerine-light hover:bg-tangerine-soft text-brand text-label-lg font-bold flex items-center justify-center transition-all"
          >
            View Receipt
          </Link>
        )}
        <button
          type="button"
          onClick={onDone}
          className="w-full h-12 rounded-md bg-brand hover:bg-brand-dark text-white text-label-lg font-bold flex items-center justify-center active:scale-95 transition-all"
        >
          Done
        </button>
      </div>
    </div>
  )
}