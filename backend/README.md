# Campus Hustle Backend

Express.js backend API for Campus Hustle.

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=4000
FRONTEND_URL=https://your-frontend-url.netlify.app
```

## Deployment on Render

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `campus-hustle-backend`
   - **Root Directory**: `campus_hustle/backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free
5. Add Environment Variables:
   - `PORT`: `4000` (or leave blank, Render sets it automatically)
   - `FRONTEND_URL`: Your Netlify frontend URL
6. Click "Create Web Service"

After deployment, you'll get a URL like: `https://campus-hustle-backend.onrender.com`

## Local Development

```bash
npm install
npm start
```

The server will run on `http://localhost:4000`

