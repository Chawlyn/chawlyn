import { NextFunction, Request, Response } from 'express';
import { User } from '../usecases/users';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken, verifyToken } from '../utils/jwt';
import asyncHandler from "../middleware/async";
import { ErrorResponse } from '../utils/errorResponse';
import { loginUser, registerUser, resetLink } from '../validators/user';

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

  return res.status(201).json(user);
});

export const login = asyncHandler(async (req: Request, res: Response, next:NextFunction)=> {

  const { error, value } = loginUser.validate(req.body);

  if (error) {
    throw next(new ErrorResponse(error.details[0].message, 400));
  }

  const { email, password } = value;
  
  // Check if user exists
  let user = await User.userByEmail(email) 

  if (!user) {
    throw next(new ErrorResponse("User not found", 404));
  }

  // Authenticate user
  const verify = await comparePassword(password, user.password);

  if (!verify) {
    throw next(new ErrorResponse("Password is incorrect", 400));
  }

  // Update session token and save user
  const token = await generateToken(email);
  user.token = token;
  await user.save();
  
  return res.status(200).json({ success: true, message: "User has successfully logged in", data: user});
});

export const googleLogged = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
  req.user ? next() : res.status(401).json({ message: "User isn't logged in"})
})

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