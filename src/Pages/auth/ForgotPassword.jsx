import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { MdEmail, MdCheckCircle } from 'react-icons/md'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleChange = (e) => {
    setEmail(e.target.value)
    setError('')
  }

  const validate = () => {
    if (!email.trim()) {
      setError('Email is required')
      return false
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email address')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    // TODO: replace with real API call, e.g.
    // await api.post('/auth/forgot-password/', { email })
    await new Promise((resolve) => setTimeout(resolve, 1200))

    setIsSubmitting(false)
    setIsSent(true)
    toast.success('Reset link sent')
  }

  if (isSent) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-success-bg flex items-center justify-center">
          <MdCheckCircle size={32} className="text-success" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-headline-md text-text-primary">Check your email</h1>
          <p className="text-body-md text-text-secondary max-w-xs">
            We&apos;ve sent a password reset link to <span className="text-text-primary font-semibold">{email}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="w-full h-12 rounded-md bg-brand hover:bg-brand-dark text-white text-label-lg font-bold flex items-center justify-center active:scale-95 transition-all mt-2"
        >
          Back to sign in
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
      <div className="flex flex-col gap-1">
        <h1 className="text-headline-lg text-text-primary">Forgot password?</h1>
        <p className="text-body-md text-text-secondary">
          Enter your email and we&apos;ll send you a link to reset your password
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-label-lg text-text-primary">
          Email
        </label>
        <div className="relative">
          <MdEmail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={`w-full h-12 pl-10 pr-4 rounded-md bg-card border text-body-md text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand/20 transition-colors ${
              error ? 'border-error' : 'border-border focus:border-brand'
            }`}
          />
        </div>
        {error && <span className="text-body-sm text-error">{error}</span>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 rounded-md bg-brand hover:bg-brand-dark text-white text-label-lg font-bold flex items-center justify-center active:scale-95 transition-all disabled:opacity-60 disabled:active:scale-100"
      >
        {isSubmitting ? 'Sending...' : 'Send reset link'}
      </button>

      <Link to="/login" className="text-center text-body-sm text-text-secondary">
        Back to sign in
      </Link>
    </form>
  )
}