# Vagaro Reviews Integration Guide

## Overview
This guide explains how to integrate live reviews from Vagaro into your HABC Beauty website. Since Vagaro doesn't provide a public API, we've created a flexible system that supports multiple review sources.

## Current Implementation

### 1. Review Sources Supported
- **Manual Reviews**: Add reviews directly through the admin interface
- **Google Reviews**: Integration with Google My Business API (requires setup)
- **Vagaro Reviews**: Web scraping integration (requires backend service)
- **Yelp Reviews**: Future integration support

### 2. Features Implemented
- ✅ Live review fetching and caching
- ✅ Multiple review sources
- ✅ Review management interface
- ✅ Automatic refresh functionality
- ✅ Fallback system for reliability
- ✅ Mobile-responsive design

## Setup Instructions

### Option 1: Manual Review Management (Immediate Use)

1. **Access the Review Management Interface**
   - Navigate to `/admin/reviews` (you'll need to add this route)
   - Use the interface to add, edit, and delete reviews
   - Reviews are stored locally and will persist

2. **Add Reviews Manually**
   - Click "Add Review" button
   - Fill in customer name, rating (1-5 stars), and comment
   - Reviews will appear immediately on the website

### Option 2: Google Reviews Integration (Recommended)

1. **Set up Google My Business API**
   ```bash
   # Install Google API client
   npm install googleapis
   ```

2. **Configure Environment Variables**
   ```env
   GOOGLE_MY_BUSINESS_API_KEY=your_api_key
   GOOGLE_MY_BUSINESS_PLACE_ID=your_place_id
   ```

3. **Implement Google Reviews Service**
   ```typescript
   // Add to src/services/reviewsService.ts
   async fetchGoogleReviews(): Promise<Review[]> {
     const { google } = require('googleapis');
     const mybusiness = google.mybusinessaccountmanagement('v1');
     
     // Implementation details...
   }
   ```

### Option 3: Vagaro Web Scraping (Advanced)

⚠️ **Important**: Check Vagaro's Terms of Service before implementing web scraping.

1. **Backend Service Setup**
   ```javascript
   // Create a backend service (Node.js/Express)
   app.get('/api/reviews/vagaro', async (req, res) => {
     const reviews = await scrapeVagaroReviews();
     res.json({ reviews });
   });
   ```

2. **Web Scraping Implementation**
   ```javascript
   // Use Puppeteer or similar tool
   const puppeteer = require('puppeteer');
   
   async function scrapeVagaroReviews() {
     const browser = await puppeteer.launch();
     const page = await browser.newPage();
     
     // Navigate to your Vagaro business page
     await page.goto('https://www.vagaro.com/your-business-url');
     
     // Extract review data
     const reviews = await page.evaluate(() => {
       // Scraping logic here
     });
     
     await browser.close();
     return reviews;
   }
   ```

## Configuration

### Environment Variables
Create a `.env` file in your project root:

```env
# Review Sources Configuration
VITE_ENABLE_GOOGLE_REVIEWS=true
VITE_ENABLE_VAGARO_REVIEWS=false
VITE_ENABLE_MANUAL_REVIEWS=true

# API Keys (if using external services)
VITE_GOOGLE_MY_BUSINESS_API_KEY=your_key_here
VITE_VAGARO_BUSINESS_URL=your_vagaro_url_here

# Cache Settings
VITE_REVIEWS_CACHE_DURATION=1800000
```

### Review Service Configuration
Update `src/services/reviewsService.ts`:

```typescript
// Enable/disable specific review sources
const ENABLE_GOOGLE_REVIEWS = import.meta.env.VITE_ENABLE_GOOGLE_REVIEWS === 'true';
const ENABLE_VAGARO_REVIEWS = import.meta.env.VITE_ENABLE_VAGARO_REVIEWS === 'true';
const ENABLE_MANUAL_REVIEWS = import.meta.env.VITE_ENABLE_MANUAL_REVIEWS === 'true';
```

## Usage

### Adding Reviews Programmatically
```typescript
import { reviewsService } from '@/services/reviewsService';

// Add a new review
const newReview = await reviewsService.addManualReview({
  name: 'Customer Name',
  rating: 5,
  comment: 'Great service!',
  verified: true
});
```

### Refreshing Reviews
```typescript
// Force refresh all reviews
const reviews = await reviewsService.refreshReviews();
```

### Using the React Hook
```typescript
import { useReviews } from '@/hooks/useReviews';

function ReviewsPage() {
  const { data: reviewsData, isLoading, error } = useReviews();
  
  if (isLoading) return <div>Loading reviews...</div>;
  if (error) return <div>Error loading reviews</div>;
  
  return (
    <div>
      <h2>Average Rating: {reviewsData?.averageRating}/5.0</h2>
      <p>Total Reviews: {reviewsData?.totalReviews}</p>
      {/* Render reviews */}
    </div>
  );
}
```

## Best Practices

### 1. Review Moderation
- Always verify reviews before displaying them
- Implement content filtering for inappropriate content
- Allow customers to report fake reviews

### 2. Performance Optimization
- Use caching to reduce API calls
- Implement pagination for large review sets
- Lazy load review components

### 3. Legal Compliance
- Ensure compliance with review platform ToS
- Implement proper attribution for review sources
- Respect customer privacy and data protection laws

### 4. Backup Strategy
- Always maintain fallback reviews
- Implement error handling for API failures
- Store reviews locally as backup

## Troubleshooting

### Common Issues

1. **Reviews Not Loading**
   - Check network connectivity
   - Verify API keys and configuration
   - Check browser console for errors

2. **CORS Issues**
   - Implement proper CORS headers on backend
   - Use proxy server for external API calls

3. **Rate Limiting**
   - Implement request throttling
   - Use caching to reduce API calls
   - Consider using multiple API keys

### Debug Mode
Enable debug logging by setting:
```env
VITE_DEBUG_REVIEWS=true
```

## Future Enhancements

### Planned Features
- [ ] Real-time review notifications
- [ ] Review analytics dashboard
- [ ] Automated review response system
- [ ] Integration with more review platforms
- [ ] Review sentiment analysis
- [ ] Review export functionality

### Integration Opportunities
- [ ] Facebook Reviews
- [ ] TripAdvisor Reviews
- [ ] Better Business Bureau
- [ ] Industry-specific review platforms

## Support

For technical support or questions about the review integration:
1. Check the troubleshooting section above
2. Review the console logs for error messages
3. Verify your configuration settings
4. Test with manual reviews first before implementing external APIs

## Security Considerations

- Never expose API keys in client-side code
- Implement proper authentication for admin functions
- Validate all user input before processing
- Use HTTPS for all API communications
- Regularly rotate API keys and credentials
