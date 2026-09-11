import { NavLink } from 'react-router-dom'
import { MdHome, MdReceiptLong, MdCreditCard, MdCardGiftcard, MdPerson } from 'react-icons/md'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Home', icon: MdHome },
  { to: '/transactions', label: 'Transactions', icon: MdReceiptLong },
  { to: '/wallet', label: 'Wallet', icon: MdCreditCard },
  { to: '/rewards', label: 'Rewards', icon: MdCardGiftcard },
  { to: '/profile', label: 'Profile', icon: MdPerson },
]

export default function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto w-full max-w-[480px] bg-card/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)] pb-safe">
      <div className="flex items-center justify-around h-16 px-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 min-w-[54px] min-h-[44px] transition-colors ${
                isActive ? 'text-brand font-semibold' : 'text-text-secondary'
              }`
            }
          >
            <Icon size={24} />
            <span className="text-label-sm">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}