import mongoose, { Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  role?: string;
  password?: string;
  token: string;
  _id: string;
  googleId: string;
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'seller'], default: 'user' },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password is only required if googleId is not present
    }
  },
  googleId: { type: String, unique: true },
  token: { type: String, select: false },
},
{
  toJSON: {
      transform: function (doc, ret) { 
        delete ret.password;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      }
  },
  timestamps: true,
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;