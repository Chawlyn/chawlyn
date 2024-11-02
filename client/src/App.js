import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';  // Import the Explore component
import VendorSignup from './pages/VendorSignup';
import CustomerSignup from './pages/CustomerSignup';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />  {/* Navbar for navigation */}
      <Routes>
        <Route path="/" element={<Home />} />                 {/* Home page */}
        <Route path="/explore" element={<Explore />} />       {/* Explore page */}
        <Route path="/vendor-signup" element={<VendorSignup />} /> {/* Vendor Signup */}
        <Route path="/customer-signup" element={<CustomerSignup />} /> {/* Customer Signup */}
      </Routes>
    </Router>
  );
}

export default App;
