import axios from "axios";
import { useState, useEffect } from "react";

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewSectionProps {
  propertyId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ propertyId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/properties/${propertyId}/reviews`);
        setReviews(response.data);
      } catch (error) {
        setError("Failed to load reviews.");
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="border-b py-3">
            <p className="font-bold">{review.user}</p>
            <p className="text-yellow-500">⭐ {review.rating}/5</p>
            <p>{review.comment}</p>
            <p className="text-gray-500 text-sm">{new Date(review.date).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewSection;

