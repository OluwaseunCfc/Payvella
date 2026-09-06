import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="w-full max-w-[480px] mx-auto min-h-screen flex flex-col bg-bg px-6 py-8">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-9 h-9 rounded-lg bg-midnight flex items-center justify-center">
          <span className="text-brand font-bold text-base">P</span>
        </div>
        <span className="text-headline-sm text-text-primary">PAYVELLA</span>
      </div>

      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  )
}