import { MdBackspace } from 'react-icons/md'

const QUICK_AMOUNTS = [100, 200, 500, 1000, 2000, 5000]

const formatMoney = (num) =>
  new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)

export default function AmountSelector({ value, onChange, min = 50, max = 50000, cashbackRate = 0.02 }) {
  const numericValue = parseFloat(value) || 0
  const cashback = numericValue * cashbackRate

  const handleInputChange = (e) => {
    const raw = e.target.value
    if (raw === '' || /^\d*\.?\d*$/.test(raw)) {
      onChange(raw)
    }
  }

  return (
    <section className="flex flex-col gap-2">
      <div className="bg-card rounded-lg p-3 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-label-md text-text-secondary">Recharge Amount</span>
          <span className="text-label-sm text-text-secondary">
            Min: ₦{min} • Max: ₦{max.toLocaleString('en-NG')}
          </span>
        </div>

        {/* Currency display input */}
        <div className="flex items-center justify-between bg-bg rounded-lg px-4 py-3 focus-within:shadow-md transition-all">
          <div className="flex items-baseline gap-1">
            <span className="text-headline-lg text-text-secondary font-bold opacity-80">₦</span>
            <input
              type="text"
              inputMode="numeric"
              value={value}
              onChange={handleInputChange}
              placeholder="0"
              className="w-40 bg-transparent text-display-sm text-text-primary font-extrabold focus:outline-none tracking-tight"
            />
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear amount"
            className="text-text-secondary hover:text-text-primary p-1"
          >
            <MdBackspace size={20} />
          </button>
        </div>

        {/* Quick amount grid */}
        <div className="grid grid-cols-3 gap-2">
          {QUICK_AMOUNTS.map((amt) => {
            const isActive = numericValue === amt
            return (
              <button
                key={amt}
                type="button"
                onClick={() => onChange(String(amt))}
                className={`py-3 px-2 rounded-lg text-label-lg transition-all flex flex-col items-center ${
                  isActive
                    ? 'bg-tangerine-light text-brand font-bold shadow-sm'
                    : 'bg-bg text-text-primary hover:bg-border/40'
                }`}
              >
                ₦{amt.toLocaleString('en-NG')}
              </button>
            )
          })}
        </div>

        {/* Cashback banner */}
        {cashbackRate > 0 && numericValue > 0 && (
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-md bg-bg">
            <div className="w-7 h-7 rounded-full bg-tangerine-light flex items-center justify-center shrink-0 text-brand text-sm">
              🎉
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-label-md text-text-primary">
                Earn <span className="font-bold text-brand">₦{formatMoney(cashback)}</span> instant cashback!
              </p>
              <p className="text-body-sm text-text-secondary truncate">
                Credited straight to your PAYVELLA reward points
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}