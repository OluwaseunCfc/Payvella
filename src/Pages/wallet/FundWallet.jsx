import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { MdContentCopy, MdCheck, MdAccountBalance, MdCreditCard, MdDialpad, MdCheckCircle } from 'react-icons/md'
import { virtualAccount } from '../../data/mockData'

const CHANNEL_LABELS = {
  transfer: 'Bank Transfer',
  card: 'Debit/Credit Card',
  ussd: 'USSD & Direct Dial',
}

const formatMoney = (num) =>
  new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)

export default function FundWallet() {
  const location = useLocation()
  const navigate = useNavigate()
  const initialChannel = location.state?.channel || 'transfer'
  const initialAmount = location.state?.amount || 5000

  const [channel, setChannel] = useState(initialChannel)
  const [amount, setAmount] = useState(String(initialAmount))
  const [isCopied, setIsCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [view, setView] = useState('form') // form | success

  const numericAmount = parseFloat(amount) || 0

  const handleAmountChange = (e) => {
    const raw = e.target.value
    if (raw === '' || /^\d*\.?\d*$/.test(raw)) setAmount(raw)
  }

  const handleCopy = () => {
    navigator.clipboard?.writeText(virtualAccount.accountNumber)
    setIsCopied(true)
    toast.success('Account number copied')
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleSimulateFunding = async () => {
    setIsProcessing(true)

    // TODO: replace with real API call / webhook confirmation, e.g.
    // const { data } = await api.post('/wallet/fund/', { channel, amount: numericAmount })
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsProcessing(false)
    setView('success')
  }

  if (view === 'success') {
    return (
      <div className="flex flex-col items-center justify-center flex-1 gap-5 text-center py-8">
        <div className="w-20 h-20 rounded-full bg-success-bg flex items-center justify-center">
          <MdCheckCircle size={48} className="text-success" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-headline-md text-text-primary">Wallet Funded</h1>
          <span className="text-display-sm text-text-primary font-extrabold">+₦{formatMoney(numericAmount)}</span>
          <p className="text-body-sm text-text-secondary">Your new balance has been updated</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/wallet')}
          className="w-full h-12 rounded-md bg-brand hover:bg-brand-dark text-white text-label-lg font-bold flex items-center justify-center active:scale-95 transition-all mt-2"
        >
          Back to Wallet
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 pb-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-headline-sm text-text-primary">Fund Wallet</h1>
        <p className="text-body-sm text-text-secondary">Choose how you'd like to add money</p>
      </div>

      {/* Channel toggle */}
      <div className="grid grid-cols-3 p-1 bg-border/40 rounded-lg gap-1">
        {[
          { id: 'transfer', icon: MdAccountBalance },
          { id: 'card', icon: MdCreditCard },
          { id: 'ussd', icon: MdDialpad },
        ].map(({ id, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setChannel(id)}
            className={`py-2.5 px-2 rounded-md text-label-sm flex flex-col items-center gap-1 transition-all ${
              channel === id ? 'bg-card text-brand shadow-sm font-semibold' : 'text-text-secondary'
            }`}
          >
            <Icon size={18} />
            <span>{CHANNEL_LABELS[id]}</span>
          </button>
        ))}
      </div>

      {/* Amount input */}
      <section className="p-4 bg-card rounded-lg shadow-sm flex flex-col gap-2">
        <label htmlFor="fund-amount" className="text-label-md text-text-secondary">
          Amount to Fund
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-4 text-headline-md text-text-primary opacity-70">₦</span>
          <input
            id="fund-amount"
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={handleAmountChange}
            className="w-full pl-10 pr-4 py-3 bg-bg rounded-lg text-text-primary text-headline-md tracking-tight focus:outline-none focus:ring-2 focus:ring-brand/20 transition-colors"
          />
        </div>
      </section>

      {/* Channel-specific instructions */}
      {channel === 'transfer' && (
        <section className="p-4 bg-card rounded-lg shadow-sm flex flex-col gap-3">
          <span className="text-title-md text-text-primary">Transfer to your PAYVELLA account</span>
          <div className="bg-midnight rounded-lg p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-label-sm text-white/60 uppercase tracking-wider">Bank Name</span>
              <span className="text-body-md text-white font-semibold">{virtualAccount.bankName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-label-sm text-white/60 uppercase tracking-wider">Account Name</span>
              <span className="text-body-md text-white font-semibold text-right">{virtualAccount.accountName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-label-sm text-white/60 uppercase tracking-wider">Account Number</span>
              <div className="flex items-center gap-2">
                <span className="text-title-lg text-white font-bold tracking-wider">{virtualAccount.accountNumber}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`p-1.5 rounded-md transition-all ${isCopied ? 'bg-brand text-white' : 'bg-white/10 hover:bg-brand text-white'}`}
                >
                  {isCopied ? <MdCheck size={16} /> : <MdContentCopy size={16} />}
                </button>
              </div>
            </div>
          </div>
          <p className="text-body-sm text-text-secondary">
            Transfer exactly <strong className="text-text-primary">₦{formatMoney(numericAmount)}</strong> to the account above. Your wallet is credited automatically within minutes of a successful transfer.
          </p>
        </section>
      )}

      {channel === 'card' && (
        <section className="p-4 bg-card rounded-lg shadow-sm flex flex-col gap-3">
          <span className="text-title-md text-text-primary">Pay with Card</span>
          <p className="text-body-sm text-text-secondary">
            You'll be redirected to a secure payment page to complete your card payment of{' '}
            <strong className="text-text-primary">₦{formatMoney(numericAmount)}</strong>.
          </p>
          <div className="flex items-center gap-2 text-text-secondary">
            <span className="text-label-sm px-2 py-1 bg-bg rounded-md">Mastercard</span>
            <span className="text-label-sm px-2 py-1 bg-bg rounded-md">Visa</span>
            <span className="text-label-sm px-2 py-1 bg-bg rounded-md">Verve</span>
          </div>
        </section>
      )}

      {channel === 'ussd' && (
        <section className="p-4 bg-card rounded-lg shadow-sm flex flex-col gap-3">
          <span className="text-title-md text-text-primary">Dial USSD Code</span>
          <div className="bg-bg rounded-lg p-4 text-center">
            <span className="text-headline-sm text-brand font-bold tracking-wide">*737*000*{Math.round(numericAmount)}#</span>
          </div>
          <p className="text-body-sm text-text-secondary">
            Dial this code from your registered phone number to fund your wallet instantly, no data required.
          </p>
        </section>
      )}

      {/* CTA */}
      <button
        type="button"
        onClick={handleSimulateFunding}
        disabled={isProcessing || numericAmount < 100}
        className="w-full h-[52px] rounded-full bg-brand hover:bg-brand-dark text-white text-label-lg font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {isProcessing ? 'Processing...' : channel === 'transfer' ? "I've Made the Transfer" : 'Proceed to Pay'}
      </button>
    </div>
  )
}