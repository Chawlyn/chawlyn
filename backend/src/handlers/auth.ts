import { NextFunction, Request, Response } from 'express';
import { User } from '../usecases/users';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken, verifyToken } from '../utils/jwt';
import asyncHandler from "../middleware/async";
import { ErrorResponse } from '../utils/errorResponse';
import { loginUser, registerUser, resetLink } from '../validators/user';
import passport from 'passport';
import { generateOTP } from './OTP';

export const register = asyncHandler(async (req: Request, res: Response, next:NextFunction) => {

  const { error, value } = registerUser.validate(req.body);

  if (error) {
    console.error(error);
    throw next(new ErrorResponse(error.details[0].message, 400));
  }

  const { email, password, confirmPassword, username } = value;

  if (password !== confirmPassword) {
    throw next(new ErrorResponse("Passwords don't match", 400));
  }
  
  const existingUser = await User.userByEmail(email);
  if (existingUser) {
    console.log("User already exists")
    throw next(new ErrorResponse("User already exists", 400));
  }
  
  const user = await User.create(value);

  // Generate and save OTP for the user’s email verification
  const otp = await generateOTP(user._id, 'signup');

  return res.status(201).json({
    success: true,
    message: "User registered. Please verify OTP to complete registration.",
    otp, // For testing only. Remove this in production.
  });
});

export const verifyOTP = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { userId, otp } = req.body;

  // Find the OTP record by userId and otp
  const otpRecord = await OTP.findOne({ userId, otp });

  if (!otpRecord) {
    return next(new ErrorResponse("Invalid or expired OTP", 400));
  }

  if (otpRecord.expiry < Date.now()) {
    await otpRecord.delete(); // Clean up expired OTPs
    return next(new ErrorResponse("OTP expired", 400));
  }

  await otpRecord.delete(); // Remove OTP after successful verification

  // If OTP is valid, take action based on the flow type
  // If it's a signup, mark the user as verified or activate the account
  // If it's a password reset, allow the user to reset their password

  return res.status(200).json({ success: true, message: "OTP verified successfully" });
});

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

  const { error, value } = loginUser.validate(req.body);

  if (error) {
    throw next(new ErrorResponse(error.details[0].message, 400));
  }

  const { email, password } = value;

  // Check if user exists
  let user = await User.userByEmail(email);

  if (!user) {
    throw next(new ErrorResponse("User not found", 404));
  }

  // Check if it's an email/password login or a Google login
  if (user.password) {
    // Email and password login

    // Authenticate user with password
    const verify = await comparePassword(password, user.password);

    if (!verify) {
      throw next(new ErrorResponse("Password is incorrect", 400));
    }

  } else if (!user.googleId) {
    // Password not provided, but user is not a Google user
    throw next(new ErrorResponse("Password is required for email login", 400));
  }

  // Generate token for the session
  const token = await generateToken(email);
  user.token = token;
  await user.save();

  return res.status(200).json({ success: true, message: "User has successfully logged in", data: user });
});

export function oAuth(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('google', { scope: ['profile', 'email'], session: false }, async (err: any, user: any, info: any) => {
    if (err) {
      console.error('Error during authentication:', err);
      throw next(new ErrorResponse('Authentication failed', 400));
    }
    if (!user) {
      console.log('No user found:', info);
      throw next(new ErrorResponse('Authentication failed', 404));
    }

    try {
      // Extract email and name from the authenticated user (assuming it's provided by Google)
      const email = user.email;
      const username = user.username;

      // Ensure email and name exist
      if (!email || !username) {
        throw next(new ErrorResponse('Missing email or name from user data', 400));
      }

      // Update session token and save user
      // user.sessionToken = authentication(user.salt, user._id.toString());
      await user.save();

      // Respond with the JWT and email result
      return res.json({ message: 'Authentication successful', data: user });

    } catch (err: any) {
      throw next(new ErrorResponse(err.message, 500))
    }
  })(req, res, next);
};

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  
  const { error, value } = resetLink.validate(req.body);

  if (error) {
    throw new ErrorResponse("Email is required", 400)
  }

  const { email } = value;

  const user = await User.userByEmail(email);

  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }

  const token = await generateToken(email);

  return res.status(200).json({ message: "Here is your reset token", token});
});

export const reset = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params;
})