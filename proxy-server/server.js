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

// Simple fetch for Railway
const fetchGoogleReviews = async () => {
  const API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyAUL6ubkU7PeyxX_Q25ZPF1ONG5EwIeNnU';
  const PLACE_ID = 'ChIJrRRmtIo_TIYR-MxU5o6WUJU';
  
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total&key=${API_KEY}`;
  
  const response = await fetch(url);
  return await response.json();
};

// Google Reviews Endpoint
app.get('/api/google-reviews', async (req, res) => {
  try {
    console.log('📡 Fetching Google reviews...');
    const data = await fetchGoogleReviews();
    
    if (data.status === 'OK') {
      console.log(`✅ Found ${data.result?.reviews?.length || 0} reviews`);
      res.setHeader('Cache-Control', 'public, max-age=1800'); // 30 min cache
      res.json(data);
    } else {
      console.error('❌ Google API error:', data.status, data.error_message);
      res.status(200).json({
        status: 'ERROR',
        error: data.error_message || data.status,
        result: null,
        fallback: true
      });
    }
  } catch (error) {
    console.error('❌ Proxy error:', error.message);
    res.status(200).json({
      status: 'ERROR',
      error: error.message,
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
    domain: 'hairartbycarol.com'
  });
});

// Root
app.get('/', (req, res) => {
  res.json({
    message: 'Google Reviews Proxy',
    endpoints: ['/api/google-reviews', '/health']
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on port ${PORT}`);
});