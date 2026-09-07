import { useState, useEffect } from 'react'
import { MdBackspace, MdClose, MdLock } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useTransactionPin } from '../../hooks/useTransactionPin'

const PIN_LENGTH = 4
const KEYPAD = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'back']

export default function PinEntry({ isOpen, onClose, onSuccess, amountLabel }) {
  const { verifyPin } = useTransactionPin()
  const [pin, setPin] = useState('')
  const [hasError, setHasError] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setPin('')
      setHasError(false)
      setIsVerifying(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (pin.length === PIN_LENGTH) {
      setIsVerifying(true)
      const timeout = setTimeout(() => {
        const correct = verifyPin(pin)
        if (correct) {
          onSuccess()
        } else {
          setHasError(true)
          setPin('')
          setIsVerifying(false)
        }
      }, 400)
      return () => clearTimeout(timeout)
    }
  }, [pin, verifyPin, onSuccess])

  if (!isOpen) return null

  const handleKeyPress = (key) => {
    if (isVerifying) return
    setHasError(false)
    if (key === 'back') {
      setPin((prev) => prev.slice(0, -1))
    } else if (key !== null && pin.length < PIN_LENGTH) {
      setPin((prev) => prev + key)
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-[480px] bg-card rounded-t-xl p-6 flex flex-col items-center gap-5 animate-[slideUp_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex items-center justify-between">
          <div className="w-9" />
          <div className="flex items-center gap-1.5 text-text-primary">
            <MdLock size={16} className="text-brand" />
            <span className="text-title-md">Enter Transaction PIN</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 flex items-center justify-center rounded-full text-text-secondary hover:bg-bg transition-colors"
          >
            <MdClose size={20} />
          </button>
        </div>

        {amountLabel && <p className="text-body-sm text-text-secondary -mt-2">Confirm payment of {amountLabel}</p>}

        {/* PIN dots */}
        <div className={`flex items-center gap-4 ${hasError ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}>
          {Array.from({ length: PIN_LENGTH }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border-2 transition-colors ${
                i < pin.length
                  ? hasError
                    ? 'bg-error border-error'
                    : 'bg-brand border-brand'
                  : 'border-border bg-transparent'
              }`}
            />
          ))}
        </div>

        {hasError && <span className="text-body-sm text-error -mt-3">Incorrect PIN. Please try again.</span>}

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[280px]">
          {KEYPAD.map((key, i) => {
            if (key === null) return <div key={`empty-${i}`} />
            if (key === 'back') {
              return (
                <button
                  key="back"
                  type="button"
                  onClick={() => handleKeyPress('back')}
                  className="h-14 rounded-full flex items-center justify-center text-text-secondary hover:bg-bg transition-colors"
                >
                  <MdBackspace size={22} />
                </button>
              )
            }
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleKeyPress(key)}
                className="h-14 rounded-full flex items-center justify-center text-headline-sm text-text-primary bg-bg hover:bg-border/40 active:scale-95 transition-all"
              >
                {key}
              </button>
            )
          })}
        </div>

        <Link to="/security" className="text-body-sm text-brand font-semibold">
          Forgot PIN?
        </Link>
      </div>
    </div>
  )
}