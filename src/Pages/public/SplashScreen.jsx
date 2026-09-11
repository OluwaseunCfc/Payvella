import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const SPLASH_DURATION = 1600

export default function SplashScreen() {
  const navigate = useNavigate()
  const { isAuthenticated, isReady } = useAuth()

  useEffect(() => {
    if (!isReady) return

    const timer = setTimeout(() => {
      navigate(isAuthenticated ? '/dashboard' : '/login', { replace: true })
    }, SPLASH_DURATION)

    return () => clearTimeout(timer)
  }, [isReady, isAuthenticated, navigate])

  return (
    <div className="w-full max-w-[480px] mx-auto min-h-screen flex flex-col items-center justify-center bg-midnight gap-4">
      <div className="w-20 h-20 rounded-2xl bg-brand flex items-center justify-center shadow-xl animate-pulse">
        <span className="text-white font-extrabold text-display-sm">P</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-headline-md text-white font-bold tracking-tight">PAYVELLA</span>
        <span className="text-body-sm text-white/60">Pay. Top up. Keep moving.</span>
      </div>
    </div>
  )
}