import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Explore from './pages/Explore';
import VendorSignup from './pages/VendorSignup';
import CustomerSignup from './pages/CustomerSignup';
import VendorDetail from './pages/VendorDetail';
import FoodItemDetail from './pages/FoodItemDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderTracking from './pages/OrderTracking';
import OrderHistory from './pages/OrderHistory';
import CustomerDashboard from './pages/CustomerDashboard';
import CustomerReviews from './pages/CustomerReviews';
import VendorDashboard from './pages/VendorDashboard';
import Login from './pages/Login';
import VerifyOTP from './pages/VerifyOTP';
import ForgotPassword from './pages/ForgotPassword';
import ResendOTP from './pages/ResendOTP';
import ResetPassword from './pages/ResetPassword';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';

// Wrapper component to handle route transitions
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      {/* Core Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/login" element={<Login />} />

      {/* Sign Up Pages */}
      <Route path="/vendor-signup" element={<VendorSignup />} />
      <Route path="/customer-signup" element={<CustomerSignup />} />

      {/* Dashboard and Detail Pages */}
      <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      <Route path="/vendor-dashboard" element={<VendorDashboard />} />
      <Route path="/vendors/:vendorId" element={<VendorDetail />} />
      <Route path="/items/:itemId" element={<FoodItemDetail />} />

      {/* Cart and Checkout Pages */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
      <Route path="/order-tracking" element={<OrderTracking />} />
      <Route path="/order-history" element={<OrderHistory />} />

      {/* Forgot password page */}
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Reviews Page */}
      <Route path="/reviews" element={<CustomerReviews />} />

      {/* OTP & Password Reset Pages */}
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/resend-otp" element={<ResendOTP />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <ToastProvider>
        <AnimatePresence mode="wait">
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8 pb-20 md:pb-8">
              <AnimatedRoutes />
            </main>
            <BottomNav />
          </div>
        </AnimatePresence>
      </ToastProvider>
    </Router>
  );
}

export default App;
