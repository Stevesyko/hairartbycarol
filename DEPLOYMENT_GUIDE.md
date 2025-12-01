# Deployment Guide - FTP/FileZilla

## Important Note About Google Reviews

⚠️ **Google Places API Limitation:** The Google Places API only returns a **maximum of 5 reviews** per request. This is a Google limitation, not something we can change.

To get all 800+ reviews, you would need:
- **Google My Business API** (requires OAuth setup, more complex)
- Or use a third-party service that aggregates reviews

For now, the site will show the **5 most recent/relevant reviews** from Google, which auto-updates every 30 minutes.

---

## Pre-Deployment Checklist

### 1. Build the Site
```bash
npm run build
```

This creates a `dist/` folder with all production files.

### 2. Set Up Production Proxy Server

The proxy server (`server.js`) needs to run on your hosting server. You have two options:

#### Option A: Deploy Proxy to a Cloud Service (Recommended)
- **Heroku** (free tier available)
- **Railway** (free tier available)
- **Render** (free tier available)
- **DigitalOcean App Platform**

Then set `VITE_PROXY_URL` in your build to point to your proxy server.

#### Option B: Run Proxy on Same Server (If you have Node.js access)
- Upload `server.js` and `package.json` to your server
- Run `npm install` and `npm run server` on the server
- Use PM2 or similar to keep it running: `pm2 start server.js`

---

## Step-by-Step FTP Deployment

### Step 1: Build the Production Site

```bash
# Make sure you're in the project directory
cd C:\execution\luxury-beauty-hub-main

# Install dependencies (if not done)
npm install

# Build for production
npm run build
```

This creates a `dist/` folder with optimized files.

### Step 2: Configure Production API URL (if using separate proxy)

If your proxy server is on a different domain (e.g., `https://your-proxy.herokuapp.com`):

1. Create a `.env.production` file:
   ```
   VITE_PROXY_URL=https://your-proxy.herokuapp.com
   ```

2. Rebuild:
   ```bash
   npm run build
   ```

### Step 3: Prepare Files for FTP

The `dist/` folder contains:
- `index.html` - Main HTML file
- `assets/` - All CSS, JS, and images
- Other static files

**What to upload:**
- Upload **everything inside `dist/`** to your web server's root directory (usually `public_html/` or `www/`)

**What NOT to upload:**
- `node_modules/` folder
- `src/` folder (source code)
- `server.js` (unless running on same server)
- `.env` files

### Step 4: Upload via FileZilla

1. **Open FileZilla**
2. **Connect to your FTP server:**
   - Host: `your-domain.com` or IP address
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21 (or your custom port)

3. **Navigate to your web root:**
   - Usually `public_html/` or `www/` or `htdocs/`

4. **Upload files:**
   - **Local site (left):** Navigate to `C:\execution\luxury-beauty-hub-main\dist\`
   - **Remote site (right):** Navigate to your web root
   - Select all files in `dist/` folder
   - Drag and drop to remote site
   - **Important:** Maintain folder structure (upload `assets/` folder as-is)

5. **Set permissions (if needed):**
   - Folders: `755`
   - Files: `644`

### Step 5: Verify Deployment

1. Visit your website: `https://your-domain.com`
2. Check the Reviews page: `https://your-domain.com/#/reviews`
3. Open browser console (F12) and check for errors

---

## Production Proxy Server Setup

### If Deploying Proxy to Heroku:

1. **Create `Procfile` in project root:**
   ```
   web: node server.js
   ```

2. **Set environment variable:**
   ```bash
   heroku config:set GOOGLE_API_KEY=your_api_key_here
   ```

3. **Deploy:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   heroku create your-app-name
   git push heroku main
   ```

4. **Update your site's `VITE_PROXY_URL`** to point to Heroku URL

### If Running Proxy on Same Server:

1. **Upload `server.js` and `package.json`** to your server
2. **SSH into your server**
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Run with PM2 (keeps it running):**
   ```bash
   npm install -g pm2
   pm2 start server.js --name google-reviews-proxy
   pm2 save
   pm2 startup
   ```

---

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All pages work (Home, About, Services, Shop, Reviews)
- [ ] Reviews page shows Google reviews (or static fallback)
- [ ] Images load correctly
- [ ] No console errors (check F12)
- [ ] Mobile responsive works
- [ ] Proxy server is running (if using separate server)

---

## Troubleshooting

### Reviews Not Loading?
1. Check browser console (F12) for errors
2. Verify proxy server is running
3. Check `VITE_PROXY_URL` is set correctly
4. Test proxy directly: `https://your-proxy-url/api/google-reviews`

### 404 Errors?
- Make sure you uploaded `index.html` to the root
- Check that `assets/` folder was uploaded
- Verify file permissions

### Images Not Showing?
- Check that `public/` folder contents were copied to `dist/`
- Verify image paths in browser console

---

## File Structure After Build

```
dist/
├── index.html          ← Upload to root
├── assets/
│   ├── index-xxx.js    ← Upload assets folder
│   ├── index-xxx.css
│   └── images/
└── other files...
```

Upload everything in `dist/` maintaining the folder structure!

