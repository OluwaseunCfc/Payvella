import { useState } from 'react'
import { MdCreditCard, MdVerified, MdCheckCircle } from 'react-icons/md'

// Simulated customer record — swap for a real API lookup response later
const MOCK_CUSTOMER = {
  name: 'ADEKUNLE O. BABATUNDE',
}

export default function SmartcardVerification({ smartcardNumber, onSmartcardNumberChange, isVerified, onVerify }) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState('')

  const handleVerify = async () => {
    if (smartcardNumber.trim().length < 6) {
      setError('Enter a valid smartcard/IUC number')
      return
    }
    setError('')
    setIsVerifying(true)

    // TODO: replace with real API call, e.g.
    // const { data } = await api.get(`/vtu/cable/verify/?smartcard=${smartcardNumber}`)
    await new Promise((resolve) => setTimeout(resolve, 1200))

    setIsVerifying(false)
    onVerify(MOCK_CUSTOMER)
  }

  return (
    <section className="flex flex-col gap-2">
      <div className="p-4 bg-card rounded-lg shadow-sm flex flex-col gap-3">
        <label htmlFor="smartcard-number" className="text-label-md text-text-secondary">
          Smartcard / IUC Number
        </label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              id="smartcard-number"
              type="text"
              inputMode="numeric"
              value={smartcardNumber}
              onChange={(e) => {
                onSmartcardNumberChange(e.target.value.replace(/\D/g, ''))
                setError('')
              }}
              placeholder="Enter smartcard number"
              className="w-full bg-bg text-text-primary text-title-md tracking-wider px-3.5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20 transition-colors"
            />
            <MdCreditCard size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          </div>
          <button
            type="button"
            onClick={handleVerify}
            disabled={isVerifying}
            className="px-4 py-3 bg-brand hover:bg-brand-dark text-white rounded-lg text-label-md shrink-0 shadow-sm active:scale-95 transition-all flex items-center gap-1 disabled:opacity-60"
          >
            <MdVerified size={16} />
            <span>{isVerifying ? 'Checking...' : 'Verify'}</span>
          </button>
        </div>
        {error && <span className="text-body-sm text-error">{error}</span>}

        {isVerified && (
          <div className="p-3.5 bg-bg rounded-lg flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-label-sm text-text-secondary uppercase tracking-wider">Account Found</span>
              <p className="text-title-md text-text-primary font-semibold">{MOCK_CUSTOMER.name}</p>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tangerine-light text-brand text-label-sm font-semibold shrink-0">
              <MdCheckCircle size={14} />
              Verified
            </span>
          </div>
        )}
      </div>
    </section>
  )
}