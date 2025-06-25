# 🚀 Quick Deployment Reference

## 📋 Your Deployment Plan
- **Backend**: Northflank (app.northflank.com)
- **Frontend**: Vercel (vercel.com)

---

## 🔑 Generated Secrets (Use These!)
```
JWT_SECRET: e7aa7d77d7e373713bdd...
JWT_REFRESH_SECRET: b801b1d2cd823896f1ab...
```

---

## 🌐 Environment Variables

### Northflank (Backend)
```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
JWT_SECRET=e7aa7d77d7e373713bdd...
JWT_REFRESH_SECRET=b801b1d2cd823896f1ab...
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
PORT=3000
```

### Vercel (Frontend)
```env
VITE_API_URL=https://your-service.northflank.app/api
```

---

## 📋 Deployment Steps

### 1. Backend (Northflank)
1. Go to [app.northflank.com](https://app.northflank.com)
2. Create project → Create service → Application
3. Connect GitHub repo
4. Set source directory: `backend`
5. Add environment variables (above)
6. Deploy

### 2. Frontend (Vercel)
1. Go to [vercel.com](https://vercel.com)
2. New project → Import repo
3. Set root directory: `frontend`
4. Add `VITE_API_URL` environment variable
5. Deploy

### 3. Connect
1. Update `FRONTEND_URL` in Northflank with your Vercel domain
2. Test both services

---

## 🧪 Test Commands
```bash
# Test backend
curl https://your-service.northflank.app/api/auth/guest

# Test OTP
curl -X POST https://your-service.northflank.app/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

---

## 📧 Gmail Setup
1. Enable 2FA on Gmail
2. Generate App Password for "Mail"
3. Use 16-character password in `EMAIL_PASS`

---

## 🎯 Expected URLs
- **Backend**: `https://your-service.northflank.app`
- **Frontend**: `https://your-app.vercel.app`

---

## 🆘 Quick Fixes

**Backend not responding?**
- Check Northflank logs
- Verify MongoDB connection
- Test environment variables

**Frontend white screen?**
- Check Vercel build logs
- Verify `VITE_API_URL` is correct
- Check browser console

**CORS errors?**
- Update `FRONTEND_URL` in Northflank
- Ensure Vercel domain is allowed

---

## 📁 Files Created
- ✅ `northflank-deploy.md` - Northflank specific guide
- ✅ `NORTHFLANK_VERCEL_DEPLOYMENT.md` - Complete guide
- ✅ `DEPLOYMENT_QUICK_REFERENCE.md` - This file
- ✅ `.env.example` - Generated with secure secrets
- ✅ Fixed CORS for production
- ✅ Fixed API URL configuration

**Ready to deploy! 🚀** 