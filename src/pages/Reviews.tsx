import VideoHero from "@/components/VideoHero";
import ReviewCarousel from "@/components/ReviewCarousel";
import { Button } from "@/components/ui/button";
import { Star, MessageCircle, Loader2, RefreshCw } from "lucide-react";
import reviewsContent from "../content/reviews.json";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";
import { useEffect } from "react";

const Reviews = () => {
  // Use Google Reviews
  const { reviews: googleReviews, averageRating: googleRating, totalReviews: googleTotal, loading, error, refreshReviews } = useGoogleReviews();
  
  // Use the static reviews as fallback
  const staticReviews = (reviewsContent.reviews || []).map(review => ({
    ...review,
    source: (review.source as "google" | "vagaro" | "manual" | "yelp") || "manual"
  }));

  // DEBUG: Check what we're receiving
  useEffect(() => {
    console.log('🔍 DEBUG Google Reviews Data:');
    console.log('googleReviews:', googleReviews);
    console.log('googleReviews length:', googleReviews.length);
    console.log('googleRating:', googleRating);
    console.log('googleTotal:', googleTotal);
    console.log('loading:', loading);
    console.log('error:', error);
    
    if (googleReviews.length > 0) {
      console.log('First Google review:', googleReviews[0]);
      console.log('First review text:', googleReviews[0].text);
      console.log('First review rating:', googleReviews[0].rating);
      console.log('First review author:', googleReviews[0].author_name);
    } else {
      console.log('No Google reviews received, using static data');
      console.log('Static reviews count:', staticReviews.length);
      console.log('First static review:', staticReviews[0]);
    }
  }, [googleReviews, googleRating, googleTotal, loading, error, staticReviews]);

  // Use Google data if available, otherwise fall back to static data
  const reviews = googleReviews.length > 0 ? googleReviews.map(review => ({
    id: review.time.toString(),
    name: review.author_name,
    rating: review.rating,
    text: review.text,
    date: new Date(review.time * 1000).toLocaleDateString(),
    source: "google" as const,
    avatar: review.profile_photo_url,
    verified: true
  })) : staticReviews;

  const averageRating = googleRating || reviewsContent.average_rating || 5.0;
  const totalReviews = googleTotal || reviewsContent.total_reviews || reviews.length;
  
  const extraFields = reviewsContent as Record<string, unknown>;
  const heroSubtitle =
    typeof extraFields["hero_subtitle"] === "string"
      ? (extraFields["hero_subtitle"] as string)
      : undefined;
  const introText =
    typeof extraFields["intro"] === "string"
      ? (extraFields["intro"] as string)
      : undefined;

  // Debug the final reviews array
  useEffect(() => {
    console.log('🎯 FINAL reviews array:', reviews);
    console.log('🎯 Final reviews count:', reviews.length);
    if (reviews.length > 0) {
      console.log('🎯 First final review:', reviews[0]);
    }
  }, [reviews]);

  return (
    <main>
      {reviewsContent.hero_image && (
        <section className="relative w-full h-[60vh] bg-black mb-4">
          <img
            src={reviewsContent.hero_image}
            alt={reviewsContent.hero_image_alt || "Reviews Hero"}
            className="w-full h-full object-cover object-center opacity-90"
            style={{ minHeight: reviewsContent.hero_height || "60vh" }}
          />
        </section>
      )}
      <div className="py-8 md:py-12"></div>

      {/* Hero Title Section */}
      <section className={`${reviewsContent.hero_spacing || "py-2 px-6 bg-background"}`}>
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif italic text-foreground mb-1">
            {reviewsContent.hero_title || "Client Reviews"}
          </h1>
          {heroSubtitle && (
            <p className="text-lg md:text-xl text-muted-foreground mt-1">
              {heroSubtitle}
            </p>
          )}
          {introText && (
            <p className="text-base md:text-lg text-muted-foreground mt-0 max-w-2xl mx-auto">
              {introText}
            </p>
          )}
        </div>
      </section>

      <section className="py-8 px-6 bg-card">
        <div className="container mx-auto">
          {/* Rating Summary */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex justify-center items-center gap-2 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={32} 
                  className={`fill-accent text-accent ${
                    i < Math.floor(averageRating) ? 'opacity-100' : 'opacity-30'
                  }`} 
                />
              ))}
            </div>
            <h2 className="text-5xl font-bold mb-0">
              {averageRating.toFixed(1)}/5.0
            </h2>
            <p className="text-lg text-muted-foreground">
              Based on {totalReviews}+ verified reviews
            </p>
            {loading && (
              <div className="flex items-center justify-center gap-2 mt-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm text-muted-foreground">Loading live reviews...</span>
              </div>
            )}
            {error && (
              <p className="text-sm text-orange-600 mt-2">{error}</p>
            )}
            {/* Debug info - remove in production */}
            <div className="mt-2 text-xs text-gray-500">
              Showing: {reviews.length} reviews | 
              Source: {googleReviews.length > 0 ? 'Google' : 'Static'} | 
              Data: {JSON.stringify({
                googleCount: googleReviews.length,
                staticCount: staticReviews.length,
                finalCount: reviews.length
              })}
            </div>
          </div>

          {/* Reviews Carousel */}
          <ReviewCarousel reviews={reviews} />

          {/* Refresh Reviews Button */}
          <div className="flex justify-center mt-8 mb-8">
            <Button
              variant="luxuryOutline"
              size="lg"
              onClick={refreshReviews}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Refreshing...' : 'Refresh Reviews'}
            </Button>
          </div>

          {/* Leave Review CTA */}
          <div className="text-center gradient-luxury rounded-lg p-8 max-w-3xl mx-auto">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-accent" />
            <h3 className="text-3xl font-serif italic mb-3">Share Your Experience</h3>
            <p className="text-muted-foreground mb-4">
              We'd love to hear about your experience at HABC and Beauty. Your feedback helps us 
              continue providing exceptional service.
            </p>
            <Button
              variant="luxury"
              size="lg"
              onClick={() => window.open("https://g.page/r/CfjMVOaOllCVEBM/review", "_blank")}
            >
              Leave a Review on Google
            </Button>
          </div>

          {/* FAQ Section */}
          <div className="mt-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-serif italic mb-4 text-center">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-xl font-semibold mb-1">How do I book an appointment?</h4>
                <p className="text-muted-foreground">You can book through Vagaro or StyleSeat using the booking buttons on our Contact page, or call us directly at +1 (940) 344-3487.</p>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-xl font-semibold mb-1">What is your cancellation policy?</h4>
                <p className="text-muted-foreground">We require 24-hour notice for cancellations or rescheduling to avoid a cancellation fee.</p>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-xl font-semibold mb-1">Do you offer consultations?</h4>
                <p className="text-muted-foreground">Yes! Every service includes a complimentary consultation to ensure we understand your vision and needs.</p>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-xl font-semibold mb-1">What products do you use?</h4>
                <p className="text-muted-foreground">We exclusively use premium, professional-grade products from trusted brands to ensure the best results.</p>
              </div>
            </div>
          </div>

          {/* Integration Info */}
          <div className="mt-6 text-center bg-muted rounded-lg p-4 max-w-3xl mx-auto">
            <h4 className="text-xl font-semibold mb-1">
              {googleReviews.length > 0 ? 'Live Google Reviews' : 'Client Testimonials'}
            </h4>
            <p className="text-sm text-muted-foreground">
              {googleReviews.length > 0 
                ? 'These reviews are pulled directly from our Google Business Profile and update automatically. We appreciate all the feedback from our valued clients!'
                : 'These are real reviews from our satisfied clients. We appreciate all the feedback and use it to continuously improve our services.'
              }
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Reviews;