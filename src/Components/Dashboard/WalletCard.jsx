import { useState } from 'react'
import { MdVisibility, MdVisibilityOff, MdAddCircle, MdArrowForward, MdBolt, MdRedeem } from 'react-icons/md'
import { Link } from 'react-router-dom'

const formatBalance = (value) =>
  new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)

export default function WalletCard({ balance = 125680.5, cashBonus = 450 }) {
  const [isHidden, setIsHidden] = useState(false)

  return (
    <section className="relative overflow-hidden rounded-xl bg-midnight text-white p-5 shadow-xl">
      {/* Tangerine glow accents */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-brand/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-10 -bottom-10 w-36 h-36 bg-brand/10 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-label-md text-white/70 tracking-wide">Available Balance</span>
            <button
              type="button"
              aria-label="Toggle balance visibility"
              onClick={() => setIsHidden((prev) => !prev)}
              className="text-white/70 hover:text-white transition-colors flex items-center"
            >
              {isHidden ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
            </button>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand/20 text-tangerine-soft">
            <MdBolt size={14} />
            <span className="text-label-sm font-semibold">Instant VTU</span>
          </div>
        </div>

        {/* Balance display */}
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-1">
            <span className="text-headline-md font-bold text-white/70 select-none">₦</span>
            <span className="text-display-sm tracking-tight font-extrabold text-white">
              {isHidden ? '••••••••' : formatBalance(balance)}
            </span>
          </div>
          {cashBonus > 0 && (
            <div className="flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md">
              <MdRedeem size={15} className="text-brand" />
              <span className="text-label-sm text-white/90 font-medium">
                + ₦{formatBalance(cashBonus)} cash bonus today
              </span>
            </div>
          )}
        </div>

        {/* CTA row */}
        <div className="pt-1 flex items-center justify-between gap-3">
          <Link
            to="/wallet/fund"
            className="flex-1 h-12 px-4 rounded-md bg-brand hover:bg-brand-dark text-white text-label-lg font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <MdAddCircle size={20} />
            <span>Fund Wallet</span>
          </Link>
          <Link
            to="/transactions"
            className="h-12 px-4 rounded-md bg-white/10 hover:bg-white/20 text-white text-label-md flex items-center justify-center gap-1 active:scale-95 transition-all"
          >
            <span>History</span>
            <MdArrowForward size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}