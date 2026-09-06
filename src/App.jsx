import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import AuthLayout from './components/layout/AuthLayout'
import HomeDashboard from './pages/dashboard/HomeDashboard'

function App() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        {/* Login, Register, OTP, Forgot Password will go here */}
      </Route>

      {/* Authenticated app routes */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<HomeDashboard />} />
      </Route>

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App