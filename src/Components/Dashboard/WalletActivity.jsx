import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdArrowDownward, MdPhoneAndroid, MdCardGiftcard, MdTv } from 'react-icons/md'

const ICONS = {
  inflow: MdArrowDownward,
  airtime: MdPhoneAndroid,
  bonus: MdCardGiftcard,
  cable: MdTv,
}

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'inflow', label: 'Inflow' },
  { id: 'outflow', label: 'Outflow' },
]

const formatMoney = (num) =>
  new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)

export default function WalletActivity({ activity }) {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? activity : activity.filter((item) => item.type === filter)

  return (
    <section className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span className="text-title-md text-text-primary">Recent Wallet Activity</span>
        <Link to="/transactions" className="text-label-md text-brand font-semibold">
          View All
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1 rounded-full text-label-sm transition-colors ${
              filter === f.id ? 'bg-midnight text-white shadow-sm' : 'bg-border/40 text-text-secondary hover:bg-border/60'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-8 text-text-muted text-body-md">No activity in this category yet.</div>
      ) : (
        <div className="flex flex-col rounded-lg bg-card shadow-sm p-1.5">
          {filtered.map((item) => {
            const Icon = ICONS[item.icon] || MdArrowDownward
            const isInflow = item.type === 'inflow'
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-md hover:bg-bg transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      isInflow ? 'bg-tangerine-light text-brand' : 'bg-border/50 text-text-secondary'
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-title-md text-text-primary truncate">{item.title}</span>
                    <span className="text-body-sm text-text-secondary truncate">{item.date}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end shrink-0 gap-1">
                  <span className={`text-title-md font-extrabold ${isInflow ? 'text-brand' : 'text-text-primary'}`}>
                    {isInflow ? '+' : '-'}₦{formatMoney(item.amount)}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-success-bg text-success text-label-sm">Success</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}