import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import AuthLayout from './components/layout/AuthLayout'
import HomeDashboard from './pages/dashboard/HomeDashboard'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import OtpVerification from './pages/auth/OtpVerification'


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

      {/* Login route */}
      <Route path="/login" element={<Login />} />

      {/* Register route */}
      <Route path="/register" element={<Register />} />

      {/* OTP Verification route */}\
      <Route path="/otp-verification" element={<OtpVerification />} />
    </Routes>
  )
}

export default App