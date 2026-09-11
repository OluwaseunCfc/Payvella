import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import BottomNavigation from './BottomNavigation'

const PAGE_LABELS = {
  '/dashboard': 'Home',
  '/transactions': 'Transactions',
  '/wallet': 'Wallet',
  '/rewards': 'Rewards',
  '/profile': 'Profile',
  '/airtime': 'Buy Airtime',
  '/data': 'Buy Data',
  '/electricity': 'Electricity',
  '/cable-tv': 'Cable TV',
  '/betting': 'Betting',
  '/exam-pin': 'Exam PIN',
  '/notifications': 'Notifications',
  '/settings': 'Settings',
  '/security': 'Security',
  '/help': 'Help & Support',
  '/about': 'About PAYVELLA',
}

export default function AppLayout() {
  const location = useLocation()
  const pageLabel = PAGE_LABELS[location.pathname] || 'PAYVELLA'

  return (
    <div className="w-full max-w-[480px] mx-auto min-h-screen flex flex-col relative bg-bg">
      <Navbar pageLabel={pageLabel} />
      <main className="flex-1 flex flex-col w-full px-4 pt-20 pb-28">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  )
}