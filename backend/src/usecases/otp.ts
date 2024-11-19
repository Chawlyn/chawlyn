import { OTPRepository } from "../repository/otpRepo";

export class OTP {
  // create otp
  static async create(userId: string) {
    return await OTPRepository.createOTP(userId)
  }

  // get otp
  static async get(otp:number){
    return await OTPRepository.getOTP(otp)
  }

  // update otp
  static async update(userId:string) {
    return await OTPRepository.updateOTP(userId)
  }
}