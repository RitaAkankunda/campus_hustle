# 🚀 Quick Deployment Guide

## ⚡ Fast Track - Deploy in 10 Minutes

### Step 1: Backend on Render (5 min)

1. **Go to [render.com](https://render.com)** → Sign up with GitHub
2. **Click "New +" → "Web Service"**
3. **Connect your repo** → Select `campus_hustle`
4. **Configure**:
   ```
   Name: campus-hustle-backend
   Root Directory: campus_hustle/backend
   Build: npm install
   Start: npm start
   Instance: Free
   ```
5. **Environment Variable**:
   ```
   FRONTEND_URL = https://placeholder.netlify.app
   ```
   (Update after frontend deploys)
6. **Click "Create Web Service"** → Wait for deployment
7. **Copy your backend URL** → `https://xxx.onrender.com`

---

### Step 2: Frontend on Netlify (5 min)

1. **Go to [netlify.com](https://netlify.com)** → Sign up with GitHub
2. **Click "Add new site" → "Import project"**
3. **Select your repo** → `campus_hustle`
4. **Configure Build**:
   ```
   Base directory: campus_hustle
   Build command: npm run build
   Publish directory: campus_hustle/dist
   ```
5. **Environment Variable** → Click "Add variable":
   ```
   Key: VITE_API_URL
   Value: [Your Render backend URL from Step 1]
   ```
   ⚠️ **No trailing slash!**
6. **Click "Deploy site"** → Wait for build
7. **Copy your frontend URL** → `https://xxx.netlify.app`

---

### Step 3: Connect Them (1 min)

1. **Go back to Render**
2. **Update Environment Variable**:
   ```
   FRONTEND_URL = [Your Netlify URL from Step 2]
   ```
3. **Save** → Auto-redeploys

---

## ✅ Done!

**Your final link**: `https://xxx.netlify.app`

Test it:
- Visit the URL
- Check browser console for errors
- Create a new hustler account

---

## 🔧 Troubleshooting

**CORS Error?**
- Make sure `FRONTEND_URL` in Render = your Netlify URL exactly
- Check `VITE_API_URL` in Netlify = your Render URL

**404 on routes?**
- Check `netlify.toml` is deployed
- Verify redirect rules are working

**Backend not responding?**
- Check Render logs
- Verify backend URL: `https://xxx.onrender.com/health`

---

**Need help?** Check full guide in `DEPLOYMENT.md`

