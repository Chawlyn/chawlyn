// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import VendorSignup from './pages/VendorSignup';
import CustomerSignup from './pages/CustomerSignup';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vendor-signup" element={<VendorSignup />} />
        <Route path="/customer-signup" element={<CustomerSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
