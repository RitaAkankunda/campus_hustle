# 🚂 Railway Deployment Guide (Alternative to Render)

Railway offers a free tier with $5 credit monthly - perfect for your backend!

## Step 1: Deploy Backend to Railway

1. **Go to [railway.app](https://railway.app)** → Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `campus_hustle` repository

3. **Configure Service**
   - Railway will detect it's a Node.js app
   - Set **Root Directory**: `campus_hustle/backend`
   - Railway auto-detects `package.json`

4. **Add Environment Variables**
   - Click on your service → "Variables" tab
   - Add:
     ```
     FRONTEND_URL = https://placeholder.netlify.app
     ```
     (Update after frontend deploys)

5. **Deploy**
   - Railway automatically builds and deploys
   - Wait 2-3 minutes
   - Click "Settings" → "Generate Domain" to get your backend URL
   - Copy URL: `https://xxx.up.railway.app`

## Step 2: Deploy Frontend to Netlify

(Same as before - no changes needed!)

1. Go to [netlify.com](https://netlify.com)
2. Import your GitHub repo
3. Set build settings:
   - Base directory: `campus_hustle`
   - Build: `npm run build`
   - Publish: `campus_hustle/dist`
4. Add environment variable:
   - `VITE_API_URL` = `https://xxx.up.railway.app` (your Railway URL)

## Step 3: Update Backend CORS

- In Railway, update `FRONTEND_URL` to your Netlify URL
- Redeploy if needed

## Railway Free Tier

- $5 credit per month (usually lasts the whole month)
- Auto-sleeps when not in use
- Wakes up automatically on request
- Perfect for development and small projects!

---

**Your final link**: Your Netlify URL works the same way! 🎉

