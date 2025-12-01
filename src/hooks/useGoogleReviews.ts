import { useState, useEffect, useCallback } from "react";

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
  author_url?: string;
}

interface GoogleReviewsResponse {
  result: {
    reviews: GoogleReview[];
    rating: number;
    user_ratings_total: number;
    name?: string;
  };
  status: string;
  error_message?: string;
}

// Use Vite proxy in dev (relative URL) or direct proxy URL for production
const getProxyUrl = () => {
  // In production, you can set VITE_PROXY_URL to your backend server
  if (import.meta.env.VITE_PROXY_URL) {
    return `${import.meta.env.VITE_PROXY_URL}/api/google-reviews`;
  }
  // In dev, use relative URL (Vite will proxy to localhost:3001)
  return "/api/google-reviews";
};

export const useGoogleReviews = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [averageRating, setAverageRating] = useState<number>(4.9);
  const [totalReviews, setTotalReviews] = useState<number>(50);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGoogleReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const url = getProxyUrl();
      console.log("🔄 Fetching Google reviews via proxy:", url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Proxy server responded with status: ${response.status}`);
      }

      const data: GoogleReviewsResponse = await response.json();

      console.log("📊 Google API Response:", {
        status: data.status,
        reviewsCount: data.result?.reviews?.length || 0,
        rating: data.result?.rating,
        total: data.result?.user_ratings_total,
      });

      if (data.status === "OK" && data.result) {
        const placeReviews: GoogleReview[] = data.result.reviews || [];

        if (placeReviews.length > 0) {
          console.log(`✅ Successfully fetched ${placeReviews.length} Google reviews`);
          console.log("📝 First review text:", placeReviews[0].text);
          console.log("⭐ First review rating:", placeReviews[0].rating);
          console.log("👤 First review author:", placeReviews[0].author_name);

          setReviews(placeReviews);
          setAverageRating(data.result.rating || 4.9);
          setTotalReviews(data.result.user_ratings_total || placeReviews.length);
        } else {
          console.log("⚠️ No reviews found in Google response");
          setError("No reviews found in Google response");
        }
      } else {
        console.error("❌ Google API Error:", data.status, data.error_message);
        throw new Error(
          data.error_message || `Google API returned: ${data.status}`,
        );
      }
    } catch (err) {
      console.error("💥 Error fetching Google reviews via proxy:", err);
      setError(
        `Failed to load Google reviews: ${
          err instanceof Error ? err.message : "Unknown error"
        }`,
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Manual refresh function
  const refreshReviews = useCallback(() => {
    console.log("🔄 Manual refresh triggered");
    fetchGoogleReviews();
  }, [fetchGoogleReviews]);

  useEffect(() => {
    let isCancelled = false;

    // Fetch immediately
    if (!isCancelled) {
      fetchGoogleReviews();
    }

    // Auto-refresh every 15 minutes to get new reviews
    const refreshInterval = setInterval(() => {
      if (!isCancelled) {
        console.log("🔄 Auto-refreshing Google reviews...");
        fetchGoogleReviews();
      }
    }, 15 * 60 * 1000); // 15 minutes

    return () => {
      isCancelled = true;
      clearInterval(refreshInterval);
    };
  }, [fetchGoogleReviews]);

  return { reviews, averageRating, totalReviews, loading, error, refreshReviews };
};
