import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// CORS for your domain
app.use(cors({
  origin: [
    'https://www.hairartbycarol.com',
    'https://hairartbycarol.com',
    'http://localhost:5173'
  ],
  methods: ['GET', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// Google Reviews Proxy Endpoint
app.get('/api/google-reviews', async (req, res) => {
  try {
    const API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyAUL6ubkU7PeyxX_Q25ZPF1ONG5EwIeNnU';
    const PLACE_ID = 'ChIJrRRmtIo_TIYR-MxU5o6WUJU';
    
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total&key=${API_KEY}`;
    
    console.log('📡 Fetching Google reviews for hairartbycarol.com...');
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK') {
      const reviewCount = data.result?.reviews?.length || 0;
      console.log(`✅ Found ${reviewCount} reviews`);
      
      // Cache for 30 minutes
      res.setHeader('Cache-Control', 'public, max-age=1800');
      res.json(data);
    } else {
      console.error('❌ Google API Error:', data.status, data.error_message);
      
      // Return error but with 200 status
      res.status(200).json({
        status: 'ERROR',
        error: data.error_message || `Google API returned: ${data.status}`,
        result: null,
        fallback: true
      });
    }
  } catch (error) {
    console.error('❌ Proxy Error:', error.message);
    
    res.status(200).json({
      status: 'ERROR',
      error: 'Failed to fetch reviews: ' + error.message,
      result: null,
      fallback: true
    });
  }
});

// Health endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'google-reviews-proxy',
    domain: 'hairartbycarol.com',
    timestamp: new Date().toISOString()
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    status: 'success',
    message: 'Proxy server is working!',
    domain: 'hairartbycarol.com'
  });
});

// Root
app.get('/', (req, res) => {
  res.json({
    message: 'Google Reviews Proxy Server',
    endpoints: {
      reviews: '/api/google-reviews',
      health: '/health',
      test: '/api/test'
    },
    docs: 'Serves Google reviews for hairartbycarol.com'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on port ${PORT}`);
  console.log(`✅ Ready for: https://www.hairartbycarol.com`);
});