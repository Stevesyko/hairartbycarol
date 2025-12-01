# Google Reviews Integration - Setup Guide

## Quick Fix for 500 Error

The proxy server needs to be restarted with the updated code. Follow these steps:

### Step 1: Stop Any Running Servers
Press `Ctrl+C` in any terminal windows running the server or Vite.

### Step 2: Install Dependencies (if not done)
```bash
npm install
```

### Step 3: Start the Proxy Server
Open a terminal and run:
```bash
npm run server
```

You should see:
```
🚀 Google Reviews Proxy Server running on http://localhost:3001
📡 Proxy endpoint: http://localhost:3001/api/google-reviews
```

### Step 4: Start Vite Dev Server (in a new terminal)
```bash
npm run dev
```

### Step 5: Test the Proxy
Open your browser and go to:
```
http://localhost:3001/api/google-reviews
```

You should see JSON data with Google reviews. If you see an error, check the terminal running the server for details.

### Step 6: Test the Reviews Page
Go to:
```
http://localhost:8082/#/reviews
```

The reviews should now load from Google!

## Troubleshooting

### If you still see "Proxy server responded with status: 500":

1. **Check the server terminal** - Look for error messages starting with `❌`
2. **Verify the API key** - Make sure it's correct in `server.js`
3. **Check Google Cloud Console**:
   - Go to https://console.cloud.google.com/
   - Navigate to APIs & Services > Credentials
   - Find your API key
   - Make sure "Places API" is enabled
   - Under "Application restrictions", set to "None" (for testing) or add your server's IP

### If the server won't start:

1. Check Node.js version: `node --version` (should be 14+)
2. Make sure port 3001 is not in use by another application
3. Check for any error messages in the terminal

## Running Both Servers Together

You can use:
```bash
npm run dev:all
```

This starts both the proxy server and Vite dev server simultaneously.

