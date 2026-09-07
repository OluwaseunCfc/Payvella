import { MdVerified } from 'react-icons/md'
import WalletCard from "../../Components/Dashboard/WalletCard";
import QuickActions from "../../Components/Dashboard/QuickActions";
import ServiceGrid from "../../Components/Dashboard/ServiceGrid";
import PromoCarousel from "../../Components/Dashboard/PromoCarousel";
import RecentTransactions from "../../Components/Dashboard/RecentTransactions";
import { mockUser } from '../../data/mockData'

export default function HomeDashboard() {
  return (
    <div className="flex flex-col gap-5">
      {/* Greeting */}
      <section className="flex items-center justify-between pt-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <h1 className="text-headline-sm text-text-primary">Hi, {mockUser.name}</h1>
            <span className="text-lg"></span>
          </div>
          <p className="text-body-sm text-text-secondary">Good day, what are we paying today?</p>
        </div>
        <div className="flex items-center gap-1 bg-card px-2 py-1 rounded-full shadow-sm">
          <MdVerified size={14} className="text-brand" />
          <span className="text-label-sm text-text-secondary uppercase tracking-wider">Tier 2</span>
        </div>
      </section>

      <WalletCard balance={mockUser.balance} cashBonus={450} />

      <QuickActions />

      <ServiceGrid />

      <PromoCarousel />

      <RecentTransactions />
    </div>
  )
}