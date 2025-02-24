import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import VerifyOTP from './pages/VerifyOTP'; // ✅ Import VerifyOTP page
import ForgotPassword from './pages/ForgotPassword'; // Import the new page
import ResendOTP from './pages/ResendOTP'; // ✅ Import ResendOTP page
import ResetPassword from './pages/ResetPassword'; // ✅ Import ResetPassword page
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
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


        
        {/* forgot paswword page */}
        <Route path="/forgot-password" element={<ForgotPassword />} />


        {/* Reviews Page */}
        <Route path="/reviews" element={<CustomerReviews />} />

        {/* ✅ New OTP & Password Reset Pages */}
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/resend-otp" element={<ResendOTP />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
