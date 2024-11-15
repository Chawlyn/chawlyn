// src/pages/CustomerReviews.js
import React, { useState } from 'react';

const CustomerReviews = () => {
  // Example reviews (in production, these would come from an API)
  const [reviews, setReviews] = useState([
    { id: 1, customer: 'John Doe', rating: 5, text: 'Excellent food and great service!', editable: true },
    { id: 2, customer: 'Jane Smith', rating: 4, text: 'Tasty and well-prepared, but delivery took a bit long.', editable: false },
  ]);

  const [newReview, setNewReview] = useState({ rating: '', text: '' });
  const [editingReview, setEditingReview] = useState(null);

  // Handle review form change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  // Submit a new review
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const newId = reviews.length + 1;
    setReviews([
      ...reviews,
      { id: newId, customer: 'Current User', rating: newReview.rating, text: newReview.text, editable: true },
    ]);
    setNewReview({ rating: '', text: '' });
  };

  // Delete a review
  const handleDeleteReview = (id) => {
    setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
  };

  // Edit a review
  const handleEditReview = (review) => {
    setEditingReview(review);
    setNewReview({ rating: review.rating, text: review.text });
  };

  // Save edited review
  const handleSaveEdit = (e) => {
    e.preventDefault();
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === editingReview.id ? { ...review, rating: newReview.rating, text: newReview.text } : review
      )
    );
    setEditingReview(null);
    setNewReview({ rating: '', text: '' });
  };

  return (
    <div className="p-6 bg-background min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-primary mb-6">Customer Reviews</h1>

      {/* Existing Reviews */}
      <div className="w-full max-w-lg space-y-4 mb-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{review.customer}</h2>
              <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
            </div>
            <p className="text-gray-700">{review.text}</p>
            {review.editable && (
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleEditReview(review)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Review Form */}
      <form onSubmit={editingReview ? handleSaveEdit : handleReviewSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-secondary mb-4">
          {editingReview ? 'Edit Your Review' : 'Leave a Review'}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700">Rating</label>
          <select
            name="rating"
            value={newReview.rating}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Star{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Review</label>
          <textarea
            name="text"
            value={newReview.text}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows="3"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition">
          {editingReview ? 'Save Changes' : 'Submit Review'}
        </button>
        {editingReview && (
          <button
            type="button"
            onClick={() => {
              setEditingReview(null);
              setNewReview({ rating: '', text: '' });
            }}
            className="ml-4 text-red-500 hover:underline"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default CustomerReviews;
