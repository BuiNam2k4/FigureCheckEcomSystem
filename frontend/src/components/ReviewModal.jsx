import React, { useState } from 'react';
import { X, Star, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createReview } from '../services/tradeService';
import { useAuth } from '../context/AuthContext';

const ReviewModal = ({ isOpen, onClose, orderId, reviewerId, onSuccess }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth(); // Assuming useAuth provides current user info

  // Re-verify reviewerId: Ideally passed from parent or derived from context.
  // We'll use the prop 'reviewerId' if provided, otherwise context.
  const activeReviewerId = reviewerId || user?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activeReviewerId) {
        alert("User not identified");
        return;
    }

    setIsSubmitting(true);
    try {
      await createReview({
        orderId,
        reviewerId: activeReviewerId,
        rating,
        comment,
        imageUrls: [] // Future: Add image upload logic here
      });
      alert('Review submitted successfully!');
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert(error.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#1a1b26] text-white border-gray-700">
        <DialogHeader>
          <DialogTitle>Rate your experience</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <label className="text-sm font-medium text-gray-300">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-1 focus:outline-none transition-colors ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-600'
                  }`}
                >
                  <Star className="w-8 h-8 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Comment</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              className="bg-[#24283b] border-gray-700 text-white min-h-[100px]"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-600 text-gray-300 hover:bg-[#24283b] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
