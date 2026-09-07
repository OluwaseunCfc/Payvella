import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './Components/Layout/AppLayout'
import AuthLayout from './Components/Layout/AuthLayout'
import HomeDashboard from './Pages/dashboard/HomeDashboard'
import Login from './Pages/auth/Login'
import Register from './Pages/auth/Register'
import OtpVerification from './Pages/auth/OtpVerification'
import ForgotPassword from './Pages/auth/ForgotPassword'
import Airtime from './Pages/services/Airtime'
import Data from './Pages/services/Data'

function App() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Authenticated app routes */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<HomeDashboard />} />
        <Route path="/airtime" element={<Airtime />} />
        <Route path="/data" element={<Data />} />
      </Route>

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App