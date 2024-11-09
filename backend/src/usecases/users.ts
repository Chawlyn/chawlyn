import { UserRepository } from '../repository/users';
import { IUser } from '../models/user';
import { ErrorResponse } from '../utils/errorResponse';

export class User {
  // create a new user
  static async create(user:IUser) {
    return await UserRepository.createUser(user);
  }

  // get a user by email
  static async userByEmail(email:string) {
    return await UserRepository.getUserByEmail(email);
  }

  // get all users
  static async fetchUsers() {
    return await UserRepository.getUsers();
  }

  // delete a user
  static async deleteUser(id:string) {
    return await UserRepository.deleteUser(id);
  }

  // update a user
  static async update(id:string, update: IUser) {
    return await UserRepository.updateUser(id, update);
  }

  // get a user by id
  static async userById(id:string) {
    return await UserRepository.getUserById(id);
  }
};