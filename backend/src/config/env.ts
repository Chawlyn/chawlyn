import dotenv from 'dotenv';
dotenv.config();

export const environment = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  EXPIRY: process.env.EXPIRY,
}