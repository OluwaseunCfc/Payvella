import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdLock, MdSportsSoccer } from 'react-icons/md'
import ProviderSelector from '../../components/forms/ProviderSelector'
import AccountVerification from '../../components/forms/AccountVerification'
import AmountSelector from '../../components/forms/AmountSelector'
import ConfirmationModal from '../../components/forms/ConfirmationModal'
import PinEntry from '../../components/forms/PinEntry'
import SuccessScreen from '../../components/forms/SuccessScreen'
import ErrorScreen from '../../components/forms/ErrorScreen'
import { mockUser, bettingPlatforms } from '../../data/mockData'

const formatMoney = (num) =>
  new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)

const generateReference = () => `PVL-${Math.floor(10000000 + Math.random() * 90000000)}`

export default function Betting() {
  const navigate = useNavigate()
  const [platform, setPlatform] = useState('bet9ja')
  const [userId, setUserId] = useState('')
  const [customerName, setCustomerName] = useState(null)
  const [amount, setAmount] = useState('1000')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPinOpen, setIsPinOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [view, setView] = useState('form') // form | success | error
  const [reference, setReference] = useState('')

  const numericAmount = parseFloat(amount) || 0
  const selectedPlatform = bettingPlatforms.find((p) => p.id === platform)

  const handlePlatformChange = (id) => {
    setPlatform(id)
    setCustomerName(null)
    setUserId('')
  }

  const handleContinue = () => {
    if (!customerName) return
    if (numericAmount < 100) return
    setIsModalOpen(true)
  }

  const handleConfirmSummary = () => {
    setIsModalOpen(false)
    setIsPinOpen(true)
  }

  const processPayment = async () => {
    setIsPinOpen(false)
    setIsProcessing(true)

    // TODO: replace with real API call, e.g.
    // const { data } = await api.post('/vtu/betting/', { platform, userId, amount: numericAmount })
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsProcessing(false)
    setReference(generateReference())
    setView('success')
  }

  if (view === 'success') {
    return <SuccessScreen amount={numericAmount} reference={reference} onDone={() => navigate('/dashboard')} />
  }

  if (view === 'error') {
    return (
      <ErrorScreen
        reason="We couldn't fund your betting wallet. Your PAYVELLA wallet was not charged."
        onRetry={() => setView('form')}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4 pb-4">
      <ProviderSelector
        providers={bettingPlatforms}
        value={platform}
        onChange={handlePlatformChange}
        label="Betting Platform"
      />

      <AccountVerification
        value={userId}
        onChange={setUserId}
        isVerified={!!customerName}
        onVerify={setCustomerName}
        label="Betting Account ID"
        placeholder="Enter your user ID"
      />

      <AmountSelector value={amount} onChange={setAmount} min={100} cashbackRate={0} />

      {/* Wallet summary card */}
      <section className="rounded-xl bg-midnight text-white p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-label-md text-white/70">Pay From Wallet</span>
          <span className="text-label-sm bg-white/10 px-2 py-0.5 rounded-full">
            Balance: ₦{formatMoney(mockUser.balance)}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-body-md text-white/70">
            <span>Fund Amount</span>
            <span className="text-title-md text-white">₦{formatMoney(numericAmount)}</span>
          </div>
          <div className="flex items-center justify-between text-body-md text-white/70">
            <span>Processing Fee</span>
            <span className="text-label-lg font-bold text-success">₦0.00 (Free)</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div>
            <span className="text-label-sm text-white/60 uppercase tracking-wider block">Total Payable</span>
            <span className="text-headline-md font-extrabold text-white">₦{formatMoney(numericAmount)}</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <button
        type="button"
        onClick={handleContinue}
        disabled={isProcessing || !customerName || numericAmount < 100}
        className="w-full h-[52px] bg-brand hover:bg-brand-dark text-white rounded-full text-label-lg font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <MdLock size={18} />
        <span>
          {isProcessing
            ? 'Processing...'
            : !customerName
              ? 'Verify account to continue'
              : `Fund Betting Wallet (₦${formatMoney(numericAmount)})`}
        </span>
      </button>

      <div className="flex items-center justify-center gap-1.5 text-text-secondary">
        <MdSportsSoccer size={16} className="text-brand" />
        <span className="text-label-sm">Funds are credited to your betting wallet instantly</span>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSummary}
        title="Confirm Betting Wallet Funding"
        rows={[
          { label: 'Platform', value: selectedPlatform?.label || '—' },
          { label: 'Account ID', value: userId || '—' },
          { label: 'Account Name', value: customerName || '—' },
          { label: 'Amount', value: `₦${formatMoney(numericAmount)}` },
          { label: 'Total', value: `₦${formatMoney(numericAmount)}`, emphasize: true },
        ]}
      />

      <PinEntry
        isOpen={isPinOpen}
        onClose={() => setIsPinOpen(false)}
        onSuccess={processPayment}
        amountLabel={`₦${formatMoney(numericAmount)}`}
      />
    </div>
  )
}