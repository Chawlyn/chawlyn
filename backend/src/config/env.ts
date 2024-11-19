import dotenv from 'dotenv';
dotenv.config();

const environment = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  EXPIRY: process.env.EXPIRY,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  COMPANY_PHONE_NUMBER: process.env.COMPANY_PHONE_NUMBER
}

export default environment;