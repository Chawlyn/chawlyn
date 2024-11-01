import mongoose, { Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  role?: string;
  password: string;
  token: string;
  _id: string;
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'seller'], default: 'user' },
  password: { type: String, required: true, select: false },
  token: { type: String, select: false }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;