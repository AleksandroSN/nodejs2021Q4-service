import type { FastifyReply } from "fastify";
import type { UserModel } from "../../types/dataModels";
import { HttpStatus } from "../../utils";
import { userRepo } from "../users";

export const checkUserInDB = async (
  login: string,
  res: FastifyReply
): Promise<UserModel | undefined> => {
  const userIsExist = await userRepo.findUserByLogin(login);
  if (!userIsExist)
    res.status(HttpStatus.FORBIDDEN).send("Bad combination user/password");
  return userIsExist;
};
