# 🔄 Cyclic Deployment - Step by Step Guide

## 🎯 Quick Overview

- **Backend**: Cyclic (Free, no card needed)
- **Frontend**: Netlify (Free)
- **Result**: One final link from Netlify

---

## Step 1: Deploy Backend to Cyclic (5 minutes)

### 1.1 Create Cyclic Account
1. Go to **[cyclic.sh](https://cyclic.sh)**
2. Click **"Deploy Now"** or **"Sign Up"**
3. Choose **"Sign up with GitHub"**
4. Authorize Cyclic to access your repositories

### 1.2 Connect Your Repository
1. After login, click **"Deploy Now"** or **"New App"**
2. Select **"From GitHub"**
3. Find and select your repository: `campus_hustle`
4. Click **"Connect"** or **"Deploy"**

### 1.3 Configure Backend Settings

Cyclic will auto-detect your Node.js app. You need to configure:

1. **Click on your app** → Go to **"Settings"**
2. **Root Directory**: Set to `campus_hustle/backend`
   - If not visible, you might need to configure it in the deployment settings
3. **Runtime**: Should auto-detect Node.js 18+

### 1.4 Add Environment Variables

1. In your Cyclic app dashboard, go to **"Environment Variables"** or **"Config"**
2. Click **"Add Variable"** or **"+ Add"**
3. Add these variables:
   ```
   Variable Name: FRONTEND_URL
   Value: https://placeholder.netlify.app
   ```
   (We'll update this after deploying frontend)

4. Click **"Save"** or **"Deploy"**

### 1.5 Deploy

1. Cyclic will automatically start deploying
2. Wait 2-3 minutes for the build to complete
3. Once deployed, you'll see your backend URL:
   - Format: `https://your-app-name.cyclic.app`
   - Example: `https://campus-hustle-backend.cyclic.app`
4. **Copy this URL** - you'll need it for the frontend!

### 1.6 Test Your Backend

Visit your backend URL + `/health`:
```
https://your-backend.cyclic.app/health
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
   Value: https://your-backend.cyclic.app
   ```
   ⚠️ **Important**: 
   - Use the Cyclic backend URL from Step 1
   - **No trailing slash** (don't add `/` at the end)
   - Example: `https://campus-hustle-backend.cyclic.app` ✅

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

1. Go back to **Cyclic** dashboard
2. Open your backend app
3. Go to **"Environment Variables"**
4. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL = https://your-netlify-url.netlify.app
   ```
   (Use your Netlify URL from Step 2)

5. Save changes - Cyclic will auto-redeploy

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

## 🔧 Troubleshooting

### Backend Not Working?
- Check Cyclic logs: Dashboard → Your App → "Logs"
- Verify backend URL: `https://xxx.cyclic.app/health`
- Make sure `hustlers.json` exists (Cyclic creates it if missing)

### CORS Errors?
- Make sure `FRONTEND_URL` in Cyclic = your Netlify URL exactly
- Check `VITE_API_URL` in Netlify = your Cyclic URL
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

- [ ] Cyclic account created
- [ ] Backend deployed on Cyclic
- [ ] Backend URL copied (`https://xxx.cyclic.app`)
- [ ] Backend health check works (`/health`)
- [ ] Netlify account created
- [ ] Frontend deployed on Netlify
- [ ] Frontend URL copied (`https://xxx.netlify.app`)
- [ ] `VITE_API_URL` set in Netlify
- [ ] `FRONTEND_URL` updated in Cyclic
- [ ] Tested the final link - everything works! 🎉

---

**Need Help?** Check the deployment logs in both Cyclic and Netlify dashboards!

