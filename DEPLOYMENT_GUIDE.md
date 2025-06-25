# Complete Deployment Guide

## 🚀 Quick Fix Summary

Your frontend wasn't showing on Vercel due to these issues:
1. ❌ **Missing `vercel.json` configuration**
2. ❌ **Hardcoded API URL** (localhost only)
3. ❌ **CORS blocking Vercel domains**
4. ❌ **Missing environment variables**

## ✅ Fixed Issues

### 1. Frontend Configuration
- ✅ Added `vercel.json` with proper SPA routing
- ✅ Updated API URL to use environment variables
- ✅ Enhanced Vite build configuration

### 2. Backend Configuration  
- ✅ Updated CORS to allow Vercel domains
- ✅ Added environment variable support for frontend URL

---

## 📋 Deployment Steps

### Step 1: Deploy Backend First

#### Option A: Render (Recommended)
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repo
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node

5. **Set Environment Variables**:
   ```
   MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<db>
   JWT_SECRET=your_jwt_secret_here
   JWT_REFRESH_SECRET=your_refresh_secret_here
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=your_gmail_app_password
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

6. Deploy and note the URL (e.g., `https://your-backend.onrender.com`)

#### Option B: Railway
1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub
3. Set root directory to `backend`
4. Add the same environment variables as above

### Step 2: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Create new project from GitHub
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Set Environment Variable**:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

5. Deploy

### Step 3: Update Backend CORS (if needed)

If your backend is already deployed, update the `FRONTEND_URL` environment variable to match your Vercel domain.

---

## 🔧 Troubleshooting

### Frontend Issues

**White Screen:**
- Check browser console for errors
- Verify `VITE_API_URL` is set correctly
- Ensure backend is accessible

**Build Fails:**
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation

### Backend Issues

**CORS Errors:**
- Check that `FRONTEND_URL` is set correctly
- Verify the backend CORS configuration
- Test API endpoints directly

**Database Connection:**
- Verify `MONGO_URI` is correct
- Check MongoDB network access
- Ensure database exists

---

## 🌐 Environment Variables Reference

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com/api
```

### Backend (.env)
```env
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<db>
JWT_SECRET=your_jwt_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
PORT=3000
```

---

## ✅ Verification Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed on Vercel
- [ ] Environment variables set correctly
- [ ] CORS configured properly
- [ ] API endpoints responding
- [ ] Frontend can make API calls
- [ ] Authentication working
- [ ] All features functional

---

## 🆘 Still Having Issues?

1. **Check Vercel Build Logs**: Look for specific error messages
2. **Browser Console**: Check for JavaScript errors
3. **Network Tab**: Verify API calls are working
4. **Backend Logs**: Check your backend deployment logs
5. **Test Locally**: Ensure everything works in development first

The main fixes have been applied to your codebase. Deploy with these changes and your frontend should work on Vercel! 