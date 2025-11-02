# 🚂 Railway Deployment - Step by Step Guide

## 🎯 Quick Overview

- **Backend**: Railway (Free $5 credit/month)
- **Frontend**: Netlify (Free)
- **Result**: One final link from Netlify

**Note**: Railway requires a payment method but won't charge for free tier usage!

---

## Step 1: Deploy Backend to Railway (5 minutes)

### 1.1 Create Railway Account
1. Go to **[railway.app](https://railway.app)**
2. Click **"Start a New Project"** or **"Login"**
3. Choose **"Deploy from GitHub repo"**
4. Sign in with GitHub
5. Authorize Railway

### 1.2 Connect Your Repository
1. After login, click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Find and select your repository: `campus_hustle`
4. Railway will start configuring automatically

### 1.3 Configure Backend
1. Railway will detect Node.js automatically
2. Click on the newly created service
3. Go to **"Settings"** tab
4. Set **Root Directory**: `campus_hustle/backend`
5. Railway will auto-detect `package.json` and `npm start`

### 1.4 Add Environment Variables
1. In your service, go to **"Variables"** tab
2. Click **"+ New Variable"**
3. Add:
   ```
   Name: FRONTEND_URL
   Value: https://placeholder.netlify.app
   ```
   (We'll update this after deploying frontend)

4. Click **"Add"**

### 1.5 Generate Domain
1. Go to **"Settings"** tab
2. Scroll to **"Domains"** section
3. Click **"Generate Domain"**
4. Railway will create a domain like: `campus-hustle-backend-production.up.railway.app`
5. **Copy this URL** - you'll need it for frontend!

### 1.6 Wait for Deployment
- Railway automatically deploys
- Wait 2-3 minutes
- Check **"Deployments"** tab to see build progress
- Once deployed, status shows "Active" ✅

### 1.7 Test Your Backend
Visit your Railway URL + `/health`:
```
https://xxx.up.railway.app/health
```

You should see: `{"status":"ok","uptime":...}`

---

## Step 2: Deploy Frontend to Netlify (5 minutes)

### 2.1 Create Netlify Account
1. Go to **[netlify.com](https://netlify.com)**
2. Click **"Sign up"** → Choose **"GitHub"**
3. Authorize Netlify

### 2.2 Deploy Your Site
1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"GitHub"**
3. Select your repository: `campus_hustle`
4. Click **"Next"**

### 2.3 Configure Build Settings

**Important**: Set these correctly:

- **Base directory**: `campus_hustle`
- **Build command**: `npm run build`
- **Publish directory**: `campus_hustle/dist`

### 2.4 Add Environment Variable

**Before clicking "Deploy site"**, add the environment variable:

1. Scroll to **"Environment variables"** section
2. Click **"Add variable"**
3. Add:
   ```
   Key: VITE_API_URL
   Value: https://xxx.up.railway.app
   ```
   ⚠️ **Important**: 
   - Use the Railway backend URL from Step 1
   - **No trailing slash** (don't add `/` at the end)
   - Example: `https://campus-hustle-backend-production.up.railway.app` ✅

4. Click **"Deploy site"**

### 2.5 Wait for Deployment
- Wait 3-5 minutes for the build
- You'll see build logs in real-time
- Once complete, you'll get your Netlify URL:
  - Format: `https://random-name-123.netlify.app`
  - Example: `https://campus-hustle-msh.netlify.app`

**Copy this URL!** This is your **final link**! 🎉

---

## Step 3: Update Backend CORS (1 minute)

Now connect the backend to your frontend:

1. Go back to **Railway** dashboard
2. Open your backend service
3. Go to **"Variables"** tab
4. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL = https://your-netlify-url.netlify.app
   ```
   (Use your Netlify URL from Step 2)

5. Save changes - Railway will auto-redeploy

---

## Step 4: Test Everything! ✅

1. Visit your **Netlify URL** (your final link!)
2. Open browser console (F12)
3. Check for any errors
4. Test features:
   - ✅ Browse hustlers
   - ✅ View profiles
   - ✅ Create new account
   - ✅ Upload images
   - ✅ Submit reviews

---

## 🎉 Success!

**Your final link**: `https://your-app.netlify.app`

This is the one URL you share with users!

---

## 💳 Railway Payment Method

**Important**: Railway requires a payment method for free tier:
- They won't charge you if you stay within free limits
- Free tier: $5 credit/month
- Your project will likely stay within free tier
- You can add payment method during setup or later

---

## 🔧 Troubleshooting

### Backend Not Working?
- Check Railway logs: Dashboard → Your Service → "Deployments" → Click latest → "View Logs"
- Verify backend URL: `https://xxx.up.railway.app/health`
- Make sure `hustlers.json` exists (Railway creates it if missing)

### CORS Errors?
- Make sure `FRONTEND_URL` in Railway = your Netlify URL exactly
- Check `VITE_API_URL` in Netlify = your Railway URL
- No trailing slashes on either URL

### Frontend Build Fails?
- Check Netlify build logs
- Verify `base` directory is set to `campus_hustle`
- Make sure `VITE_API_URL` is set correctly

### 404 on Routes?
- Check `netlify.toml` is deployed
- Verify redirect rules: `/*` → `/index.html`

---

## 📝 Quick Checklist

- [ ] Railway account created (payment method added)
- [ ] Backend deployed on Railway
- [ ] Backend URL copied (`https://xxx.up.railway.app`)
- [ ] Backend health check works (`/health`)
- [ ] Netlify account created
- [ ] Frontend deployed on Netlify
- [ ] Frontend URL copied (`https://xxx.netlify.app`)
- [ ] `VITE_API_URL` set in Netlify
- [ ] `FRONTEND_URL` updated in Railway
- [ ] Tested the final link - everything works! 🎉

---

**Need Help?** Check the deployment logs in both Railway and Netlify dashboards!

