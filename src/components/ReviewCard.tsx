import { Card, CardContent } from "@/components/ui/card";
import { Star, CheckCircle } from "lucide-react";

interface ReviewCardProps {
  id: string;
  name: string;
  rating: number;
  text: string;  // Changed from 'comment' to 'text'
  date: string;  // Made required since Google provides dates
  source: 'vagaro' | 'google' | 'manual' | 'yelp';  // Made required
  verified?: boolean;
  avatar?: string;  // Added for Google profile photos
}

const ReviewCard: React.FC<ReviewCardProps> = ({ 
  name, 
  rating, 
  text,  // Changed from comment
  date, 
  source, 
  verified,
  avatar  // New prop
}) => {
  const formatDate = (dateString: string) => {
    try {
      // Handle both timestamp (from Google) and date strings
      if (/^\d+$/.test(dateString)) {
        // It's a timestamp (like from Google reviews)
        return new Date(parseInt(dateString) * 1000).toLocaleDateString();
      } else {
        // It's a regular date string
        return new Date(dateString).toLocaleDateString();
      }
    } catch {
      return dateString;
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'vagaro': return 'Vagaro';
      case 'google': return 'Google';
      case 'yelp': return 'Yelp';
      case 'manual': return 'Website';
      default: return source;
    }
  };

  // Google reviews are automatically verified
  const isVerified = verified || source === 'google';

  return (
    <Card className="shadow-soft hover:shadow-elegant transition-smooth h-full">
      <CardContent className="pt-6 pb-6">
        {/* Review Text - Full text, no truncation */}
        <p className="text-foreground mb-4 italic text-base leading-relaxed whitespace-normal break-words">
          "{text}"
        </p>
        
        {/* Rating and Verification */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={i < rating ? "fill-accent text-accent" : "text-muted-foreground/30"}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">({rating}/5)</span>
          </div>
          {isVerified && (
            <div className="flex items-center gap-1 text-accent">
              <CheckCircle size={16} />
              <span className="text-xs">Verified</span>
            </div>
          )}
        </div>

        {/* Reviewer Info and Date */}
        <div className="flex justify-between items-center pt-3 border-t border-border">
          <div className="flex items-center gap-3">
            {/* Avatar - show if available */}
            {avatar && (
              <img 
                src={avatar} 
                alt={`${name}'s profile`}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  // Hide the image if it fails to load
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            <div>
              <p className="font-semibold text-sm">{name}</p>
              {source && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  {getSourceLabel(source)}
                  {source === 'google' && (
                    <svg className="w-3 h-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                </p>
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{formatDate(date)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;