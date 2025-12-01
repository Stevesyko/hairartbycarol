// Simple test script to verify the proxy server is working
const https = require('https');

const API_KEY = 'AIzaSyAUL6ubkU7PeyxX_Q25ZPF1ONG5EwIeNnU';
const PLACE_ID = 'ChIJrRRmtIo_TIYR-MxU5o6WUJU';

const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total&key=${API_KEY}`;

console.log('🧪 Testing Google Places API directly...');
console.log('📍 Place ID:', PLACE_ID);
console.log('🔑 API Key:', API_KEY.substring(0, 10) + '...');

https.get(url, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('\n✅ Response Status:', json.status);
      
      if (json.status === 'OK') {
        console.log('✅ Place Name:', json.result?.name);
        console.log('⭐ Rating:', json.result?.rating);
        console.log('📊 Total Reviews:', json.result?.user_ratings_total);
        console.log('📝 Reviews Count:', json.result?.reviews?.length || 0);
        
        if (json.result?.reviews?.length > 0) {
          console.log('\n📋 First Review:');
          console.log('   Author:', json.result.reviews[0].author_name);
          console.log('   Rating:', json.result.reviews[0].rating);
          console.log('   Text:', json.result.reviews[0].text?.substring(0, 100) + '...');
        }
      } else {
        console.error('❌ Error:', json.error_message || json.status);
      }
    } catch (e) {
      console.error('❌ Failed to parse response:', e.message);
      console.log('Raw response:', data.substring(0, 500));
    }
  });
}).on('error', (err) => {
  console.error('❌ Request failed:', err.message);
});

