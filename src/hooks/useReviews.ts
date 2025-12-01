import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { reviewsService, Review, ReviewsResponse } from '@/services/reviewsService';

export const useReviews = () => {
  return useQuery<ReviewsResponse>({
    queryKey: ['reviews'],
    queryFn: () => reviewsService.fetchAllReviews(),
    staleTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
  });
};

export const useReviewsRefresh = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshReviews = async () => {
    setIsRefreshing(true);
    try {
      await reviewsService.refreshReviews();
    } finally {
      setIsRefreshing(false);
    }
  };

  return { refreshReviews, isRefreshing };
};

// Hook for managing manual reviews (for admin use)
export const useManualReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchManualReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const manualReviews = await reviewsService.fetchManualReviews();
      setReviews(manualReviews);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (review: Omit<Review, 'id' | 'date'>) => {
    try {
      const response = await fetch('/api/reviews/manual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...review,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add review');
      }

      const newReview = await response.json();
      setReviews(prev => [newReview, ...prev]);
      return newReview;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add review');
      throw err;
    }
  };

  const updateReview = async (id: string, updates: Partial<Review>) => {
    try {
      const response = await fetch(`/api/reviews/manual/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update review');
      }

      const updatedReview = await response.json();
      setReviews(prev => prev.map(review => 
        review.id === id ? updatedReview : review
      ));
      return updatedReview;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update review');
      throw err;
    }
  };

  const deleteReview = async (id: string) => {
    try {
      const response = await fetch(`/api/reviews/manual/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete review');
      }

      setReviews(prev => prev.filter(review => review.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete review');
      throw err;
    }
  };

  useEffect(() => {
    fetchManualReviews();
  }, []);

  return {
    reviews,
    loading,
    error,
    fetchManualReviews,
    addReview,
    updateReview,
    deleteReview,
  };
};
