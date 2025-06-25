# Northflank + Vercel Deployment Guide

## 🎯 Complete Deployment Strategy

**Backend**: Northflank (app.northflank.com)  
**Frontend**: Vercel (vercel.com)

---

## 🚀 Step 1: Deploy Backend to Northflank

### Prerequisites
- ✅ MongoDB Atlas database
- ✅ Gmail account with app password
- ✅ GitHub repository

### 1.1 Generate Environment Variables
```bash
cd backend
node setup-env.js
```

### 1.2 Deploy to Northflank
1. **Go to** [app.northflank.com](https://app.northflank.com)
2. **Sign up** with GitHub
3. **Create Project** → Give it a name
4. **Create Service** → Application
5. **Connect GitHub** repository
6. **Configure**:
   ```
   Service Name: multitask-backend
   Source Directory: backend
   Build Command: npm install
   Start Command: npm start
   Port: 3000
   ```

### 1.3 Set Environment Variables
In Northflank dashboard, add these variables:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
JWT_SECRET=<generated_secret_from_setup_script>
JWT_REFRESH_SECRET=<generated_refresh_secret_from_setup_script>
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
PORT=3000
```

### 1.4 Deploy & Test
1. **Click "Create Service"**
2. **Wait for build** (usually 2-3 minutes)
3. **Note your URL**: `https://your-service.northflank.app`
4. **Test API**:
   ```bash
   curl https://your-service.northflank.app/api/auth/guest
   ```

---

## ⚡ Step 2: Deploy Frontend to Vercel

### 2.1 Deploy to Vercel
1. **Go to** [vercel.com](https://vercel.com)
2. **Sign up** with GitHub
3. **New Project** → Import repository
4. **Configure**:
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```

### 2.2 Set Environment Variable
In Vercel dashboard → Settings → Environment Variables:

```env
VITE_API_URL=https://your-service.northflank.app/api
```

### 2.3 Deploy & Test
1. **Click "Deploy"**
2. **Wait for build** (usually 1-2 minutes)
3. **Note your URL**: `https://your-app.vercel.app`
4. **Test frontend** by visiting the URL

---

## 🔄 Step 3: Connect Backend & Frontend

### 3.1 Update Backend CORS
In Northflank dashboard, update the `FRONTEND_URL` environment variable:

```env
FRONTEND_URL=https://your-app.vercel.app
```

### 3.2 Redeploy Backend
Northflank will automatically redeploy when you update environment variables.

---

## 🧪 Testing Your Deployment

### Test Backend API
```bash
# Test guest user creation
curl https://your-service.northflank.app/api/auth/guest

# Test OTP sending
curl -X POST https://your-service.northflank.app/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Test Frontend
1. Visit your Vercel URL
2. Try creating a guest account
3. Test OTP login
4. Verify all features work

---

## 🔧 Troubleshooting

### Backend Issues (Northflank)

**Build Fails:**
- Check Northflank build logs
- Verify all dependencies in `package.json`
- Ensure TypeScript compilation passes

**API Not Responding:**
- Check service logs in Northflank dashboard
- Verify environment variables are set correctly
- Test MongoDB connection

**CORS Errors:**
- Ensure `FRONTEND_URL` is set correctly
- Check that your Vercel domain is allowed

### Frontend Issues (Vercel)

**White Screen:**
- Check browser console for errors
- Verify `VITE_API_URL` is set correctly
- Ensure backend is accessible

**Build Fails:**
- Check Vercel build logs
- Verify all dependencies are installed
- Check TypeScript compilation

**API Calls Fail:**
- Verify `VITE_API_URL` points to correct Northflank URL
- Check CORS configuration on backend
- Test API endpoints directly

---

## 🌐 Environment Variables Summary

### Northflank (Backend)
```env
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<db>
JWT_SECRET=<generated_secret>
JWT_REFRESH_SECRET=<generated_refresh_secret>
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
PORT=3000
```

### Vercel (Frontend)
```env
VITE_API_URL=https://your-service.northflank.app/api
```

---

## 📧 Gmail App Password Setup

1. **Enable 2-Factor Authentication** on Gmail
2. **Generate App Password**:
   - Google Account → Security → 2-Step Verification
   - App passwords → Generate for "Mail"
3. **Use the 16-character password** in `EMAIL_PASS`

---

## ✅ Deployment Checklist

### Backend (Northflank)
- [ ] MongoDB Atlas database created
- [ ] Environment variables configured
- [ ] Gmail app password generated
- [ ] Service deployed successfully
- [ ] API endpoints responding
- [ ] CORS configured for Vercel domain

### Frontend (Vercel)
- [ ] Project deployed successfully
- [ ] `VITE_API_URL` set correctly
- [ ] Build completed without errors
- [ ] Frontend accessible at Vercel URL
- [ ] Can connect to backend API

### Integration
- [ ] Backend accepts requests from Vercel
- [ ] Frontend can make API calls
- [ ] Authentication working
- [ ] All features functional

---

## 🎉 Success!

Your full-stack app is now deployed:
- **Backend**: `https://your-service.northflank.app`
- **Frontend**: `https://your-app.vercel.app`

Both services are production-ready with proper CORS, environment variables, and security configurations! 🚀 