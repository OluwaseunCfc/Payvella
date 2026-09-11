import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import AuthLayout from './components/layout/AuthLayout'
import ProtectedRoute from './components/layout/ProtectedRoute'
import SplashScreen from './pages/public/SplashScreen'
import HomeDashboard from './pages/dashboard/HomeDashboard'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import OtpVerification from './pages/auth/OtpVerification'
import ForgotPassword from './pages/auth/ForgotPassword'
import Airtime from './pages/services/Airtime'
import Data from './pages/services/Data'
import Electricity from './pages/services/Electricity'
import CableTv from './pages/services/CableTv'
import Betting from './pages/services/Betting'
import ExamPin from './pages/services/ExamPin'
import Wallet from './pages/wallet/Wallet'
import FundWallet from './pages/wallet/FundWallet'
import TransactionHistory from './pages/transactions/TransactionHistory'
import TransactionDetails from './pages/transactions/TransactionDetails'

function App() {
  return (
    <Routes>
      {/* Splash / entry point */}
      <Route path="/" element={<SplashScreen />} />

      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Authenticated app routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<HomeDashboard />} />
          <Route path="/airtime" element={<Airtime />} />
          <Route path="/data" element={<Data />} />
          <Route path="/electricity" element={<Electricity />} />
          <Route path="/cable-tv" element={<CableTv />} />
          <Route path="/betting" element={<Betting />} />
          <Route path="/exam-pin" element={<ExamPin />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/wallet/fund" element={<FundWallet />} />
          <Route path="/transactions" element={<TransactionHistory />} />
          <Route path="/transactions/:id" element={<TransactionDetails />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App