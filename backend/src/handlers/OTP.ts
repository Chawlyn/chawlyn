import { NextFunction } from 'express';
import { OTP } from '../usecases/otp'; 

import { User } from '../usecases/users';
import { ErrorResponse } from '../utils/errorResponse';

export const generateOTP = async (userId: string ) => {
  const otp = await OTP.create(userId);
  return otp;
}

export const verifyOTP = async (otp: number) => {
  if (!otp) throw new ErrorResponse("No OTP given", 401);

  const getOtp = await OTP.get(otp);

  if (!getOtp) {
    new ErrorResponse("Invalid OTP", 401);
  }

  if (getOtp.expiry < Date.now() ) {
    return new ErrorResponse("OTP expired", 400);
  }

  return getOtp;
}

// export const verifyOTP = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//   const { userId, otp } = req.body;

//   // Find the OTP record by userId and otp
//   // const otpRecord = await OTP.findOne({ userId, otp });

//   // if (!otpRecord) {
//   //   return next(new ErrorResponse("Invalid or expired OTP", 400));
//   // }

//   // if (otpRecord.expiry < Date.now()) {
//   //   await otpRecord.delete(); // Clean up expired OTPs
//   //   return next(new ErrorResponse("OTP expired", 400));
//   // }

//   // await otpRecord.delete(); // Remove OTP after successful verification

//   // If OTP is valid, take action based on the flow type
//   // If it's a signup, mark the user as verified or activate the account
//   // If it's a password reset, allow the user to reset their password

//   return res.status(200).json({ success: true, message: "OTP verified successfully" });
// });

// export const generateAndSaveOTP = async (userId: string, type: 'signup' | 'reset') => {

//   // If it's a password reset, send the OTP via email (this could be added here or in a controller)
//   if (type === 'reset') {
//     // Implement email sending logic here, e.g. using NodeMailer
//     sendOTPByEmail(userId, otp); // Placeholder for sending email with the OTP
//   }

//   // return otp;
// };

// // Sample function to simulate sending OTP via email (you would use a real service like Nodemailer here)
// const sendOTPByEmail = async (userId: string, otp: string) => {
//   const user = await User.findById(userId);
//   if (user) {
//     // Send email logic here (use your email service)
//     console.log(`Sending OTP: ${otp} to email: ${user.email}`);
//   }
// };

