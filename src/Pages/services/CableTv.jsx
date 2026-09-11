import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdLock, MdVerifiedUser } from 'react-icons/md'
import ProviderSelector from '../../components/forms/ProviderSelector'
import SmartcardVerification from '../../components/forms/SmartcardVerification'
import PackageCard from '../../components/forms/PackageCard'
import ConfirmationModal from '../../components/forms/ConfirmationModal'
import PinEntry from '../../components/forms/PinEntry'
import SuccessScreen from '../../components/forms/SuccessScreen'
import ErrorScreen from '../../components/forms/ErrorScreen'
import { mockUser, cableProviders, cablePackages } from '../../data/mockData'

const formatMoney = (num) =>
  new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)

const generateReference = () => `PVL-${Math.floor(10000000 + Math.random() * 90000000)}`

export default function CableTv() {
  const navigate = useNavigate()
  const [provider, setProvider] = useState('dstv')
  const [smartcardNumber, setSmartcardNumber] = useState('')
  const [customer, setCustomer] = useState(null)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPinOpen, setIsPinOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [view, setView] = useState('form') // form | success | error
  const [reference, setReference] = useState('')

  const selectedProvider = cableProviders.find((p) => p.id === provider)
  const packageAmount = selectedPackage?.price || 0

  const handleProviderChange = (id) => {
    setProvider(id)
    setCustomer(null)
    setSmartcardNumber('')
    setSelectedPackage(null)
  }

  const handleContinue = () => {
    if (!customer) return
    if (!selectedPackage) return
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
    // const { data } = await api.post('/vtu/cable/', { provider, smartcardNumber, packageId: selectedPackage.id })
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsProcessing(false)
    setReference(generateReference())
    setView('success')
  }

  if (view === 'success') {
    return <SuccessScreen amount={packageAmount} reference={reference} onDone={() => navigate('/dashboard')} />
  }

  if (view === 'error') {
    return (
      <ErrorScreen
        reason="We couldn't complete your subscription. Your wallet was not charged."
        onRetry={() => setView('form')}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4 pb-4">
      <ProviderSelector
        providers={cableProviders}
        value={provider}
        onChange={handleProviderChange}
        label="Cable Provider"
      />

      <SmartcardVerification
        smartcardNumber={smartcardNumber}
        onSmartcardNumberChange={setSmartcardNumber}
        isVerified={!!customer}
        onVerify={setCustomer}
      />

      {/* Package grid */}
      <section className="flex flex-col gap-3">
        <label className="text-label-md text-text-secondary">Select Package</label>
        <div className="grid grid-cols-2 gap-3">
          {cablePackages[provider].map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              isSelected={selectedPackage?.id === pkg.id}
              onSelect={setSelectedPackage}
            />
          ))}
        </div>
      </section>

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
            <span>Package</span>
            <span className="text-title-md text-white">{selectedPackage ? selectedPackage.name : '—'}</span>
          </div>
          <div className="flex items-center justify-between text-body-md text-white/70">
            <span>Processing Fee</span>
            <span className="text-label-lg font-bold text-success">₦0.00 (Free)</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div>
            <span className="text-label-sm text-white/60 uppercase tracking-wider block">Total Payable</span>
            <span className="text-headline-md font-extrabold text-white">₦{formatMoney(packageAmount)}</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <button
        type="button"
        onClick={handleContinue}
        disabled={isProcessing || !customer || !selectedPackage}
        className="w-full h-[52px] bg-brand hover:bg-brand-dark text-white rounded-full text-label-lg font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <MdLock size={18} />
        <span>
          {isProcessing
            ? 'Processing...'
            : !customer
              ? 'Verify smartcard to continue'
              : !selectedPackage
                ? 'Select a package to continue'
                : `Subscribe (₦${formatMoney(packageAmount)})`}
        </span>
      </button>

      <div className="flex items-center justify-center gap-1.5 text-text-secondary">
        <MdVerifiedUser size={16} className="text-brand" />
        <span className="text-label-sm">Secured with 256-bit encryption by PAYVELLA</span>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSummary}
        title="Confirm Cable Subscription"
        rows={[
          { label: 'Provider', value: selectedProvider?.label || '—' },
          { label: 'Smartcard Number', value: smartcardNumber || '—' },
          { label: 'Customer', value: customer?.name || '—' },
          { label: 'Package', value: selectedPackage?.name || '—' },
          { label: 'Total', value: `₦${formatMoney(packageAmount)}`, emphasize: true },
        ]}
      />

      <PinEntry
        isOpen={isPinOpen}
        onClose={() => setIsPinOpen(false)}
        onSuccess={processPayment}
        amountLabel={`₦${formatMoney(packageAmount)}`}
      />
    </div>
  )
}