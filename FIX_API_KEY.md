# Fix: "API keys with referer restrictions cannot be used with this API"

## The Problem
Your Google API key has **referer restrictions** (only allows requests from specific websites like `localhost:8082`). However, when the server makes requests to Google, there's no referer, so Google rejects it.

## Solution: Create a Server-Side API Key

You need a **separate API key** for server-side use that either:
- Has **NO restrictions** (for development/testing)
- OR has **IP restrictions** instead of referer restrictions (for production)

## Steps to Fix:

### Option 1: Create a New API Key (Recommended)

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/apis/credentials
   - Make sure you're in the correct project

2. **Create a New API Key:**
   - Click **"+ CREATE CREDENTIALS"** → **"API key"**
   - Copy the new API key

3. **Configure the New Key:**
   - Click on the new API key to edit it
   - Under **"API restrictions"**: 
     - Select **"Restrict key"**
     - Check **"Places API"** (make sure it's enabled)
   - Under **"Application restrictions"**:
     - Select **"None"** (for development)
     - OR **"IP addresses"** and add your server's IP (for production)

4. **Update server.js:**
   - Replace the API key in `server.js` line 47 with your new key
   - OR set it as an environment variable:
     ```bash
     set GOOGLE_API_KEY=your_new_key_here
     npm run server
     ```

### Option 2: Modify Existing Key (Quick Fix for Testing)

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/apis/credentials
   - Click on your existing API key

2. **Remove Referer Restrictions:**
   - Under **"Application restrictions"**
   - Change from **"HTTP referrers"** to **"None"**
   - Click **"SAVE"**

⚠️ **Warning:** This makes your key less secure. Only do this for testing!

### Option 3: Use Environment Variable (Best Practice)

1. Create a `.env` file in the project root:
   ```
   GOOGLE_API_KEY=your_server_side_api_key_here
   ```

2. Install dotenv:
   ```bash
   npm install dotenv
   ```

3. Update `server.js` to load it (I can do this for you)

## After Fixing:

1. **Restart the server:**
   ```bash
   npm run server
   ```

2. **Test the endpoint:**
   - Visit: `http://localhost:3001/api/google-reviews`
   - You should see JSON data, not an error

3. **Test the reviews page:**
   - Visit: `http://localhost:8082/#/reviews`
   - Google reviews should now load!

## Quick Test

Run this to test if your API key works server-side:
```bash
node test-proxy.js
```

If it works, you'll see reviews. If not, you'll see the referer restriction error.

