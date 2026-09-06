import { Link } from 'react-router-dom'
import {
  MdPhoneAndroid,
  MdWifi,
  MdBolt,
  MdTv,
  MdSportsSoccer,
  MdSchool,
  MdCardGiftcard,
  MdGridView,
} from 'react-icons/md'

const SERVICES = [
  { to: '/airtime', label: 'Airtime', tag: '2% Back', icon: MdPhoneAndroid },
  { to: '/data', label: 'Data', tag: 'Hot Deals', icon: MdWifi },
  { to: '/electricity', label: 'Power', tag: 'Instant Token', icon: MdBolt },
  { to: '/cable-tv', label: 'Cable TV', tag: 'DSTV, GOtv', icon: MdTv },
  { to: '/betting', label: 'Betting', tag: 'Fast Top-up', icon: MdSportsSoccer },
  { to: '/exam-pin', label: 'Exam PIN', tag: 'WAEC, JAMB', icon: MdSchool },
  { to: '/rewards', label: 'Refer & Earn', tag: 'Instant Bonus', badge: '₦500', icon: MdCardGiftcard },
  { to: '/services', label: 'All Bills', tag: 'Explore 30+', icon: MdGridView },
]

export default function ServiceGrid() {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-title-lg text-text-primary">Bill Payments & VTU</h2>
        <span className="text-label-md text-brand flex items-center gap-1">Zero Charges</span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {SERVICES.map(({ to, label, tag, badge, icon: Icon }) => (
          <Link
            key={label}
            to={to}
            className="relative flex flex-col items-center gap-1.5 p-2 rounded-lg bg-card shadow-sm hover:shadow-md transition-all active:scale-95 text-center"
          >
            {badge && (
              <span className="absolute -top-1.5 right-1 text-[10px] font-bold bg-brand text-white px-1.5 py-0.5 rounded-full">
                {badge}
              </span>
            )}
            <div className="w-11 h-11 rounded-full bg-tangerine-light flex items-center justify-center text-brand">
              <Icon size={20} />
            </div>
            <span className="text-label-md text-text-primary font-medium leading-tight">{label}</span>
            <span className="text-[10px] text-brand leading-tight">{tag}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}