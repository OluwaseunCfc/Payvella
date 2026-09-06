import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const OTP_LENGTH = 6
const RESEND_SECONDS = 60

const maskPhone = (phone) => {
  if (!phone) return 'your phone'
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 7) return phone
  return `${digits.slice(0, 4)} ${'*'.repeat(3)} ${digits.slice(-4)}`
}

export default function OtpVerification() {
  const location = useLocation()
  const navigate = useNavigate()
  const phone = location.state?.phone

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
  const [status, setStatus] = useState('idle') // idle | error | success
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const inputRefs = useRef([])

  useEffect(() => {
    if (secondsLeft <= 0) return
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearInterval(timer)
  }, [secondsLeft])

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const digit = value.slice(-1)
    const next = [...otp]
    next[index] = digit
    setOtp(next)
    setStatus('idle')

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!pasted) return
    e.preventDefault()
    const next = Array(OTP_LENGTH).fill('')
    pasted.split('').forEach((char, i) => (next[i] = char))
    setOtp(next)
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus()
  }

  const handleResend = () => {
    if (secondsLeft > 0) return
    // TODO: replace with real API call, e.g. api.post('/auth/resend-otp/', { phone })
    setSecondsLeft(RESEND_SECONDS)
    toast.success('A new code has been sent')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length !== OTP_LENGTH) {
      setStatus('error')
      return
    }

    setIsSubmitting(true)

    // TODO: replace with real API call, e.g.
    // const { data } = await api.post('/auth/verify-otp/', { phone, code })
    await new Promise((resolve) => setTimeout(resolve, 1200))

    setIsSubmitting(false)
    setStatus('success')
    toast.success('Phone verified successfully')
    setTimeout(() => navigate('/dashboard'), 700)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
      <div className="flex flex-col gap-1">
        <h1 className="text-headline-lg text-text-primary">Verify your number</h1>
        <p className="text-body-md text-text-secondary">
          Enter the 6-digit code sent to <span className="text-text-primary font-semibold">{maskPhone(phone)}</span>
        </p>
      </div>

      <div className="flex items-center justify-between gap-2" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`w-12 h-14 text-center text-headline-md font-bold rounded-md bg-card border focus:outline-none focus:ring-2 focus:ring-brand/20 transition-colors ${
              status === 'error'
                ? 'border-error'
                : status === 'success'
                  ? 'border-success'
                  : 'border-border focus:border-brand'
            }`}
          />
        ))}
      </div>

      {status === 'error' && (
        <span className="text-body-sm text-error text-center">
          Incomplete or incorrect code. Please try again.
        </span>
      )}
      {status === 'success' && (
        <span className="text-body-sm text-success text-center">Verified! Redirecting...</span>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 rounded-md bg-brand hover:bg-brand-dark text-white text-label-lg font-bold flex items-center justify-center active:scale-95 transition-all disabled:opacity-60 disabled:active:scale-100"
      >
        {isSubmitting ? 'Verifying...' : 'Verify'}
      </button>

      <p className="text-center text-body-sm text-text-secondary">
        {secondsLeft > 0 ? (
          <>Resend code in <span className="text-text-primary font-semibold">{secondsLeft}s</span></>
        ) : (
          <button type="button" onClick={handleResend} className="text-brand font-semibold">
            Resend code
          </button>
        )}
      </p>

      <Link to="/login" className="text-center text-body-sm text-text-secondary">
        Back to sign in
      </Link>
    </form>
  )
}