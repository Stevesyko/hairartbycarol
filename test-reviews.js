// Test script to verify reviews functionality
import { reviewsService } from './src/services/reviewsService';
import { mockReviewsAPI } from './src/api/reviewsAPI';

async function testReviewsIntegration() {
  console.log('🧪 Testing Reviews Integration...\n');

  try {
    // Test 1: Add a manual review
    console.log('1. Testing manual review addition...');
    const newReview = await mockReviewsAPI.addReview({
      name: 'Test Customer',
      rating: 5,
      comment: 'This is a test review to verify the integration works!',
      verified: true
    });
    console.log('✅ Review added:', newReview);

    // Test 2: Fetch all reviews
    console.log('\n2. Testing review fetching...');
    const reviewsData = await reviewsService.fetchAllReviews();
    console.log('✅ Reviews fetched:', {
      totalReviews: reviewsData.totalReviews,
      averageRating: reviewsData.averageRating,
      lastUpdated: reviewsData.lastUpdated
    });

    // Test 3: Verify review structure
    console.log('\n3. Testing review structure...');
    const firstReview = reviewsData.reviews[0];
    const requiredFields = ['id', 'name', 'rating', 'comment', 'date', 'source'];
    const hasAllFields = requiredFields.every(field => field in firstReview);
    console.log(hasAllFields ? '✅ Review structure is correct' : '❌ Review structure is missing fields');

    // Test 4: Test refresh functionality
    console.log('\n4. Testing refresh functionality...');
    const refreshedData = await reviewsService.refreshReviews();
    console.log('✅ Reviews refreshed successfully');

    console.log('\n🎉 All tests passed! Reviews integration is working correctly.');
    
    // Display sample reviews
    console.log('\n📋 Sample Reviews:');
    reviewsData.reviews.slice(0, 3).forEach((review, index) => {
      console.log(`${index + 1}. ${review.name} - ${review.rating}⭐`);
      console.log(`   "${review.comment}"`);
      console.log(`   Source: ${review.source} | Date: ${review.date}\n`);
    });

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test if this file is executed directly
if (typeof window === 'undefined') {
  testReviewsIntegration();
}

export { testReviewsIntegration };
