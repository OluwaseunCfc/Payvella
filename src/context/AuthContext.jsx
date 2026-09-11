import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext(null)

const STORAGE_KEY = 'payvella_auth'

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  })
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Simulates checking a stored session/token on app load.
    // TODO: replace with a real token validation call once the backend exists.
    setIsReady(true)
  }, [])

  const login = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isReady, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}