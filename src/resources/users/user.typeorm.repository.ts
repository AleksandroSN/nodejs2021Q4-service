import { getRepository } from "typeorm";
import { User } from "./user.model";
import type { dataModels } from "../../types";

const getAllUsers = async (): Promise<dataModels.UserModel[]> =>
  getRepository(User).find();

const addUser = async (
  body: dataModels.UserModel
): Promise<dataModels.UserModel> => {
  const user = await getRepository(User).save(body);
  return user;
};

const findUser = async (
  id: string
): Promise<dataModels.UserModel | undefined> => {
  const user = await getRepository(User).findOne(id);
  return user;
};

const updateUser = async (
  id: string,
  body: dataModels.UserModel
): Promise<dataModels.UserModel> => {
  const user = await getRepository(User).findOne(id);
  const updatedUser = { ...user, ...body } as dataModels.UserModel;
  const result = await getRepository(User).save(updatedUser);
  return result;
};

const deleteUser = async (id: string) => getRepository(User).delete(id);

export const userRepo = {
  getAllUsers,
  addUser,
  findUser,
  updateUser,
  deleteUser,
};
