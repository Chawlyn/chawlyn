import nodemailer from 'nodemailer';

export const sendEmailVerificationOTP = async (email: string, otp: string) => {
  // Implement email sending logic here
  console.log(`Email verification OTP sent to ${email}: ${otp}`);
};