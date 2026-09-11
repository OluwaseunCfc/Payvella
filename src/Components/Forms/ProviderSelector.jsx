import { MdExpandMore } from 'react-icons/md'

export default function ProviderSelector({ providers, value, onChange, label = 'Select Provider' }) {
  const selected = providers.find((p) => p.id === value) || providers[0]

  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-label-md text-text-secondary">{label}</label>
        <span className="text-label-sm text-brand flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          API Live
        </span>
      </div>

      {/* Selected provider display */}
      <div className="w-full flex items-center justify-between p-3.5 bg-card rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-tangerine-light flex items-center justify-center text-brand text-title-lg font-bold">
            {selected.icon || selected.label.charAt(0)}
          </div>
          <div>
            <p className="text-title-md text-text-primary">{selected.label}</p>
            <p className="text-body-sm text-text-secondary">{selected.subtitle}</p>
          </div>
        </div>
        <MdExpandMore size={22} className="text-text-secondary" />
      </div>

      {/* Quick selector chips */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {providers.map((provider) => {
          const isActive = provider.id === value
          return (
            <button
              key={provider.id}
              type="button"
              onClick={() => onChange(provider.id)}
              className={`shrink-0 px-3 py-1.5 rounded-md text-label-sm transition-colors ${
                isActive
                  ? 'bg-tangerine-light text-brand font-semibold shadow-sm'
                  : 'bg-bg text-text-secondary hover:bg-border/40'
              }`}
            >
              {provider.short}
            </button>
          )
        })}
      </div>
    </section>
  )
}