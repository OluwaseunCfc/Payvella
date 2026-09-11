import { MdPayments, MdStars, MdArrowForward } from 'react-icons/md'

const formatMoney = (num) =>
  new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)

export default function WalletBreakdown({ mainBalance, cashbackBalance, onRedeemCashback }) {
  return (
    <section className="grid grid-cols-2 gap-2.5">
      {/* Main wallet */}
      <div className="bg-card rounded-lg p-3.5 shadow-sm flex flex-col gap-1">
        <div className="flex items-center justify-between text-text-secondary">
          <span className="text-label-sm uppercase font-semibold">Main Wallet</span>
          <MdPayments size={16} className="text-brand" />
        </div>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-label-md text-text-secondary font-bold">₦</span>
          <span className="text-title-lg text-text-primary font-extrabold">{formatMoney(mainBalance)}</span>
        </div>
        <span className="text-body-sm text-text-secondary">Available for spending</span>
      </div>

      {/* Cashback pool */}
      <div className="bg-card rounded-lg p-3.5 shadow-sm flex flex-col gap-1">
        <div className="flex items-center justify-between text-text-secondary">
          <span className="text-label-sm uppercase font-semibold">Cashback Pool</span>
          <MdStars size={16} className="text-brand" />
        </div>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-label-md text-brand font-bold">₦</span>
          <span className="text-title-lg text-brand font-extrabold">{formatMoney(cashbackBalance)}</span>
        </div>
        <button
          type="button"
          onClick={onRedeemCashback}
          className="text-label-sm text-text-secondary hover:text-brand flex items-center gap-0.5 text-left pt-0.5 transition-colors"
        >
          <span>Redeem to balance</span>
          <MdArrowForward size={14} />
        </button>
      </div>
    </section>
  )
}