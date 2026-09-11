import { MdSyncAlt, MdCreditCard, MdDialpad, MdChevronRight } from 'react-icons/md'

const CHANNELS = [
  {
    id: 'transfer',
    label: 'Bank Transfer',
    description: 'Instant auto-credit via dedicated account',
    icon: MdSyncAlt,
    badge: 'Most Popular',
  },
  {
    id: 'card',
    label: 'Debit or Credit Card',
    description: 'Mastercard, Visa, Verve (instant)',
    icon: MdCreditCard,
  },
  {
    id: 'ussd',
    label: 'USSD & Direct Dial',
    description: 'Quick dial code for offline funding',
    icon: MdDialpad,
  },
]

export default function FundingChannels({ onSelect }) {
  return (
    <section className="flex flex-col gap-2.5">
      <span className="text-title-md text-text-primary">Funding Channels</span>
      {CHANNELS.map((channel) => {
        const Icon = channel.icon
        return (
          <button
            key={channel.id}
            type="button"
            onClick={() => onSelect(channel.id)}
            className="w-full p-4 rounded-lg bg-card shadow-sm flex items-center justify-between gap-3 hover:shadow-md transition-all active:scale-[0.99]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                  channel.badge ? 'bg-tangerine-light text-brand' : 'bg-bg text-text-secondary'
                }`}
              >
                <Icon size={24} />
              </div>
              <div className="flex flex-col min-w-0 items-start">
                <div className="flex items-center gap-2">
                  <span className="text-title-md text-text-primary truncate">{channel.label}</span>
                  {channel.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-brand text-white text-label-sm shrink-0">
                      {channel.badge}
                    </span>
                  )}
                </div>
                <span className="text-body-sm text-text-secondary truncate">{channel.description}</span>
              </div>
            </div>
            <MdChevronRight size={20} className="text-text-secondary shrink-0" />
          </button>
        )
      })}
    </section>
  )
}