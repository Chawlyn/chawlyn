import twilio from "twilio";
import environment from '../config/env'

const client = twilio(environment.TWILIO_ACCOUNT_SID, environment.TWILIO_AUTH_TOKEN)

export const sendSMSVerificationOTP = async (phoneNumber: string, otp: number) => {
  try {
    const message = await client.messages.create({
      body: `Here is your OTP Code: ${otp}`,
      to: phoneNumber,
      from: environment.COMPANY_PHONE_NUMBER
    });
    console.log(`SMS verification OTP sent to ${phoneNumber}: ${otp}`);
    return message;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};