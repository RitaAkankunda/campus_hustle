# Deployment Guide

This guide will help you deploy Campus Hustle to get **one final link** for your application.

## Architecture

- **Frontend**: React app deployed on Netlify
- **Backend**: Express API deployed on Render
- **Result**: One public URL for your frontend that connects to your backend

## Step 1: Deploy Backend to Render

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository: `campus_hustle` (or your repo name)

3. **Configure Backend**
   - **Name**: `campus-hustle-backend`
   - **Root Directory**: `campus_hustle/backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

4. **Add Environment Variables**
   - Click "Environment" tab
   - Add: `FRONTEND_URL` = `https://your-netlify-url.netlify.app` (you'll update this after deploying frontend)
   - The `PORT` is automatically set by Render

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://campus-hustle-backend.onrender.com`)

## Step 2: Deploy Frontend to Netlify

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Deploy Site**
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Build Settings**
   - **Base directory**: `campus_hustle`
   - **Build command**: `npm run build`
   - **Publish directory**: `campus_hustle/dist`

4. **Add Environment Variable**
   - Click "Site settings" → "Environment variables"
   - Add: `VITE_API_URL` = `https://your-backend-url.onrender.com` (from Step 1)
   - **Important**: No trailing slash

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Your site will be available at: `https://random-name.netlify.app`

6. **Update Backend CORS**
   - Go back to Render
   - Update `FRONTEND_URL` environment variable to your Netlify URL
   - Redeploy if needed

7. **Set Custom Domain (Optional)**
   - In Netlify, go to "Domain settings"
   - Click "Add custom domain"
   - Follow the instructions

## Step 3: Final URL

Your **one final link** will be your Netlify URL:
- Example: `https://campus-hustle-msh.netlify.app`

The frontend will automatically connect to your backend API.

## Testing

1. Visit your Netlify URL
2. Check browser console for any CORS errors
3. Test creating a new hustler profile
4. Test browsing hustlers

## Troubleshooting

### CORS Errors
- Make sure `FRONTEND_URL` in Render matches your Netlify URL exactly
- Check that `VITE_API_URL` in Netlify is set correctly

### 404 Errors
- Make sure `netlify.toml` redirect rules are deployed
- Check that all routes redirect to `/index.html`

### Backend Not Responding
- Check Render logs for errors
- Verify `hustlers.json` file exists in backend directory
- Check that backend URL is accessible: `https://your-backend.onrender.com/health`

## Cost

- **Netlify**: Free tier (100GB bandwidth)
- **Render**: Free tier (750 hours/month)
- **Total**: $0/month for small to medium traffic

---

**Need Help?** Check the logs in both Render and Netlify dashboards for error messages.

