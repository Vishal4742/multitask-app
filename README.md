# MultiTask

A modern, full-stack event and task manager app with a beautiful glassmorphism UI, designer typography, and robust authentication. Built with React, TypeScript, Tailwind CSS, Express, and MongoDB.

---

## ✨ Features
- **Glassmorphism UI**: Liquid glass effects throughout the app for a modern, premium feel.
- **Designer Typography**: Uses Space Grotesk for a clean, creative look.
- **Event & Task Management**: Create, view, update, and archive events, reminders, and todos.
- **Hourly Todos**: Organize your day by the hour.
- **Reminders**: Never miss important tasks or events.
- **User Authentication**: Register, login, OTP login, and guest mode with JWT.
- **Profile Management**: Update your name, phone, and bio.
- **Responsive Design**: Works beautifully on desktop and mobile.
- **Notifications**: Global toast system for feedback.

---

## 🛠️ Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Space Grotesk font
- **Backend**: Express, TypeScript, MongoDB, Mongoose, JWT, bcrypt, nodemailer
- **Other**: React Router, Axios, ESLint, Prettier

---

## 📁 Folder Structure
```
task-manager-app/
  backend/         # Express + MongoDB API
    controllers/   # Route controllers (auth, events, reminders, todos, users)
    middleware/    # Auth, error, rate limiting
    models/        # Mongoose models
    routes/        # API routes
    utils/         # Utility functions (mailer, token)
    server.ts      # Entry point
    ...
  frontend/        # React + Vite + Tailwind app
    src/
      components/  # UI, layout, auth, events, reminders, etc.
      hooks/       # Custom React hooks
      pages/       # Main pages (Index, Events, Reminders, Archive, Profile)
      api/         # Axios instance and API functions
      context/     # Notification and Auth context
      ...
    index.html
    tailwind.config.ts
    ...
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```sh
git clone https://github.com/Vishal4742/multitask-app.git
cd multitask-app
```

### 2. Setup the Backend
```sh
cd backend
cp .env.example .env # Fill in your MongoDB URI and secrets
npm install
npm start
```

#### Example `.env` for Backend
```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/multitask
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=development
```

### 3. Setup the Frontend
```sh
cd ../frontend
npm install
npm run dev
```

#### Environment Variables (Frontend)
- If you need to set API URLs, use Vite's `.env` system (e.g., `VITE_API_URL`).

---

## 🏗️ Build for Production

### Frontend
```sh
npm run build
npm run preview # To test the production build locally
```

### Backend
- Deploy to Render, Railway, Heroku, or your server.

---

## 🌐 Deployment

### Frontend (Vercel/Netlify/Static Host)
1. Go to [vercel.com](https://vercel.com/) or [netlify.com](https://netlify.com/)
2. Connect your GitHub repo and select the `frontend` folder as the root.
3. Set environment variables if needed (e.g., `VITE_API_URL`).
4. Deploy!

### Backend (Render/Railway/Heroku/Your Server)
1. Go to [render.com](https://render.com/) or [railway.app](https://railway.app/)
2. Connect your GitHub repo and select the `backend` folder as the root.
3. Set environment variables (`MONGO_URI`, `JWT_SECRET`, etc.).
4. Deploy!

---

## 🧩 Contribution
1. Fork the repo and clone your fork.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to your fork: `git push origin feature/your-feature`
5. Open a Pull Request on GitHub.

---

## 📄 License
[MIT](LICENSE)

---

## 🙏 Credits
- UI inspired by modern glassmorphism and designer portfolios.
- Built with love by vishal