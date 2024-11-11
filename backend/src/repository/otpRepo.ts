import OTP, { IOTP } from '../models/otpModel';
import { ErrorResponse } from '../utils/errorResponse';
import crypto from 'crypto';

export class OTPRepository {

  // create otp
  // create otp
  static async createOTP(userId: string) {
    const otp = crypto.randomInt(100000, 999999).toString(); // Generates a 6-digit OTP
    const expiry = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes for both

    const otpRecord = new OTP({
      otp,
      userId: userId,
      expiry,
    });

    await otpRecord.save();
    return otp;
  }

  // get otp
  static async getOTP(otp: string) {
    const otpData = await OTP.findOne({ otp });
    if (!otpData) {
      throw new ErrorResponse('Invalid OTP', 400);
    }
  
    // Check if OTP has expired
    if (otpData.expiry < Date.now()) {
      throw new ErrorResponse('OTP has expired', 400);
    }
  
    return otpData;
  }
  
  // update otp
  static async updateOTP(id: string, update: Partial<IOTP>) {
    if (!update.otp) {
      // If otp is not provided, you may choose to throw an error or use some default behavior.
      throw new ErrorResponse('OTP value is required to update', 400);
    }
  
    // Generate a new OTP and set expiry
    update.otp = crypto.randomInt(100000, 999999).toString();
    update.expiry = Date.now() + 10 * 60 * 1000;
  
    // Directly use findOneAndUpdate
    const otpData = await OTP.findOneAndUpdate({ userId: id }, update, { new: true });
  
    if (!otpData) {
      throw new ErrorResponse("OTP record not found for this user", 404);
    }
  
    return otpData;
  }  
}
