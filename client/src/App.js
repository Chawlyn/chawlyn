import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import VendorSignup from './pages/VendorSignup';
import CustomerSignup from './pages/CustomerSignup';
import VendorDetail from './pages/VendorDetail';
import FoodItemDetail from './pages/FoodItemDetail';
import Cart from './pages/Cart';
import OrderConfirmation from './pages/OrderConfirmation';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking'; // Import OrderTracking component
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/vendor-signup" element={<VendorSignup />} />
        <Route path="/customer-signup" element={<CustomerSignup />} />
        <Route path="/vendors/:vendorId" element={<VendorDetail />} />
        <Route path="/items/:itemId" element={<FoodItemDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/order-tracking" element={<OrderTracking />} /> {/* Order Tracking Route */}
      </Routes>
    </Router>
  );
}

export default App;
