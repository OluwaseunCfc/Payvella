import { Link } from 'react-router-dom'
import { MdSupportAgent, MdNotifications } from 'react-icons/md'

export default function Navbar({ pageLabel = 'Home', avatarUrl }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 mx-auto w-full max-w-[480px] bg-bg/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 px-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-midnight flex items-center justify-center">
            <span className="text-brand font-bold text-sm">P</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-headline-sm text-text-primary">PAYVELLA</span>
            <span className="text-label-sm text-text-secondary">{pageLabel}</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Link
            to="/help"
            aria-label="Customer Support"
            className="w-11 h-11 flex items-center justify-center rounded-full text-text-secondary hover:text-brand hover:bg-tangerine-light transition-colors"
          >
            <MdSupportAgent size={22} />
          </Link>

          <Link
            to="/notifications"
            aria-label="Notifications"
            className="relative w-11 h-11 flex items-center justify-center rounded-full text-text-secondary hover:text-brand hover:bg-tangerine-light transition-colors"
          >
            <MdNotifications size={22} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-brand" />
          </Link>

          <Link to="/profile" aria-label="Profile" className="w-11 h-11 flex items-center justify-center pl-1">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-tangerine-light flex items-center justify-center text-brand font-semibold text-sm">
                O
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}