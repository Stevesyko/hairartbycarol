# Quick Build & Deploy Reference

## Build for Production

```bash
# 1. Install dependencies (if needed)
npm install

# 2. Build the site
npm run build

# 3. Your production files are in: dist/
```

## What Changed

✅ **Review boxes** - Now show full text, no cutting  
✅ **Auto-refresh** - Reviews update every 30 minutes  
✅ **Better sizing** - Review cards expand to show all content  

⚠️ **Review limit** - Google only returns 5 reviews (see GOOGLE_REVIEWS_LIMIT.md)

## Upload to FTP

1. Open FileZilla
2. Connect to your server
3. Navigate to `dist/` folder locally
4. Upload **everything** to your web root (`public_html/` or `www/`)
5. Maintain folder structure (especially `assets/` folder)

## Files to Upload

```
dist/
├── index.html          ← Main file
├── assets/             ← CSS, JS, images (IMPORTANT!)
└── other files...
```

**Upload everything in `dist/` maintaining the folder structure!**

## After Upload

1. Visit: `https://your-domain.com`
2. Check: `https://your-domain.com/#/reviews`
3. Verify reviews are loading

## Need Help?

- See `DEPLOYMENT_GUIDE.md` for detailed instructions
- See `GOOGLE_REVIEWS_LIMIT.md` for review limit explanation

