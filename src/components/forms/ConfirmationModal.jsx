import { MdClose } from 'react-icons/md'

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title = 'Confirm Payment', rows = [], isProcessing = false }) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[480px] bg-card rounded-t-xl p-5 flex flex-col gap-4 animate-[slideUp_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-headline-sm text-text-primary">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 flex items-center justify-center rounded-full text-text-secondary hover:bg-bg transition-colors"
          >
            <MdClose size={20} />
          </button>
        </div>

        <div className="flex flex-col divide-y divide-border">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between py-2.5">
              <span className="text-body-md text-text-secondary">{row.label}</span>
              <span
                className={`text-body-md text-right ${
                  row.emphasize ? 'text-title-md font-bold text-text-primary' : 'text-text-primary'
                }`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onConfirm}
          disabled={isProcessing}
          className="w-full h-12 rounded-full bg-brand hover:bg-brand-dark text-white text-label-lg font-bold flex items-center justify-center active:scale-95 transition-all disabled:opacity-60 disabled:active:scale-100"
        >
          {isProcessing ? 'Processing...' : 'Confirm Payment'}
        </button>

        <button
          type="button"
          onClick={onClose}
          disabled={isProcessing}
          className="w-full text-center text-body-sm text-text-secondary"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}