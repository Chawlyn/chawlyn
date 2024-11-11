import crypto from 'crypto';
import OTP from '../models/otpModel'; 

export const generateAndSaveOTP = async (userId: string, type: 'signup' | 'reset') => {

  // If it's a password reset, send the OTP via email (this could be added here or in a controller)
  // if (type === 'reset') {
  //   // Implement email sending logic here, e.g. using NodeMailer
  //   sendOTPByEmail(userId, otp); // Placeholder for sending email with the OTP
  // }

  // return otp;
};

// // Sample function to simulate sending OTP via email (you would use a real service like Nodemailer here)
// const sendOTPByEmail = async (userId: string, otp: string) => {
//   const user = await User.findById(userId);
//   if (user) {
//     // Send email logic here (use your email service)
//     console.log(`Sending OTP: ${otp} to email: ${user.email}`);
//   }
// };

