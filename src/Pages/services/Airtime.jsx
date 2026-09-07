import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdCall, MdWifi, MdContacts, MdVerifiedUser, MdSendToMobile } from 'react-icons/md'
import NetworkSelector from "../../Components/Forms/NetworkSelector";
import AmountSelector from "../../Components/Forms/AmountSelector";
import ConfirmationModal from "../../Components/Forms/ConfirmationModal";
import PinEntry from "../../Components/Forms/PinEntry";
import SuccessScreen from "../../Components/Forms/SuccessScreen";
import ErrorScreen from '../../Components/forms/ErrorScreen'
import { mockUser } from '../../data/mockData'

// Stored WITHOUT the leading 0, since the input only collects the 10 digits after +234
const RECENT_CONTACTS = [
  { label: 'Mom', number: '8031234567' },
  { label: 'Work SIM', number: '8129876543' },
  { label: 'Dave', number: '9055543210' },
]

const formatMoney = (num) =>
  new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)

const generateReference = () => `PVL-${Math.floor(10000000 + Math.random() * 90000000)}`

export default function Airtime() {
  const navigate = useNavigate()
  const [network, setNetwork] = useState('mtn')
  const [phone, setPhone] = useState('') // holds only the 10 digits after +234
  const [amount, setAmount] = useState('1000')
  const [phoneError, setPhoneError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPinOpen, setIsPinOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [view, setView] = useState('form') // form | success | error
  const [reference, setReference] = useState('')

  const numericAmount = parseFloat(amount) || 0
  const fullPhoneNumber = phone ? `0${phone}` : ''

  const handlePhoneChange = (e) => {
    let digitsOnly = e.target.value.replace(/\D/g, '')
    if (digitsOnly.startsWith('0')) {
      digitsOnly = digitsOnly.slice(1)
    }
    setPhone(digitsOnly.slice(0, 10))
    setPhoneError('')
  }

  const validatePhone = () => {
    if (!phone) {
      setPhoneError('Phone number is required')
      return false
    }
    if (phone.length !== 10) {
      setPhoneError('Phone number must be 10 digits')
      return false
    }
    if (!/^[789]/.test(phone)) {
      setPhoneError('Enter a valid Nigerian phone number')
      return false
    }
    setPhoneError('')
    return true
  }

  const handleContinue = () => {
    if (!validatePhone()) return
    if (numericAmount < 50) return
    setIsModalOpen(true)
  }

  // Confirmation modal's "Confirm Payment" no longer charges directly —
  // it hands off to PIN entry first.
  const handleConfirmSummary = () => {
    setIsModalOpen(false)
    setIsPinOpen(true)
  }

  // Only runs after a correct PIN.
  const processPayment = async () => {
    setIsPinOpen(false)
    setIsProcessing(true)

    // TODO: replace with real API call, e.g.
    // const { data } = await api.post('/vtu/airtime/', { network, phone: fullPhoneNumber, amount: numericAmount })
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsProcessing(false)

    // Simulated: treat as success. Swap this for real response handling later.
    setReference(generateReference())
    setView('success')
  }

  if (view === 'success') {
    return (
      <SuccessScreen
        amount={numericAmount}
        reference={reference}
        onDone={() => navigate('/dashboard')}
      />
    )
  }

  if (view === 'error') {
    return (
      <ErrorScreen
        reason="We couldn't reach your network provider. Your wallet was not charged."
        onRetry={() => setView('form')}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Tab toggle */}
      <div className="w-full bg-border/50 p-1 rounded-full flex items-center">
        <Link
          to="/airtime"
          className="flex-1 py-2.5 rounded-full text-label-lg flex items-center justify-center gap-1.5 bg-card text-brand shadow-sm transition-all"
        >
          <MdCall size={18} />
          <span>Airtime</span>
        </Link>
        <Link
          to="/data"
          className="flex-1 py-2.5 rounded-full text-label-lg flex items-center justify-center gap-1.5 text-text-secondary transition-all"
        >
          <MdWifi size={18} />
          <span>Internet Data</span>
        </Link>
      </div>

      <NetworkSelector value={network} onChange={setNetwork} />

      {/* Phone input */}
      <section className="flex flex-col gap-2">
        <div className="bg-card rounded-lg p-3 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="phone-input" className="text-label-md text-text-secondary font-medium">
              Recipient Mobile Number
            </label>
            <span className="text-label-sm text-text-secondary">Nigeria (+234)</span>
          </div>
          <div className="flex items-center gap-2 bg-bg rounded-md px-3 py-2 focus-within:shadow-md transition-all">
            <span className="text-title-md text-text-primary font-semibold shrink-0">+234</span>
            <input
              id="phone-input"
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="803 456 7890"
              className="flex-1 min-w-0 bg-transparent text-title-md text-text-primary placeholder:text-text-muted focus:outline-none tracking-wide"
            />
            <button
              type="button"
              aria-label="Open saved contacts"
              className="w-9 h-9 shrink-0 rounded-full bg-tangerine-light flex items-center justify-center text-brand"
            >
              <MdContacts size={18} />
            </button>
          </div>
          {phoneError && <span className="text-body-sm text-error">{phoneError}</span>}

          {/* Recent contacts */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-label-sm text-text-secondary shrink-0">Recent:</span>
            {RECENT_CONTACTS.map((contact) => (
              <button
                key={contact.number}
                type="button"
                onClick={() => {
                  setPhone(contact.number)
                  setPhoneError('')
                }}
                className="shrink-0 px-2.5 py-1 rounded-full bg-bg text-text-primary text-label-sm hover:bg-border/40 transition-colors"
              >
                {contact.label} (0{contact.number.slice(0, 3)}...)
              </button>
            ))}
          </div>
        </div>
      </section>

      <AmountSelector value={amount} onChange={setAmount} cashbackRate={0.02} />

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
            <span>Recharge Amount</span>
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
        disabled={isProcessing}
        className="w-full h-[52px] rounded-full bg-brand hover:bg-brand-dark text-white text-label-lg font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <MdSendToMobile size={20} />
        <span>{isProcessing ? 'Processing...' : `Continue to Pay ₦${formatMoney(numericAmount)}`}</span>
      </button>

      <div className="flex items-center justify-center gap-1.5 text-text-secondary">
        <MdVerifiedUser size={16} className="text-brand" />
        <span className="text-label-sm">Secured with 256-bit encryption by PAYVELLA</span>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSummary}
        title="Confirm Airtime Purchase"
        rows={[
          { label: 'Network', value: network.toUpperCase() },
          { label: 'Phone Number', value: fullPhoneNumber || '—' },
          { label: 'Amount', value: `₦${formatMoney(numericAmount)}` },
          { label: 'Transaction Fee', value: 'Free' },
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