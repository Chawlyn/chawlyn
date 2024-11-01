import { Request, Response } from 'express';
import { User } from '../usecases/users';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken, verifyToken } from '../utils/jwt';
import asyncHandler from "../middleware/async";
import { ErrorResponse } from '../utils/errorResponse';
import { loginUser, registerUser } from '../validators/user';
import { IUser } from '../models/user';

export const register = asyncHandler(async (req: Request, res: Response) => {

  console.log(req.body)

  const { error, value } = registerUser.validate(req.body);

  if (error) {
    throw new ErrorResponse("Email, password and username is required", 400);
  }

  const { email, password, username } = value;
  
  const existingUser = await User.userByEmail(email);
  if (existingUser) {
    console.log("User already exists")
    throw new ErrorResponse("User already exists", 400);
    ;
  }

  const user = await User.create(value);

  return res.status(201).json(user);

});

export const login = asyncHandler(async (req: Request, res: Response)=> {

  const { error, value } = loginUser.validate(req.body);

  if (error) {
    throw new ErrorResponse("Email and password is required", 400);
  }

  const { email, password } = value;
  
  // Check if user exists
  let user = await User.userByEmail(email) 

  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }

  // Authenticate user
  const verify = await comparePassword(password, user.password);

  if (!verify) {
    throw new ErrorResponse("Password is incorrect", 400);
  }

  // Update session token and save user
  const token = await generateToken(email);
  user.token = token;
  await user.save();

  // Set cookie and return response
  res.cookie("token", user.token, {
    domain: "localhost",
    path: "/",
  });
  
  return res.status(200).json(user);
});