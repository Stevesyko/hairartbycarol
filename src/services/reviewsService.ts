// Reviews Service - Handles fetching reviews from multiple sources
// Since Vagaro doesn't provide a public API, this service provides multiple integration options

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  source: 'vagaro' | 'google' | 'manual' | 'yelp';
  verified?: boolean;
}

export interface ReviewsResponse {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  lastUpdated: string;
}

class ReviewsService {
  private cache: ReviewsResponse | null = null;
  private cacheExpiry: number = 0;
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

  // Google Reviews API (requires Google My Business API)
  async fetchGoogleReviews(): Promise<Review[]> {
    try {
      // This would require Google My Business API setup
      // For now, return empty array - you can implement this later
      console.log('Google Reviews API not configured yet');
      return [];
    } catch (error) {
      console.error('Error fetching Google reviews:', error);
      return [];
    }
  }

  // Manual reviews from CMS/Admin panel
  async fetchManualReviews(): Promise<Review[]> {
    try {
      // Manual reviews are now handled via CMS content/reviews.json
      // This method is kept for compatibility but returns empty array
      // as reviews are loaded directly from JSON files
      return [];
    } catch (error) {
      console.error('Error fetching manual reviews:', error);
      return [];
    }
  }

  // Vagaro reviews via web scraping (use with caution - check ToS)
  async fetchVagaroReviews(): Promise<Review[]> {
    try {
      // This would require a backend service to scrape Vagaro
      // For security reasons, this should be done server-side
      const response = await fetch('/api/reviews/vagaro');
      if (!response.ok) {
        throw new Error('Failed to fetch Vagaro reviews');
      }
      const data = await response.json();
      return data.reviews || [];
    } catch (error) {
      console.error('Error fetching Vagaro reviews:', error);
      return [];
    }
  }

  // Fallback reviews (current hardcoded reviews)
  getFallbackReviews(): Review[] {
    return [
      {
        id: '1',
        name: 'Sarah Johnson',
        rating: 5,
        comment: 'Absolutely love my hair! The stylists are so talented and professional. I\'ve been coming here for over a year and I\'m never disappointed.',
        date: '2024-01-15',
        source: 'manual',
        verified: true,
      },
      {
        id: '2',
        name: 'Emily Davis',
        rating: 5,
        comment: 'Best beauty salon experience ever. The attention to detail is incredible. My lashes look amazing and last for weeks!',
        date: '2024-01-10',
        source: 'manual',
        verified: true,
      },
      {
        id: '3',
        name: 'Jessica Martinez',
        rating: 5,
        comment: 'The extensions look so natural! I get compliments all the time. The team really knows what they\'re doing.',
        date: '2024-01-08',
        source: 'manual',
        verified: true,
      },
      {
        id: '4',
        name: 'Ashley Brown',
        rating: 5,
        comment: 'I came in for a complete makeover and left feeling like a new person. The color, cut, and styling were perfection!',
        date: '2024-01-05',
        source: 'manual',
        verified: true,
      },
      {
        id: '5',
        name: 'Megan Wilson',
        rating: 5,
        comment: 'The bridal package was worth every penny. I felt absolutely stunning on my wedding day. Thank you HABC!',
        date: '2024-01-02',
        source: 'manual',
        verified: true,
      },
    ];
  }

  // Main method to fetch all reviews
  async fetchAllReviews(): Promise<ReviewsResponse> {
    // Check cache first
    if (this.cache && Date.now() < this.cacheExpiry) {
      return this.cache;
    }

    try {
      // Fetch from all sources
      const [googleReviews, manualReviews, vagaroReviews] = await Promise.all([
        this.fetchGoogleReviews(),
        this.fetchManualReviews(),
        this.fetchVagaroReviews(),
      ]);

      // Combine all reviews
      const allReviews = [
        ...googleReviews,
        ...manualReviews,
        ...vagaroReviews,
      ];

      // If no reviews found, use fallback
      const reviews = allReviews.length > 0 ? allReviews : this.getFallbackReviews();

      // Calculate average rating
      const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

      const response: ReviewsResponse = {
        reviews: reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
        totalReviews: reviews.length,
        lastUpdated: new Date().toISOString(),
      };

      // Cache the response
      this.cache = response;
      this.cacheExpiry = Date.now() + this.CACHE_DURATION;

      return response;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      
      // Return fallback reviews on error
      const fallbackReviews = this.getFallbackReviews();
      return {
        reviews: fallbackReviews,
        averageRating: 5.0,
        totalReviews: fallbackReviews.length,
        lastUpdated: new Date().toISOString(),
      };
    }
  }

  // Method to refresh reviews (bypass cache)
  async refreshReviews(): Promise<ReviewsResponse> {
    this.cache = null;
    this.cacheExpiry = 0;
    return this.fetchAllReviews();
  }
}

export const reviewsService = new ReviewsService();
