import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import { Star } from "lucide-react";

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;  // Changed from 'comment' to 'text' for Google compatibility
  date: string;
  source: 'vagaro' | 'google' | 'manual' | 'yelp';
  verified?: boolean;
  avatar?: string;  // Added for Google profile photos
}

interface ReviewCarouselProps {
  reviews: Review[];
}

const ReviewCarousel: React.FC<ReviewCarouselProps> = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Don't auto-rotate if there are no reviews or only one review
  useEffect(() => {
    if (reviews.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(timer);
  }, [reviews.length]);

  // If no reviews, show a fallback message
  if (reviews.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="bg-card rounded-lg p-8 border border-border">
          <Star className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-xl font-semibold mb-2">No Reviews Yet</h3>
          <p className="text-muted-foreground">
            Be the first to share your experience!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-4xl mx-auto min-h-[400px] overflow-hidden">
      <div 
        className="flex transition-all duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {reviews.map((review, index) => (
          <div 
            key={review.id}  // Use review.id instead of index for better React key
            className="min-w-full px-4 flex items-start justify-center py-4"
          >
            <div className="w-full max-w-2xl">
              <ReviewCard {...review} />
            </div>
          </div>
        ))}
      </div>
      
      {/* Only show dots if there's more than one review */}
      {reviews.length > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-primary" : "bg-foreground/30"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewCarousel;