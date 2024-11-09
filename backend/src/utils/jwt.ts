import jwt from 'jsonwebtoken';
import environment from '../config/env';
import { ErrorResponse } from './errorResponse';

const JWT_SECRET = environment.JWT_SECRET;
const JWT_EXPIRES = environment.EXPIRY;


if (!JWT_SECRET || !JWT_EXPIRES) {
  throw new ErrorResponse("JWT Secret or Expiry is needed", 500)
}

export const generateToken = async (email: string) => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_EXPIRES })
}

export const verifyToken = async (token: string) => {
  return jwt.verify(token, JWT_SECRET)
}