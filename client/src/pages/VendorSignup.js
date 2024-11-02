// src/pages/VendorDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const VendorDetail = () => {
  const { vendorId } = useParams();  // Retrieve vendor ID from URL parameters

  // Example data (this should ideally come from an API)
  const vendor = {
    id: vendorId,
    name: "Mama's Kitchen",
    logo: "/images/vendor-logo.jpg",  // Placeholder image
    hours: "9 AM - 9 PM",
    location: "123 Foodie Street, Port Harcourt",
    rating: 4.8,
    menu: [
      { id: 1, name: 'Jollof Rice', description: 'Spicy and flavorful', price: 8.99 },
      { id: 2, name: 'Fried Plantains', description: 'Golden and crispy', price: 4.99 },
      { id: 3, name: 'Egusi Soup', description: 'Delicious and hearty', price: 10.99 },
    ],
    reviews: [
      { id: 1, user: 'John Doe', rating: 5, comment: 'Amazing food!' },
      { id: 2, user: 'Jane Smith', rating: 4, comment: 'Very tasty, will order again.' },
    ],
  };

  const addToCart = (item) => {
    console.log(`Added ${item.name} to cart!`);
    // Implement your actual add to cart functionality here
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Vendor Information */}
      <div className="flex items-center mb-6">
        <img src={vendor.logo} alt={vendor.name} className="w-24 h-24 rounded-full mr-4" />
        <div>
          <h1 className="text-3xl font-bold text-primary">{vendor.name}</h1>
          <p className="text-gray-700">Rating: {vendor.rating} / 5</p>
          <p className="text-gray-700">Hours: {vendor.hours}</p>
          <p className="text-gray-700">Location: {vendor.location}</p>
        </div>
      </div>

      {/* Menu Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Menu</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {vendor.menu.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition duration-200">
              <h3 className="text-lg font-bold text-secondary">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-primary font-semibold">${item.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart(item)}
                className="bg-primary text-white py-2 px-4 rounded mt-2 hover:bg-secondary transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Customer Reviews</h2>
        <div>
          {vendor.reviews.map((review) => (
            <div key={review.id} className="bg-white p-4 rounded-lg shadow mb-4">
              <p className="text-secondary font-bold">{review.user}</p>
              <p className="text-yellow-500">Rating: {review.rating} / 5</p>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorDetail;
