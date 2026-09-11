const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'airtime', label: 'Airtime' },
  { id: 'data', label: 'Data' },
  { id: 'electricity', label: 'Electricity' },
  { id: 'cable', label: 'TV' },
  { id: 'betting', label: 'Betting' },
  { id: 'exam_pin', label: 'Exam PIN' },
  { id: 'wallet_funding', label: 'Wallet Funding' },
]

const STATUSES = [
  { id: 'all', label: 'All Status' },
  { id: 'successful', label: 'Successful' },
  { id: 'pending', label: 'Pending' },
  { id: 'failed', label: 'Failed' },
]

export default function TransactionFilters({ category, onCategoryChange, status, onStatusChange }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Category pills */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onCategoryChange(cat.id)}
            className={`shrink-0 px-3.5 py-2 rounded-full text-label-md transition-all ${
              category === cat.id
                ? 'bg-brand text-white font-semibold'
                : 'bg-card text-text-secondary shadow-sm hover:bg-border/40'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Status filter */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {STATUSES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onStatusChange(s.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-label-sm transition-all ${
              status === s.id
                ? 'bg-midnight text-white shadow-sm'
                : 'bg-border/40 text-text-secondary hover:bg-border/60'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}