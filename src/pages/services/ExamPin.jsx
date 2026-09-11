import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdLock, MdSchool } from 'react-icons/md'
import ProviderSelector from '../../components/forms/ProviderSelector'
import PackageCard from '../../components/forms/PackageCard'
import ConfirmationModal from '../../components/forms/ConfirmationModal'
import PinEntry from '../../components/forms/PinEntry'
import SuccessScreen from '../../components/forms/SuccessScreen'
import ErrorScreen from '../../components/forms/ErrorScreen'
import { mockUser, examProviders, examPinTypes } from '../../data/mockData'

const formatMoney = (num) =>
  new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)

const generateReference = () => `PVL-${Math.floor(10000000 + Math.random() * 90000000)}`
const MAX_QUANTITY = 5

export default function ExamPin() {
  const navigate = useNavigate()
  const [provider, setProvider] = useState('waec')
  const [selectedType, setSelectedType] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPinOpen, setIsPinOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [view, setView] = useState('form') // form | success | error
  const [reference, setReference] = useState('')

  const selectedProvider = examProviders.find((p) => p.id === provider)
  const totalAmount = (selectedType?.price || 0) * quantity

  const handleProviderChange = (id) => {
    setProvider(id)
    setSelectedType(null)
    setQuantity(1)
  }

  const handleContinue = () => {
    if (!selectedType) return
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
    // const { data } = await api.post('/vtu/exam-pin/', { provider, pinTypeId: selectedType.id, quantity })
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsProcessing(false)
    setReference(generateReference())
    setView('success')
  }

  if (view === 'success') {
    return <SuccessScreen amount={totalAmount} reference={reference} onDone={() => navigate('/dashboard')} />
  }

  if (view === 'error') {
    return (
      <ErrorScreen
        reason="We couldn't generate your PIN(s). Your wallet was not charged."
        onRetry={() => setView('form')}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4 pb-4">
      <ProviderSelector
        providers={examProviders}
        value={provider}
        onChange={handleProviderChange}
        label="Examination Body"
      />

      {/* PIN type grid */}
      <section className="flex flex-col gap-3">
        <label className="text-label-md text-text-secondary">Select PIN Type</label>
        <div className="grid grid-cols-2 gap-3">
          {examPinTypes[provider].map((type) => (
            <PackageCard
              key={type.id}
              pkg={type}
              isSelected={selectedType?.id === type.id}
              onSelect={setSelectedType}
            />
          ))}
        </div>
      </section>

      {/* Quantity stepper */}
      {selectedType && (
        <section className="p-4 bg-card rounded-lg shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-label-md text-text-secondary">Quantity</span>
            <span className="text-body-sm text-text-muted">Max {MAX_QUANTITY} PINs per transaction</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-9 h-9 rounded-full bg-bg text-text-primary text-title-lg font-bold flex items-center justify-center hover:bg-border/40 transition-colors"
            >
              −
            </button>
            <span className="text-headline-sm text-text-primary font-bold w-6 text-center">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))}
              className="w-9 h-9 rounded-full bg-bg text-text-primary text-title-lg font-bold flex items-center justify-center hover:bg-border/40 transition-colors"
            >
              +
            </button>
          </div>
        </section>
      )}

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
            <span>PIN Type</span>
            <span className="text-title-md text-white">{selectedType ? selectedType.name : '—'}</span>
          </div>
          <div className="flex items-center justify-between text-body-md text-white/70">
            <span>Quantity</span>
            <span className="text-title-md text-white">{selectedType ? quantity : '—'}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div>
            <span className="text-label-sm text-white/60 uppercase tracking-wider block">Total Payable</span>
            <span className="text-headline-md font-extrabold text-white">₦{formatMoney(totalAmount)}</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <button
        type="button"
        onClick={handleContinue}
        disabled={isProcessing || !selectedType}
        className="w-full h-[52px] bg-brand hover:bg-brand-dark text-white rounded-full text-label-lg font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <MdLock size={18} />
        <span>
          {isProcessing
            ? 'Processing...'
            : selectedType
              ? `Buy ${quantity} PIN${quantity > 1 ? 's' : ''} (₦${formatMoney(totalAmount)})`
              : 'Select a PIN type to continue'}
        </span>
      </button>

      <div className="flex items-center justify-center gap-1.5 text-text-secondary">
        <MdSchool size={16} className="text-brand" />
        <span className="text-label-sm">PINs are generated instantly and shown on your receipt</span>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSummary}
        title="Confirm Exam PIN Purchase"
        rows={[
          { label: 'Examination Body', value: selectedProvider?.label || '—' },
          { label: 'PIN Type', value: selectedType?.name || '—' },
          { label: 'Quantity', value: String(quantity) },
          { label: 'Unit Price', value: `₦${formatMoney(selectedType?.price || 0)}` },
          { label: 'Total', value: `₦${formatMoney(totalAmount)}`, emphasize: true },
        ]}
      />

      <PinEntry
        isOpen={isPinOpen}
        onClose={() => setIsPinOpen(false)}
        onSuccess={processPayment}
        amountLabel={`₦${formatMoney(totalAmount)}`}
      />
    </div>
  )
}