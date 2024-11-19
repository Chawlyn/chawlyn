import { Schema, Document, model, Types } from "mongoose";

export interface IOTP extends Document {
  otp: number;
  userId: Types.ObjectId;
  expiry: number;
}

const otpSchema = new Schema<IOTP>({
  otp: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  expiry: {
    type: Number,
    required: true,
  },
},
{
  toJSON: {
      transform: function (doc, ret) { 
        delete ret.__v;
        delete ret.createdAt;
      }
  }, 
  timestamps: true,
});

const OTP = model<IOTP>('OTP', otpSchema);

export default OTP;