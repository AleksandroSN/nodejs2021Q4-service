import type { dataModels } from "../../types";
import { User } from "./user.model";

interface UserRepoModel {
  users: dataModels.UserModel[];
  getAllUsers(): Promise<dataModels.UserModel[]>;
  addUser(body: dataModels.UserModel): Promise<User>;
  findUser(id: string): Promise<dataModels.UserModel | undefined>;
  updateUser(id: string, body: dataModels.UserModel): Promise<User>;
  deleteUser(id: string): Promise<void>;
}

/**
 * class for work with users array (InMemoryDB)
 * @returns instance class `UserRepo` empty users arr
 */
class UserRepo implements UserRepoModel {
  users: dataModels.UserModel[];

  constructor() {
    this.users = [];
  }

  /**
   * Get all users from array
   * @returns `Promise<dataModels.UserModel[]>`
   */

  async getAllUsers() {
    return Promise.resolve(this.users);
  }

  /**
   * Add new user into array
   * @returns `Promise<User>`
   */

  async addUser(body: dataModels.UserModel) {
    const user = new User(body);
    this.users.push(user);
    return Promise.resolve(user);
  }

  /**
   * Get user on id from array
   * @returns `Promise<dataModels.UserModel>` or `undefined`
   */

  async findUser(id: string) {
    const result = this.users.find((user) => user.id === id);
    return Promise.resolve(result);
  }

  /**
   * Update user on id from array
   * @returns `Promise<dataModels.UserModel>`
   */

  async updateUser(id: string, body: dataModels.UserModel) {
    const userIdx = this.users.findIndex((user) => user.id === id);
    const updatedUser = {
      ...this.users[userIdx],
      ...body,
    } as dataModels.UserModel;
    this.users.splice(userIdx, 1, updatedUser);
    return Promise.resolve(updatedUser);
  }

  /**
   * Delete user on id from array
   * @returns `Promise<void>`
   */

  async deleteUser(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
    return Promise.resolve();
  }
}

export const userRepo = new UserRepo();
