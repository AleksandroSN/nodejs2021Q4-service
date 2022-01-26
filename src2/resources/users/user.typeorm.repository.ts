import { DeleteResult, getRepository } from "typeorm";
import { User } from "./user.model";
import type { dataModels } from "../../types";

/**
 * Get all users from PGTable Users
 * @returns `Promise<dataModels.UserModel[]>`
 */

const getAllUsers = async (): Promise<dataModels.UserModel[]> =>
  getRepository(User).find();

/**
 * Add new user to PGTable Users
 * @returns `Promise<dataModels.UserModel>`
 */

const addUser = async (
  body: dataModels.UserModel | dataModels.AuthModel
): Promise<dataModels.UserModel> => {
  const user = await getRepository(User).save(body);
  return user;
};

/**
 * Get one user on id from PGTable Users
 * @returns `Promise<dataModels.UserModel>`
 */

const findUser = async (
  id: string
): Promise<dataModels.UserModel | undefined> => {
  const user = await getRepository(User).findOne(id);
  return user;
};

/**
 * Get one user on login from PGTable Users
 * @returns `Promise<dataModels.UserModel>`
 */

const findUserByLogin = async (
  login: string
): Promise<dataModels.UserModel | undefined> => {
  const user = await getRepository(User).findOne({ login });
  return user;
};

/**
 * Update user on id from PGTable Users
 * @returns `Promise<dataModels.UserModel>`
 */

const updateUser = async (
  id: string,
  body: dataModels.UserModel
): Promise<dataModels.UserModel> => {
  const usersRepository = getRepository(User);
  const user = await usersRepository.findOne(id);
  const updatedUser = { ...user, ...body } as dataModels.UserModel;
  const result = await usersRepository.save(updatedUser);
  return result;
};

/**
 * Delete user from PGTable Users
 * @returns `Promise<DeleteResult>`
 */

const deleteUser = async (id: string): Promise<DeleteResult> =>
  getRepository(User).delete(id);

export const userRepo = {
  getAllUsers,
  addUser,
  findUser,
  findUserByLogin,
  updateUser,
  deleteUser,
};
