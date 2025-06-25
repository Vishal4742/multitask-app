# Backend Deployment Guide

## 🚀 Deployment Platforms

### 1. **Render** (Recommended - Free Tier Available)
### 2. **Railway** (Easy Setup - Free Tier Available)  
### 3. **Heroku** (Popular - Paid)
### 4. **DigitalOcean App Platform** (Scalable - Paid)
### 5. **Vercel** (Serverless Functions - Free Tier)

---

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ MongoDB database (MongoDB Atlas recommended)
- ✅ Gmail account for OTP emails
- ✅ GitHub repository with your code

---

## 🎯 Option 1: Render (Recommended)

### Step 1: Create MongoDB Database
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create free cluster
3. Get connection string: `mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<db>`

### Step 2: Deploy to Render
1. **Sign up** at [render.com](https://render.com)
2. **Connect GitHub** repository
3. **Create New Web Service**
4. **Configure Settings**:
   ```
   Name: multitask-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

5. **Set Environment Variables**:
   ```
   MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<db>
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_REFRESH_SECRET=your_super_secret_refresh_key_here
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=your_gmail_app_password
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend.vercel.app
   PORT=3000
   ```

6. **Deploy** and wait for build to complete
7. **Note the URL**: `https://your-app.onrender.com`

### Step 3: Test API
```bash
curl https://your-app.onrender.com/api/auth/guest
```

---

## 🚂 Option 2: Railway

### Step 1: Deploy to Railway
1. **Sign up** at [railway.app](https://railway.app)
2. **Connect GitHub** repository
3. **Create New Project** → Deploy from GitHub repo
4. **Set Root Directory** to `backend`
5. **Add Environment Variables** (same as Render above)
6. **Deploy** automatically

### Step 2: Get URL
- Railway provides a URL like: `https://your-app.railway.app`

---

## 🏗️ Option 3: Heroku

### Step 1: Install Heroku CLI
```bash
# Windows
winget install --id=Heroku.HerokuCLI

# macOS
brew tap heroku/brew && brew install heroku
```

### Step 2: Deploy
```bash
# Login to Heroku
heroku login

# Create app
heroku create your-multitask-backend

# Set environment variables
heroku config:set MONGO_URI="mongodb+srv://..."
heroku config:set JWT_SECRET="your_secret"
heroku config:set JWT_REFRESH_SECRET="your_refresh_secret"
heroku config:set EMAIL_USER="your_email"
heroku config:set EMAIL_PASS="your_password"
heroku config:set NODE_ENV="production"
heroku config:set FRONTEND_URL="https://your-frontend.vercel.app"

# Deploy
git push heroku main
```

---

## ☁️ Option 4: DigitalOcean App Platform

### Step 1: Create App
1. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. **Create App** → Source: GitHub
3. **Select Repository** and branch
4. **Configure App**:
   ```
   Source Directory: backend
   Build Command: npm install
   Run Command: npm start
   ```

### Step 2: Set Environment Variables
Add the same environment variables as above in the DigitalOcean dashboard.

---

## ⚡ Option 5: Vercel (Serverless)

### Step 1: Create API Routes
Create `api/` folder in your backend directory with serverless functions.

### Step 2: Deploy
1. Go to [vercel.com](https://vercel.com)
2. Import repository
3. Set root directory to `backend`
4. Configure environment variables

---

## 🔧 Environment Variables Setup

### Required Variables:
```env
# Database
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# JWT Secrets (generate secure random strings)
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here_make_it_long_and_random

# Email (Gmail with App Password)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password

# Environment
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend-domain.vercel.app

# Port (optional)
PORT=3000
```

### How to Generate Secure Secrets:
```bash
# Generate JWT secrets
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 📧 Gmail App Password Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Use the generated password** in `EMAIL_PASS`

---

## 🧪 Testing Your Deployment

### Test Guest User Creation:
```bash
curl -X POST https://your-backend-url.com/api/auth/guest
```

### Test OTP Send:
```bash
curl -X POST https://your-backend-url.com/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Expected Response:
```json
{
  "message": "OTP sent to email",
  "otp": "123456"
}
```

---

## 🚨 Common Issues & Solutions

### Issue: Build Fails
**Solution**: Check that all dependencies are in `package.json`

### Issue: MongoDB Connection Error
**Solution**: 
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas network access (allow all IPs: 0.0.0.0/0)
- Ensure database exists

### Issue: CORS Errors
**Solution**: 
- Set `FRONTEND_URL` correctly
- Check that your frontend domain is allowed

### Issue: Email Not Sending
**Solution**:
- Verify Gmail app password is correct
- Check that 2FA is enabled
- Test with a valid email address

---

## ✅ Deployment Checklist

- [ ] MongoDB database created and accessible
- [ ] Environment variables configured
- [ ] Gmail app password generated
- [ ] Backend deployed successfully
- [ ] API endpoints responding
- [ ] CORS configured correctly
- [ ] Frontend URL updated in environment
- [ ] Test API calls working

---

## 🎯 Next Steps

After backend deployment:
1. **Note the backend URL**
2. **Deploy frontend to Vercel**
3. **Set `VITE_API_URL`** in frontend environment
4. **Test full application**

Your backend is now ready for deployment! Choose your preferred platform and follow the steps above. 🚀 