# Quick Render Deployment

## 🚀 5-Minute Render Setup

### Step 1: MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create free account
3. Create new cluster (free tier)
4. Create database user
5. Get connection string

### Step 2: Render Deployment
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repo
5. Configure:
   ```
   Name: multitask-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

### Step 3: Environment Variables
Add these in Render dashboard:

```
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<db>
JWT_SECRET=your_generated_secret_here
JWT_REFRESH_SECRET=your_generated_refresh_secret_here
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
```

### Step 4: Deploy
Click "Create Web Service" and wait for deployment.

### Step 5: Test
Your API will be available at: `https://your-app-name.onrender.com`

Test with:
```bash
curl https://your-app-name.onrender.com/api/auth/guest
```

## 🔑 Generate Secrets
Run this in your backend directory:
```bash
node setup-env.js
```

## 📧 Gmail Setup
1. Enable 2FA on Gmail
2. Generate App Password
3. Use app password in EMAIL_PASS

That's it! Your backend is deployed. 🎉 