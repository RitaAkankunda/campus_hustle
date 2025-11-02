# 🔄 Cyclic Deployment Guide (Another Free Alternative)

Cyclic offers completely free backend hosting - no credit card needed!

## Step 1: Deploy Backend to Cyclic

1. **Go to [cyclic.sh](https://cyclic.sh)** → Sign up with GitHub

2. **Connect Repository**
   - Click "Deploy Now"
   - Select your `campus_hustle` repository
   - Cyclic auto-detects Node.js

3. **Configure Backend**
   - **App Directory**: `campus_hustle/backend`
   - **Start Script**: `npm start`
   - Cyclic will detect `package.json`

4. **Add Environment Variables**
   - Go to "Environment Variables"
   - Add:
     ```
     FRONTEND_URL = https://placeholder.netlify.app
     ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Get your backend URL: `https://xxx.cyclic.app`

## Step 2: Deploy Frontend to Netlify

(Same steps as before)

## Cyclic Free Tier

- ✅ Completely free
- ✅ No credit card required
- ✅ No sleep (always on)
- ✅ Auto-deploys on git push
- ✅ Perfect for your project!

---

**Your final link**: Netlify URL connects to Cyclic backend! 🚀

