import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration for your domain
const allowedOrigins = [
  'https://www.hairartbycarol.com',
  'https://hairartbycarol.com',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// Google Reviews Proxy Endpoint
app.get('/api/google-reviews', async (req, res) => {
  try {
    const API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyAUL6ubkU7PeyxX_Q25ZPF1ONG5EwIeNnU';
    const PLACE_ID = 'ChIJrRRmtIo_TIYR-MxU5o6WUJU';
    
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total,formatted_address,opening_hours&key=${API_KEY}`;
    
    console.log('🌐 Fetching Google reviews for:', PLACE_ID);
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK') {
      const reviewCount = data.result?.reviews?.length || 0;
      console.log(`✅ Found ${reviewCount} reviews for: ${data.result?.name || 'Business'}`);
      
      // Cache for 1 hour
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.json(data);
    } else {
      console.error('❌ Google API Error:', data.status, data.error_message);
      
      // Return error but with 200 status to prevent frontend crashes
      res.status(200).json({
        status: 'ERROR',
        error: data.error_message || `Google API returned: ${data.status}`,
        result: null,
        fallback: true,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('❌ Proxy Server Error:', error.message);
    
    res.status(200).json({
      status: 'ERROR',
      error: 'Failed to fetch reviews: ' + error.message,
      result: null,
      fallback: true,
      timestamp: new Date().toISOString()
    });
  }
});

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    status: 'success',
    service: 'Google Reviews Proxy',
    domain: 'hairartbycarol.com',
    endpoints: {
      reviews: '/api/google-reviews',
      health: '/health',
      test: '/api/test'
    },
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'google-reviews-proxy',
    domain: 'hairartbycarol.com',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Google Reviews Proxy Server',
    description: 'This server proxies Google Places API requests for hairartbycarol.com',
    owner: 'Stevesyko',
    endpoints: {
      reviews: '/api/google-reviews',
      health: '/health',
      test: '/api/test'
    },
    documentation: 'Contact owner for access'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Google Reviews Proxy Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ Configured for: https://www.hairartbycarol.com`);
  console.log(`📡 Endpoint: http://localhost:${PORT}/api/google-reviews`);
});