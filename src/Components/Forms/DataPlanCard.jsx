export default function DataPlanCard({ plan, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(plan)}
      className={`flex flex-col items-start gap-1 p-3 rounded-lg border transition-all text-left ${
        isSelected
          ? 'bg-tangerine-light border-brand shadow-sm'
          : 'bg-card border-border hover:border-brand/40'
      }`}
    >
      <span className={`text-title-md font-bold ${isSelected ? 'text-brand' : 'text-text-primary'}`}>
        {plan.size}
      </span>
      <span className="text-label-lg font-semibold text-text-primary">₦{plan.price.toLocaleString('en-NG')}</span>
      <span className="text-body-sm text-text-secondary">{plan.validity}</span>
    </button>
  )
}