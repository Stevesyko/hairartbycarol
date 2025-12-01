import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import https from 'https';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001; // Heroku sets PORT dynamically

// ✅ IMPORTANT: Configure CORS for your specific domain
app.use(cors({
  origin: [
    'https://www.hairartbycarol.com',
    'https://hairartbycarol.com',
    'http://localhost:5173', // For local development
    'http://localhost:3000'  // For testing
  ],
  methods: ['GET', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// Helper function to make HTTP requests
const makeRequest = (url) => {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    const req = client.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (e) {
          reject(new Error(`Failed to parse JSON: ${e.message}`));
        }
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    // Set timeout for safety
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
};

// Google Reviews Proxy Endpoint
app.get('/api/google-reviews', async (req, res) => {
  try {
    // Use environment variable (set on Heroku) or fallback
    const API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyAUL6ubkU7PeyxX_Q25ZPF1ONG5EwIeNnU';
    const PLACE_ID = 'ChIJrRRmtIo_TIYR-MxU5o6WUJU';
    
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total&key=${API_KEY}`;
    
    console.log('🌐 Proxying Google Places API request...');
    console.log('📍 Place ID:', PLACE_ID);
    console.log('🔑 API Key present:', !!API_KEY);
    
    const { status, data } = await makeRequest(url);
    
    if (status !== 200) {
      throw new Error(`Google API responded with status: ${status}`);
    }
    
    console.log('✅ Google API response status:', data.status);
    
    if (data.status === 'OK' && data.result) {
      const reviewCount = data.result.reviews?.length || 0;
      console.log(`📊 Found ${reviewCount} reviews`);
      console.log(`⭐ Business rating: ${data.result.rating || 'N/A'}`);
      console.log(`👥 Total ratings: ${data.result.user_ratings_total || 0}`);
    } else if (data.status !== 'OK') {
      console.error('❌ Google API Error:', data.status);
      console.error('❌ Error message:', data.error_message || 'No error message');
      
      // Return structured error but don't throw
      return res.status(200).json({
        status: 'ERROR',
        error: data.error_message || `Google API returned: ${data.status}`,
        result: null
      });
    }
    
    // Cache for 30 minutes (shorter for testing)
    res.setHeader('Cache-Control', 'public, max-age=1800');
    res.setHeader('Access-Control-Allow-Origin', 'https://www.hairartbycarol.com');
    res.status(200).json(data);
    
  } catch (error) {
    console.error('❌ Proxy Error:', error.message);
    
    // Return 200 with error structure to prevent frontend crashes
    res.status(200).json({
      status: 'ERROR',
      error: 'Failed to fetch Google reviews: ' + error.message,
      result: null,
      fallback: {
        staticReviews: true,
        message: 'Showing static reviews due to API error'
      }
    });
  }
});

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    status: 'success',
    message: 'Proxy server is working!',
    domain: 'hairartbycarol.com',
    time: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'google-reviews-proxy',
    domain: 'hairartbycarol.com',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Google Reviews Proxy Server',
    endpoints: {
      reviews: '/api/google-reviews',
      test: '/api/test',
      health: '/health'
    },
    docs: 'This server proxies Google Places API requests for hairartbycarol.com'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Google Reviews Proxy Server running on port ${PORT}`);
  console.log(`📡 Proxy endpoint: http://localhost:${PORT}/api/google-reviews`);
  console.log(`✅ Configured for domain: https://www.hairartbycarol.com`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
  
  // Log environment info
  console.log('\n🌍 Environment:');
  console.log(`   - NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   - PORT: ${PORT}`);
  console.log(`   - GOOGLE_API_KEY: ${process.env.GOOGLE_API_KEY ? 'Set' : 'Using fallback'}`);
  
  console.log('\n⚠️  Make sure this server is running before using the reviews page!');
});