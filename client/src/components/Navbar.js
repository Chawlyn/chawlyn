import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-primary p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Chaw Republic
        </Link>
        {/* Menu Button for Mobile */}
        <button
          className="text-white md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? '✖' : '☰'} {/* Toggle icon */}
        </button>
        {/* Links for Desktop */}
        <div className="hidden md:flex space-x-4">
          <Link to="/explore" className="text-white hover:text-accent">Explore</Link>
          <Link to="/vendor-signup" className="text-white hover:text-accent">Vendor Signup</Link>
          <Link to="/customer-signup" className="text-white hover:text-accent">Customer Signup</Link>
          <Link to="/cart" className="text-white hover:text-accent">Cart</Link>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary text-white mt-2 p-4 space-y-2">
          <Link to="/explore" className="block hover:text-accent" onClick={toggleMenu}>Explore</Link>
          <Link to="/vendor-signup" className="block hover:text-accent" onClick={toggleMenu}>Vendor Signup</Link>
          <Link to="/customer-signup" className="block hover:text-accent" onClick={toggleMenu}>Customer Signup</Link>
          <Link to="/cart" className="block hover:text-accent" onClick={toggleMenu}>Cart</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
