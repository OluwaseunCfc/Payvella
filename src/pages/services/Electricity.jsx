import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdBolt, MdReceiptLong, MdVerifiedUser, MdLock, MdElectricBolt } from 'react-icons/md'
import ProviderSelector from '../../components/forms/ProviderSelector'
import MeterVerification from '../../components/forms/MeterVerification'
import ConfirmationModal from '../../components/forms/ConfirmationModal'
import PinEntry from '../../components/forms/PinEntry'
import SuccessScreen from '../../components/forms/SuccessScreen'
import ErrorScreen from '../../components/forms/ErrorScreen'
import { mockUser, electricityProviders } from '../../data/mockData'

const QUICK_AMOUNTS = [1000, 2000, 5000, 10000, 20000]
const MIN_AMOUNT = 1000

const formatMoney = (num) =>
  new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)

const generateReference = () => `PVL-${Math.floor(10000000 + Math.random() * 90000000)}`

export default function Electricity() {
  const navigate = useNavigate()
  const [provider, setProvider] = useState('ikedc')
  const [meterType, setMeterType] = useState('prepaid')
  const [meterNumber, setMeterNumber] = useState('4519 2830 192')
  const [customer, setCustomer] = useState(null)
  const [amount, setAmount] = useState('5000')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPinOpen, setIsPinOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [view, setView] = useState('form') // form | success | error
  const [reference, setReference] = useState('')

  const numericAmount = parseFloat(amount) || 0
  const selectedProvider = electricityProviders.find((p) => p.id === provider)
  const rate = customer ? parseFloat(customer.rate.replace(/[^\d.]/g, '')) : 0
  const estimatedUnits = rate > 0 ? (numericAmount / rate).toFixed(1) : '0.0'
  const vat = numericAmount * 0.075

  const handleAmountChange = (e) => {
    const raw = e.target.value
    if (raw === '' || /^\d*\.?\d*$/.test(raw)) setAmount(raw)
  }

  const handleContinue = () => {
    if (!customer) return
    if (numericAmount < MIN_AMOUNT) return
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
    // const { data } = await api.post('/vtu/electricity/', { provider, meterType, meterNumber, amount: numericAmount })
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
        reason="We couldn't verify your token request. Your wallet was not charged."
        onRetry={() => setView('form')}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4 pb-4">
      <ProviderSelector
        providers={electricityProviders}
        value={provider}
        onChange={(id) => {
          setProvider(id)
          setCustomer(null)
        }}
        label="Distribution Company (DISCO)"
      />

      {/* Meter type toggle */}
      <section className="flex flex-col gap-2">
        <label className="text-label-md text-text-secondary">Meter Type</label>
        <div className="grid grid-cols-2 p-1 bg-border/40 rounded-lg gap-1">
          <button
            type="button"
            onClick={() => setMeterType('prepaid')}
            className={`py-2.5 px-3 rounded-md text-label-lg flex items-center justify-center gap-1.5 transition-all ${
              meterType === 'prepaid' ? 'bg-card text-text-primary shadow-sm' : 'text-text-secondary'
            }`}
          >
            <MdBolt size={18} className={meterType === 'prepaid' ? 'text-brand' : ''} />
            <span>Prepaid</span>
          </button>
          <button
            type="button"
            onClick={() => setMeterType('postpaid')}
            className={`py-2.5 px-3 rounded-md text-label-lg flex items-center justify-center gap-1.5 transition-all ${
              meterType === 'postpaid' ? 'bg-card text-text-primary shadow-sm' : 'text-text-secondary'
            }`}
          >
            <MdReceiptLong size={18} className={meterType === 'postpaid' ? 'text-brand' : ''} />
            <span>Postpaid</span>
          </button>
        </div>
      </section>

      <MeterVerification
        meterNumber={meterNumber}
        onMeterNumberChange={setMeterNumber}
        isVerified={!!customer}
        onVerify={setCustomer}
      />

      {/* Amount */}
      <section className="p-4 bg-card rounded-lg shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label htmlFor="amount-input" className="text-label-md text-text-secondary">
            Purchase Amount
          </label>
          <span className="text-label-sm text-text-secondary">Min: ₦{MIN_AMOUNT.toLocaleString('en-NG')}</span>
        </div>
        <div className="relative flex items-center">
          <span className="absolute left-4 text-headline-md text-text-primary opacity-70">₦</span>
          <input
            id="amount-input"
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={handleAmountChange}
            placeholder="0.00"
            className="w-full pl-10 pr-4 py-3 bg-bg rounded-lg text-text-primary text-headline-md tracking-tight focus:outline-none focus:ring-2 focus:ring-brand/20 transition-colors"
          />
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {QUICK_AMOUNTS.map((amt) => {
            const isActive = numericAmount === amt
            return (
              <button
                key={amt}
                type="button"
                onClick={() => setAmount(String(amt))}
                className={`py-2 rounded-md text-label-sm text-center transition-all ${
                  isActive ? 'bg-tangerine-light text-brand font-semibold shadow-sm' : 'bg-bg text-text-secondary hover:bg-border/40'
                }`}
              >
                ₦{amt / 1000}k
              </button>
            )
          })}
        </div>
      </section>

      {/* Price breakdown */}
      {customer && numericAmount > 0 && (
        <section className="p-4 bg-card rounded-lg shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <MdElectricBolt size={20} className="text-brand" />
              <span className="text-title-md text-text-primary">Estimated Power</span>
            </div>
            <div className="text-right">
              <span className="text-title-lg text-brand font-bold">~{estimatedUnits} kWh</span>
              <p className="text-label-sm text-text-secondary">Prepaid Token Units</p>
            </div>
          </div>
          <div className="h-px bg-border" />
          <div className="flex flex-col gap-2 text-body-sm">
            <div className="flex justify-between items-center text-text-secondary">
              <span>Bill Value</span>
              <span className="text-text-primary text-title-md">₦{formatMoney(numericAmount)}</span>
            </div>
            <div className="flex justify-between items-center text-text-secondary">
              <span className="flex items-center gap-1">
                Convenience Fee
                <span className="px-1.5 py-0.5 rounded bg-bg text-brand text-label-sm">Free</span>
              </span>
              <div className="flex items-center gap-1.5">
                <span className="line-through text-text-muted">₦100.00</span>
                <span className="text-brand font-semibold">₦0.00</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-text-secondary">
              <span>VAT & Levy (Included)</span>
              <span className="text-text-primary font-medium">₦{formatMoney(vat)}</span>
            </div>
          </div>
          <div className="h-px bg-border" />
          <div className="flex justify-between items-center">
            <span className="text-title-md text-text-primary">Total Payable</span>
            <span className="text-headline-md text-brand font-extrabold">₦{formatMoney(numericAmount)}</span>
          </div>
        </section>
      )}

      {/* Wallet balance */}
      <section className="px-4 py-3 bg-border/30 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-label-md text-text-secondary">PAYVELLA Wallet</span>
        </div>
        <span className="text-title-md text-text-primary font-semibold">₦{formatMoney(mockUser.balance)}</span>
      </section>

      {/* CTA */}
      <button
        type="button"
        onClick={handleContinue}
        disabled={isProcessing || !customer || numericAmount < MIN_AMOUNT}
        className="w-full h-[52px] bg-brand hover:bg-brand-dark text-white rounded-full text-label-lg font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <MdLock size={18} />
        <span>
          {isProcessing
            ? 'Processing...'
            : !customer
              ? 'Verify meter to continue'
              : `Pay Electricity Bill (₦${formatMoney(numericAmount)})`}
        </span>
      </button>

      <div className="flex items-center justify-center gap-1.5 text-text-secondary">
        <MdVerifiedUser size={16} className="text-brand" />
        <span className="text-label-sm">Tokens are generated and delivered via SMS immediately</span>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSummary}
        title="Confirm Electricity Payment"
        rows={[
          { label: 'Provider', value: selectedProvider?.short || '—' },
          { label: 'Meter Number', value: meterNumber },
          { label: 'Meter Type', value: meterType === 'prepaid' ? 'Prepaid' : 'Postpaid' },
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