import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  isGuest?: boolean;
  otp?: string;
  otpExpires?: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
  getSignedJwtToken(): string;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserModel extends Model<IUser> {
  // Add any static methods here if needed
}

const UserSchema: Schema = new Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Please add a name'],
      trim: true
    },
    email: { 
      type: String, 
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    password: { 
      type: String, 
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    },
    isGuest: {
      type: Boolean,
      required: true,
      default: false
    },
    otp: {
      type: String,
      select: false
    },
    otpExpires: {
      type: Date,
      select: false
    }
  },
  {
    timestamps: true
  }
);

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return require('jsonwebtoken').sign(
    { id: this._id },
    process.env.JWT_SECRET || 'your_jwt_secret',
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser, IUserModel>('User', UserSchema);

export default User;