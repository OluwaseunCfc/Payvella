import { useState } from 'react'
import { MdPin, MdVerified, MdCheckCircle, MdLocationOn } from 'react-icons/md'

// Simulated customer record — swap for a real API lookup response later
const MOCK_CUSTOMER = {
  name: 'ADEKUNLE O. BABATUNDE',
  address: '14, Admiralty Way, Lekki Phase 1, Lagos',
  tariff: 'Band A (20+ hrs)',
  rate: '₦206.80/kWh',
}

export default function MeterVerification({ meterNumber, onMeterNumberChange, isVerified, onVerify }) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState('')

  const handleVerify = async () => {
    if (meterNumber.trim().length < 6) {
      setError('Enter a valid meter/account number')
      return
    }
    setError('')
    setIsVerifying(true)

    // TODO: replace with real API call, e.g.
    // const { data } = await api.get(`/vtu/electricity/verify/?meter=${meterNumber}`)
    await new Promise((resolve) => setTimeout(resolve, 1200))

    setIsVerifying(false)
    onVerify(MOCK_CUSTOMER)
  }

  return (
    <section className="flex flex-col gap-2">
      <div className="p-4 bg-card rounded-lg shadow-sm flex flex-col gap-3">
        <label htmlFor="meter-number" className="text-label-md text-text-secondary">
          Meter / Account Number
        </label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              id="meter-number"
              type="text"
              inputMode="numeric"
              value={meterNumber}
              onChange={(e) => {
                onMeterNumberChange(e.target.value.replace(/\D/g, ''))
                setError('')
              }}
              placeholder="Enter meter number"
              className="w-full bg-bg text-text-primary text-title-md tracking-wider px-3.5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20 transition-colors"
            />
            <MdPin size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary" />
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
          <div className="p-3.5 bg-bg rounded-lg flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-label-sm text-text-secondary uppercase tracking-wider">Account Found</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tangerine-light text-brand text-label-sm font-semibold">
                <MdCheckCircle size={14} />
                Verified
              </span>
            </div>
            <div className="flex flex-col">
              <p className="text-title-md text-text-primary font-semibold">{MOCK_CUSTOMER.name}</p>
              <p className="text-body-sm text-text-secondary flex items-start gap-1 mt-0.5">
                <MdLocationOn size={16} className="text-text-secondary shrink-0 mt-0.5" />
                <span>{MOCK_CUSTOMER.address}</span>
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between text-label-sm text-text-secondary border-t border-border">
              <span>
                Tariff: <strong className="text-text-primary">{MOCK_CUSTOMER.tariff}</strong>
              </span>
              <span>
                Rate: <strong className="text-text-primary">{MOCK_CUSTOMER.rate}</strong>
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}