import { useState, useCallback } from 'react'

const STORAGE_KEY = 'payvella_txn_pin'
const DEFAULT_PIN = '1234' // demo default until account setup flow exists

export function useTransactionPin() {
  const [attempts, setAttempts] = useState(0)

  const getStoredPin = useCallback(() => {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_PIN
  }, [])

  const verifyPin = useCallback(
    (input) => {
      const isCorrect = input === getStoredPin()
      if (!isCorrect) {
        setAttempts((prev) => prev + 1)
      } else {
        setAttempts(0)
      }
      return isCorrect
    },
    [getStoredPin]
  )

  const setPin = useCallback((newPin) => {
    localStorage.setItem(STORAGE_KEY, newPin)
  }, [])

  const hasCustomPin = useCallback(() => {
    return localStorage.getItem(STORAGE_KEY) !== null
  }, [])

  const resetAttempts = useCallback(() => setAttempts(0), [])

  return { verifyPin, setPin, hasCustomPin, attempts, resetAttempts }
}