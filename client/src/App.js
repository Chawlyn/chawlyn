import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import VendorSignup from './pages/VendorSignup';
import CustomerSignup from './pages/CustomerSignup';
import VendorDetail from './pages/VendorDetail';    // Import VendorDetail component
import FoodItemDetail from './pages/FoodItemDetail'; // Import FoodItemDetail component
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />                        {/* Home Page */}
        <Route path="/explore" element={<Explore />} />              {/* Explore Page */}
        <Route path="/vendor-signup" element={<VendorSignup />} />   {/* Vendor Signup Page */}
        <Route path="/customer-signup" element={<CustomerSignup />} /> {/* Customer Signup Page */}
        <Route path="/vendors/:vendorId" element={<VendorDetail />} /> {/* Vendor Detail Page */}
        <Route path="/items/:itemId" element={<FoodItemDetail />} />   {/* Food Item Detail Page */}
      </Routes>
    </Router>
  );
}

export default App;
