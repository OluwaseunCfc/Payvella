import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdVisibility, MdVisibilityOff, MdAccountBalanceWallet, MdAccountBalance, MdContentCopy, MdCheck, MdAddCircle, MdNorthEast } from 'react-icons/md'
import toast from 'react-hot-toast'

const formatBalance = (value) =>
  new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)

export default function WalletBalanceCard({ balance, virtualAccount }) {
  const [isHidden, setIsHidden] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText(virtualAccount.accountNumber)
    setIsCopied(true)
    toast.success('Account number copied')
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <section className="relative overflow-hidden rounded-xl bg-midnight text-white p-5 shadow-xl flex flex-col gap-4">
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-brand/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-brand/10 rounded-full blur-xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-brand flex items-center justify-center">
            <MdAccountBalanceWallet size={16} className="text-white" />
          </div>
          <span className="text-label-sm text-white/70 uppercase tracking-wider">Total Net Balance</span>
        </div>
        <button
          type="button"
          onClick={() => setIsHidden((prev) => !prev)}
          className="flex items-center gap-1 text-white/70 hover:text-white transition-colors py-1 px-2 rounded-md"
        >
          {isHidden ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
          <span className="text-label-sm">{isHidden ? 'Show' : 'Hide'}</span>
        </button>
      </div>

      {/* Balance */}
      <div className="relative z-10 flex items-baseline gap-1.5">
        <span className="text-headline-md text-brand font-extrabold">₦</span>
        <span className="text-display-lg text-white tracking-tight font-extrabold">
          {isHidden ? '••••••••' : formatBalance(balance)}
        </span>
      </div>

      {/* Virtual account bar */}
      <div className="relative z-10 bg-white/10 rounded-lg p-3 flex items-center justify-between gap-2 shadow-inner">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-brand shrink-0">
            <MdAccountBalance size={18} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-label-sm text-white/70 truncate">
              {virtualAccount.bankName} • Payvella
            </span>
            <span className="text-label-md text-white tracking-wider font-bold">
              {virtualAccount.accountNumber}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={`shrink-0 flex items-center gap-1 py-1.5 px-2.5 rounded-md transition-all active:scale-95 ${
            isCopied ? 'bg-brand text-white' : 'bg-white/10 hover:bg-brand text-white'
          }`}
        >
          {isCopied ? <MdCheck size={16} /> : <MdContentCopy size={16} />}
          <span className="text-label-sm">{isCopied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      {/* Quick actions */}
      <div className="relative z-10 grid grid-cols-2 gap-2">
        <Link
          to="/wallet/fund"
          className="w-full h-12 rounded-md bg-brand hover:bg-brand-dark text-white flex items-center justify-center gap-1.5 text-label-lg font-bold shadow-md active:scale-95 transition-all"
        >
          <MdAddCircle size={18} />
          <span>Fund Wallet</span>
        </Link>
        <Link
          to="/wallet/withdraw"
          className="w-full h-12 rounded-md bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-1.5 text-label-lg transition-all active:scale-95"
        >
          <MdNorthEast size={18} />
          <span>Withdraw</span>
        </Link>
      </div>
    </section>
  )
}