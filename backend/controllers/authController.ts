import { Request, Response } from 'express';
const { validationResult } = require('express-validator');
import { sendEmail } from '../utils/mailer';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';
import crypto from 'crypto';

// Generate JWT Token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret', {
    expiresIn: '15m', // short expiry for access token
  });
};

const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || 'your_refresh_secret', {
    expiresIn: '7d',
  });
};

// @desc    Create guest user
// @route   POST /api/auth/guest
// @access  Public
export const createGuestUser = async (req: Request, res: Response) => {
  console.log('🎭 Guest user creation started');
  
  try {
    // Generate a unique guest email
    const guestId = Math.random().toString(36).substring(2, 15);
    const guestEmail = `guest_${guestId}@taskmanager.local`;
    const guestName = `Guest User ${guestId.substring(0, 6)}`;
    
    console.log('📧 Generated guest email:', guestEmail);
    
    // Generate a temporary password
    const tempPassword = Math.random().toString(36).slice(-8);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(tempPassword, salt);
    
    console.log('🔐 Password hashed successfully');
    
    // Create guest user
    const user = await User.create({ 
      name: guestName,
      email: guestEmail, 
      password: hashedPassword,
      isGuest: true
    }) as IUser;
    
    console.log('👤 Guest user created in database:', user._id);
    
    // Generate tokens
    const accessToken = generateToken(String(user._id));
    const refreshToken = generateRefreshToken(String(user._id));
    
    console.log('🔑 Tokens generated successfully');
    
    // Set refresh token cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    console.log(`🎭 Guest user created: ${guestEmail}`);
    
    const responseData = {
      _id: String(user._id),
      name: user.name,
      email: user.email,
      token: accessToken,
      isGuest: true,
      message: 'Guest account created successfully'
    };
    
    console.log('📤 Sending response:', responseData);
    res.status(201).json(responseData);
    console.log('✅ Guest user creation completed successfully');
    
  } catch (error: any) {
    console.error('❌ Guest user creation error:', error);
    
    if (!res.headersSent) {
      res.status(500).json({ 
        message: error.message || 'Failed to create guest user',
        error: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }
};

// @desc    Send OTP for login
// @route   POST /api/auth/send-otp
// @access  Public
export const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: 'Email required' });
    return;
  }
  try {
    let user = await User.findOne({ email }) as IUser | null;
    
    // If user doesn't exist, create a new user
    if (!user) {
      // Generate a temporary password for new user
      const tempPassword = Math.random().toString(36).slice(-8);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(tempPassword, salt);
      
      user = await User.create({ 
        name: email.split('@')[0], // Use email prefix as name
        email, 
        password: hashedPassword 
      }) as IUser;
      
      console.log(`New user created for email: ${email}`);
    }
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    user.otp = hashedOtp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry
    await user.save();
    
    // For development, log the OTP to console
    console.log(`📧 OTP for ${email}: ${otp}`);
    
    // Send OTP via email
    try {
      await sendEmail(email, 'Your OTP Code', `Your OTP code is: ${otp}`);
      res.json({ 
        message: 'OTP sent to email',
        note: user.name === email.split('@')[0] ? 'New account created automatically' : undefined,
        // In development, also return the OTP for testing
        otp: process.env.NODE_ENV === 'development' ? otp : undefined
      });
    } catch (mailErr: any) {
      console.error('Email sending error:', mailErr);
      res.status(500).json({ 
        message: 'Failed to send OTP email', 
        error: mailErr.message,
        note: 'Check console for email details in development mode',
        // In development, return the OTP even if email fails
        otp: process.env.NODE_ENV === 'development' ? otp : undefined
      });
      return;
    }
  } catch (error: any) {
    console.error('OTP generation error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify OTP and login
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    res.status(400).json({ message: 'Email and OTP required' });
    return;
  }
  try {
    const user = await User.findOne({ email }).select('+otp +otpExpires') as IUser | null;
    if (!user || !user.otp || !user.otpExpires) {
      res.status(400).json({ message: 'OTP not found' });
      return;
    }
    if (user.otpExpires < new Date()) {
      res.status(400).json({ message: 'OTP expired' });
      return;
    }
    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid OTP' });
      return;
    }
    
    // Clear OTP after successful verification
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    
    const _user = user as IUser;
    const accessToken = generateToken(String(_user._id));
    const refreshToken = generateRefreshToken(String(_user._id));
    
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    console.log(`✅ OTP verified successfully for ${email}`);
    
    res.json({
      _id: String(_user._id),
      name: _user.name,
      email: _user.email,
      token: accessToken,
      isGuest: _user.isGuest || false
    });
  } catch (error: any) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email }) as IUser | null;
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });
    if (user) {
      const _user = user as IUser;
      const accessToken = generateToken(String(_user._id));
      const refreshToken = generateRefreshToken(String(_user._id));
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(201).json({
        _id: String(_user._id),
        name: _user.name,
        email: _user.email,
        token: accessToken,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }) as IUser | null;
    if (user && (await bcrypt.compare(password, user.password))) {
      const _user = user as IUser;
      const accessToken = generateToken(String(_user._id));
      const refreshToken = generateRefreshToken(String(_user._id));
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({
        _id: String(_user._id),
        name: _user.name,
        email: _user.email,
        token: accessToken,
        isGuest: _user.isGuest || false
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-password') as IUser | null;
    const _user = user as IUser;
    res.json(_user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh-token
// @access  Public (uses refresh token cookie)
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      res.status(401).json({ message: 'No refresh token provided' });
      return;
    }
    const decoded: any = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'your_refresh_secret');
    const user = await User.findById(decoded.id) as IUser | null;
    if (!user) {
      res.status(401).json({ message: 'Invalid refresh token' });
      return;
    }
    const _user = user as IUser;
    const accessToken = generateToken(String(_user._id));
    res.json({ token: accessToken });
  } catch (error: any) {
    res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
export const logout = async (req: Request, res: Response) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.json({ message: 'Logged out successfully' });
};

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
export const updateMe = async (req: any, res: Response): Promise<void> => {
  try {
    const updates: any = {};
    if (req.body.name !== undefined) updates.name = req.body.name;
    if (req.body.phone !== undefined) updates.phone = req.body.phone;
    if (req.body.bio !== undefined) updates.bio = req.body.bio;

    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
