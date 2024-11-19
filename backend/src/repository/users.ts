import { ErrorResponse } from '../utils/errorResponse';
import User from '../models/user';
import { IUser } from '../models/user';
import { Types } from 'mongoose';
import { generateToken } from '../utils/jwt';
import { hashPassword } from '../utils/hash';

export class UserRepository {
  // create a new user
  static async createUser(values: IUser) {
    try {
      // Hash password only if it's provided (for email signups)
      const hash = values.password ? await hashPassword(values.password) : undefined;
      
      // Automatically verify email for google signup
      const emailVerified = values.emailVerified ? true : undefined;

      const phoneVerified = values.phoneVerified ? true : undefined;

      const newToken = await generateToken(values.email);
  
      const user = await new User({
        username: values.username,
        email: values.email,
        role: values.role,
        password: hash,  // This will be undefined for Google signups
        token: newToken,
        phomeNumber: values.phoneNumber,
        emailVerified,
        phoneVerified
      }).save();
  
      return user.toObject();
    } catch (error: any) {
      throw new ErrorResponse(error.message, 500);
    }
  }  
  
  // get all users
  static async getUsers() {
    try {
      return await User.find().exec()
    } catch (error:any) {
      throw new ErrorResponse(error.message, 500);
    }
  }

  // get a user by email
  static async getUserByEmail(email:string) {
    try {
      return await User.findOne({ email })
    } catch (error:any) {
      throw new ErrorResponse(error.message, 500)
    }
  }

  // get user by id
  static async getUserById(id: string) {
    try {
      return await User.findById(id);
    } catch (error:any) {
      throw new ErrorResponse(error.message, 500)
    }
  }

  // update user details
  static async updateUser(id: string, update: Partial<IUser>) {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new ErrorResponse("User not found", 404);
      }
      return await User.findByIdAndUpdate(id, update, { new: true }).exec();
    } catch (error: any) {
      throw new ErrorResponse(error.message, 500);
    }
  }   

  // delete a user
  static async deleteUser(id: string) {
    try {
      return await User.findOneAndDelete({_id: id})
    } catch (error:any) {
      throw new ErrorResponse(error.message, 500)
    }
  }
}