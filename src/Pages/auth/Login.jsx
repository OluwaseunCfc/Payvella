import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { MdVisibility, MdVisibilityOff, MdEmail, MdLock } from 'react-icons/md'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address'
    }
    if (!form.password) {
      newErrors.password = 'Password is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    // TODO: replace with real API call, e.g.
    // const { data } = await api.post('/auth/login/', form)
    await new Promise((resolve) => setTimeout(resolve, 1200))

    setIsSubmitting(false)
    toast.success('Login successful')
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
      <div className="flex flex-col gap-1">
        <h1 className="text-headline-lg text-text-primary">Welcome back</h1>
        <p className="text-body-md text-text-secondary">Sign in to continue to PAYVELLA</p>
      </div>

      <div className="flex flex-col gap-4">
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
              className={`w-full h-12 pl-10 pr-4 rounded-md bg-card border text-body-md text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand/20 transition-colors ${
                errors.email ? 'border-error' : 'border-border focus:border-brand'
              }`}
            />
          </div>
          {errors.email && <span className="text-body-sm text-error">{errors.email}</span>}
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
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full h-12 pl-10 pr-11 rounded-md bg-card border text-body-md text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand/20 transition-colors ${
                errors.password ? 'border-error' : 'border-border focus:border-brand'
              }`}
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
          {errors.password && <span className="text-body-sm text-error">{errors.password}</span>}
        </div>

        {/* Remember me + Forgot password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-body-sm text-text-secondary cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-border accent-[#F97316]"
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-body-sm text-brand font-semibold">
            Forgot password?
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 rounded-md bg-brand hover:bg-brand-dark text-white text-label-lg font-bold flex items-center justify-center active:scale-95 transition-all disabled:opacity-60 disabled:active:scale-100"
      >
        {isSubmitting ? 'Signing in...' : 'Login'}
      </button>

      <p className="text-center text-body-sm text-text-secondary">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="text-brand font-semibold">
          Create account
        </Link>
      </p>
    </form>
  )
}