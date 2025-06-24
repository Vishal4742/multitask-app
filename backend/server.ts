import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';

// Import routes (to be added later)
// import userRoutes from './routes/userRoutes';
// import eventRoutes from './routes/eventRoutes';
// import reminderRoutes from './routes/reminderRoutes';
// import todoRoutes from './routes/todoRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/reminders', reminderRoutes);
// app.use('/api/todos', todoRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || '', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
  console.error('MongoDB connection error:', err);
}); 