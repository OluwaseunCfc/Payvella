import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { MdVisibility, MdVisibilityOff, MdEmail, MdLock, MdPerson, MdPhone, MdCardGiftcard } from 'react-icons/md'

const getPasswordStrength = (password) => {
  if (!password) return { label: '', percent: 0, color: '' }
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { label: 'Weak', percent: 25, color: 'bg-error' }
  if (score === 2) return { label: 'Fair', percent: 50, color: 'bg-warning' }
  if (score === 3) return { label: 'Good', percent: 75, color: 'bg-info' }
  return { label: 'Strong', percent: 100, color: 'bg-success' }
}

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const strength = getPasswordStrength(form.password)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address'
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^0[789][01]\d{8}$/.test(form.phone.trim())) {
      newErrors.phone = 'Enter a valid Nigerian phone number'
    }
    if (!form.password) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms to continue'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    // TODO: replace with real API call, e.g.
    // const { data } = await api.post('/auth/register/', form)
    await new Promise((resolve) => setTimeout(resolve, 1200))

    setIsSubmitting(false)
    toast.success('Account created — verify your phone to continue')
    navigate('/otp-verification', { state: { phone: form.phone } })
  }

  const inputClass = (field) =>
    `w-full h-12 pl-10 pr-4 rounded-md bg-card border text-body-md text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand/20 transition-colors ${
      errors[field] ? 'border-error' : 'border-border focus:border-brand'
    }`

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
      <div className="flex flex-col gap-1">
        <h1 className="text-headline-lg text-text-primary">Create your account</h1>
        <p className="text-body-md text-text-secondary">Join PAYVELLA in less than a minute</p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Full name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fullName" className="text-label-lg text-text-primary">
            Full name
          </label>
          <div className="relative">
            <MdPerson size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Oluwaseun Adeyelu"
              className={inputClass('fullName')}
            />
          </div>
          {errors.fullName && <span className="text-body-sm text-error">{errors.fullName}</span>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-label-lg text-text-primary">
            Email
          </label>
          <div className="relative">
            <MdEmail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={inputClass('email')}
            />
          </div>
          {errors.email && <span className="text-body-sm text-error">{errors.email}</span>}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-label-lg text-text-primary">
            Phone number
          </label>
          <div className="relative">
            <MdPhone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="0803 123 4567"
              className={inputClass('phone')}
            />
          </div>
          {errors.phone && <span className="text-body-sm text-error">{errors.phone}</span>}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-label-lg text-text-primary">
            Password
          </label>
          <div className="relative">
            <MdLock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              className={inputClass('password') + ' pr-11'}
            />
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
            >
              {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
            </button>
          </div>
          {form.password && (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${strength.color}`}
                  style={{ width: `${strength.percent}%` }}
                />
              </div>
              <span className="text-label-sm text-text-secondary">{strength.label}</span>
            </div>
          )}
          {errors.password && <span className="text-body-sm text-error">{errors.password}</span>}
        </div>

        {/* Confirm password */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirmPassword" className="text-label-lg text-text-primary">
            Confirm password
          </label>
          <div className="relative">
            <MdLock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className={inputClass('confirmPassword') + ' pr-11'}
            />
            <button
              type="button"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
            >
              {showConfirmPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
            </button>
          </div>
          {errors.confirmPassword && <span className="text-body-sm text-error">{errors.confirmPassword}</span>}
        </div>

        {/* Referral code (optional) */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="referralCode" className="text-label-lg text-text-primary">
            Referral code <span className="text-text-muted font-normal">(optional)</span>
          </label>
          <div className="relative">
            <MdCardGiftcard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              id="referralCode"
              name="referralCode"
              value={form.referralCode}
              onChange={handleChange}
              placeholder="Enter referral code"
              className={inputClass('referralCode')}
            />
          </div>
        </div>

        {/* Terms */}
        <div className="flex flex-col gap-1">
          <label className="flex items-start gap-2 text-body-sm text-text-secondary cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => {
                setAgreedToTerms(e.target.checked)
                setErrors((prev) => ({ ...prev, terms: '' }))
              }}
              className="w-4 h-4 mt-0.5 rounded border-border accent-[#F97316]"
            />
            <span>
              I agree to the{' '}
              <Link to="/terms" className="text-brand font-semibold">
                Terms & Conditions
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-brand font-semibold">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.terms && <span className="text-body-sm text-error">{errors.terms}</span>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 rounded-md bg-brand hover:bg-brand-dark text-white text-label-lg font-bold flex items-center justify-center active:scale-95 transition-all disabled:opacity-60 disabled:active:scale-100"
      >
        {isSubmitting ? 'Creating account...' : 'Create account'}
      </button>

      <p className="text-center text-body-sm text-text-secondary">
        Already have an account?{' '}
        <Link to="/login" className="text-brand font-semibold">
          Sign in
        </Link>
      </p>
    </form>
  )
}