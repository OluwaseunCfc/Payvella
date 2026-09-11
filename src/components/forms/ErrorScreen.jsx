import { MdCancel } from 'react-icons/md'

export default function ErrorScreen({ reason = 'Something went wrong. Please try again.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-5 text-center py-8">
      <div className="w-20 h-20 rounded-full bg-error-bg flex items-center justify-center">
        <MdCancel size={48} className="text-error" />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-headline-md text-text-primary">Payment Failed</h1>
        <p className="text-body-md text-text-secondary max-w-xs">{reason}</p>
      </div>

      <div className="w-full flex flex-col gap-3 pt-2">
        <button
          type="button"
          onClick={onRetry}
          className="w-full h-12 rounded-md bg-brand hover:bg-brand-dark text-white text-label-lg font-bold flex items-center justify-center active:scale-95 transition-all"
        >
          Try Again
        </button>
      </div>

      <p className="text-body-sm text-text-secondary">
        Don't worry — if any amount was deducted, it will be reversed to your wallet within 24 hours.
      </p>
    </div>
  )
}