const NETWORKS = [
  { id: 'mtn', label: 'MTN', initial: 'M', bg: '#FFCC00', text: '#171717' },
  { id: 'airtel', label: 'Airtel', initial: 'A', bg: '#E60000', text: '#FFFFFF' },
  { id: 'glo', label: 'Glo', initial: 'G', bg: '#28B446', text: '#FFFFFF' },
  { id: '9mobile', label: '9mobile', initial: '9', bg: '#005B38', text: '#FFFFFF' },
]

export default function NetworkSelector({ value, onChange }) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-1">
        <span className="text-label-md text-text-secondary uppercase tracking-wider">Select Network</span>
      </div>
      <div className="grid grid-cols-4 gap-2.5">
        {NETWORKS.map((network) => {
          const isActive = value === network.id
          return (
            <button
              key={network.id}
              type="button"
              onClick={() => onChange(network.id)}
              className={`relative flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-lg bg-card shadow-sm transition-all ${
                isActive ? 'bg-tangerine-light shadow-md' : ''
              }`}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-title-lg"
                style={{ backgroundColor: network.bg, color: network.text }}
              >
                {network.initial}
              </div>
              <span className={`text-label-md ${isActive ? 'text-brand font-semibold' : 'text-text-secondary'}`}>
                {network.label}
              </span>
              {isActive && (
                <div className="absolute top-1 right-1 w-4 h-4 bg-brand text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                  ✓
                </div>
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}