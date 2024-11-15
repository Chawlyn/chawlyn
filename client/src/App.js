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
import CustomerProfile from './pages/CustomerProfile';
import OrderDetail from './pages/OrderDetail';
import CustomerReviews from './pages/CustomerReviews'; // Import CustomerReviews component

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
        <Route path="/order-tracking" element={<OrderTracking />} />
        
        {/* Customer Profile and Order History Routes */}
        <Route path="/profile" element={<CustomerProfile />} /> 
        <Route path="/order/:orderId" element={<OrderDetail />} />

        {/* Customer Reviews Route */}
        <Route path="/reviews" element={<CustomerReviews />} /> {/* Customer Reviews Page */}
      </Routes>
    </Router>
  );
}

export default App;
