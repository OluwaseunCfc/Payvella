import { Link } from 'react-router-dom'
import { MdAccountBalanceWallet, MdCallMade, MdAccountBalance, MdApps } from 'react-icons/md'

const ACTIONS = [
  { to: '/wallet/fund', label: 'Fund', icon: MdAccountBalanceWallet },
  { to: '/wallet/send', label: 'Send', icon: MdCallMade },
  { to: '/wallet/withdraw', label: 'Withdraw', icon: MdAccountBalance },
  { to: '/services', label: 'More', icon: MdApps },
]

export default function QuickActions() {
  return (
    <section className="grid grid-cols-4 gap-2">
      {ACTIONS.map(({ to, label, icon: Icon }) => (
        <Link
          key={label}
          to={to}
          className="group flex flex-col items-center gap-1.5 p-2 rounded-lg bg-card shadow-sm hover:shadow-md transition-all active:scale-95"
        >
          <div className="w-11 h-11 rounded-full bg-tangerine-light flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-colors">
            <Icon size={20} />
          </div>
          <span className="text-label-sm text-text-secondary">{label}</span>
        </Link>
      ))}
    </section>
  )
}