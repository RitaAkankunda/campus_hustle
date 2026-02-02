import React, { useState } from 'react';

interface HustlerReviewFormProps {
  onSubmit: (review: { name: string; rating: number; comment: string }) => void;
}

const HustlerReviewForm: React.FC<HustlerReviewFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      onSubmit({ name, rating, comment });
      setName('');
      setRating(5);
      setComment('');
      setSubmitting(false);
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
      <h4 className="text-lg font-semibold mb-2">Leave a Review</h4>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              className={`h-6 w-6 rounded-full flex items-center justify-center ${star <= rating ? 'bg-yellow-300' : 'bg-gray-200'}`}
              onClick={() => setRating(star)}
              aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            >
              <span className="text-yellow-700 font-bold">★</span>
            </button>
          ))}
        </div>
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="mt-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium"
      >
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default HustlerReviewForm;
