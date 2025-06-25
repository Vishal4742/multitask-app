# Northflank Backend Deployment Guide

## 🚀 Deploy Backend to Northflank

### Step 1: Sign Up & Setup
1. Go to [app.northflank.com](https://app.northflank.com)
2. Sign up with GitHub account
3. Create a new project

### Step 2: Create Service
1. **Click "Create Service"**
2. **Select "Application"**
3. **Choose "GitHub"** as source
4. **Connect your repository**

### Step 3: Configure Application
1. **Service Name**: `multitask-backend`
2. **Source Directory**: `backend`
3. **Build Command**: `npm install`
4. **Start Command**: `npm start`
5. **Port**: `3000`

### Step 4: Environment Variables
Add these environment variables in Northflank dashboard:

```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
JWT_SECRET=your_generated_jwt_secret_here
JWT_REFRESH_SECRET=your_generated_refresh_secret_here
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
PORT=3000
```

### Step 5: Deploy
1. **Click "Create Service"**
2. **Wait for build to complete**
3. **Note your service URL**: `https://your-service.northflank.app`

### Step 6: Test API
```bash
# Test guest user creation
curl https://your-service.northflank.app/api/auth/guest

# Test OTP send
curl -X POST https://your-service.northflank.app/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

---

## 🔧 Generate Environment Variables

Run this in your backend directory to generate secure secrets:
```bash
node setup-env.js
```

---

## 📧 Gmail Setup for OTP

1. **Enable 2-Factor Authentication** on your Gmail
2. **Generate App Password**:
   - Go to Google Account → Security → 2-Step Verification
   - App passwords → Generate password for "Mail"
3. **Use the app password** in `EMAIL_PASS`

---

## 🎯 Next Steps

After backend deployment:
1. **Note your Northflank URL**
2. **Deploy frontend to Vercel** (see Vercel guide)
3. **Set `VITE_API_URL`** in Vercel environment variables
4. **Update `FRONTEND_URL`** in Northflank with your Vercel domain

Your backend will be live at: `https://your-service.northflank.app` 🚀 