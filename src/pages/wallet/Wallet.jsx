import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdBolt } from 'react-icons/md'
import toast from 'react-hot-toast'
import WalletBalanceCard from '../../components/dashboard/WalletBalanceCard'
import WalletBreakdown from '../../components/dashboard/WalletBreakdown'
import FundingChannels from '../../components/dashboard/FundingChannels'
import WalletActivity from '../../components/dashboard/WalletActivity'
import { mockUser, virtualAccount, walletBreakdown, walletActivity } from '../../data/mockData'

const QUICK_AMOUNTS = [2000, 5000, 10000, 20000, 50000]

export default function Wallet() {
  const navigate = useNavigate()
  const [selectedAmount, setSelectedAmount] = useState(5000)

  const handleChannelSelect = (channelId) => {
    navigate('/wallet/fund', { state: { channel: channelId, amount: selectedAmount } })
  }

  const handleRedeemCashback = () => {
    // TODO: replace with real API call, e.g. api.post('/wallet/redeem-cashback/')
    toast.success('Cashback redeemed to main balance')
  }

  return (
    <div className="flex flex-col gap-5 pb-4">
      {/* Page header */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h1 className="text-headline-md text-text-primary">My Wallet</h1>
            <span className="text-brand">✓</span>
          </div>
        </div>
        <p className="text-body-md text-text-secondary">Manage funding, cards and virtual accounts</p>
      </div>

      <WalletBalanceCard balance={mockUser.balance} virtualAccount={virtualAccount} />

      <WalletBreakdown
        mainBalance={walletBreakdown.mainBalance}
        cashbackBalance={walletBreakdown.cashbackBalance}
        onRedeemCashback={handleRedeemCashback}
      />

      {/* Quick amount presets */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-title-md text-text-primary">Quick Amount</span>
          <span className="text-body-sm text-text-secondary">Tap to pre-fill</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          {QUICK_AMOUNTS.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setSelectedAmount(amt)}
              className={`shrink-0 px-4 py-2 rounded-full text-label-md transition-all ${
                selectedAmount === amt
                  ? 'bg-tangerine-light text-brand font-bold shadow-sm'
                  : 'bg-card text-text-primary shadow-sm hover:bg-border/40'
              }`}
            >
              ₦{amt.toLocaleString('en-NG')}
            </button>
          ))}
        </div>
      </section>

      <FundingChannels onSelect={handleChannelSelect} />

      <WalletActivity activity={walletActivity} />

      {/* Primary bottom action */}
      <button
        type="button"
        onClick={() => navigate('/wallet/fund', { state: { channel: 'transfer', amount: selectedAmount } })}
        className="w-full h-[52px] rounded-lg bg-brand hover:bg-brand-dark text-white text-label-lg font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
      >
        <MdBolt size={20} />
        <span>Fund Wallet Now</span>
      </button>
    </div>
  )
}