# Google Reviews Limit - Important Information

## Current Limitation

**Google Places API only returns a maximum of 5 reviews per request.**

This is a **Google API limitation**, not something we can change in the code. Google intentionally limits the number of reviews returned to prevent abuse.

## What You're Seeing

- ✅ **5 most recent/relevant reviews** from Google My Business
- ✅ **Auto-updates every 30 minutes** when new reviews are added
- ✅ **Shows all review text** (no cutting)
- ✅ **Displays rating, author, date, and profile photos**

## To Get All 800+ Reviews

You would need to use the **Google My Business API** instead, which requires:

1. **OAuth 2.0 setup** (more complex authentication)
2. **Business account verification** with Google
3. **Different API endpoints** and pagination
4. **Higher API quotas** (may require paid plan)

This is significantly more complex than the Places API we're currently using.

## Current Solution Benefits

- ✅ Simple setup (just API key)
- ✅ Works immediately
- ✅ Auto-refreshes every 30 minutes
- ✅ Shows latest reviews
- ✅ No authentication complexity
- ✅ Free tier available

## Recommendation

For most businesses, showing the **5 most recent reviews** is sufficient because:
- Visitors see the latest feedback
- Reviews auto-update when new ones are added
- Shows overall rating (4.9/5.0) and total count (50+)
- Full review text is displayed (no truncation)

If you absolutely need to show all 800+ reviews, we can implement the Google My Business API, but it will require additional setup and may have costs.

