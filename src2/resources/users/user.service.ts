import type { FastifyReply, FastifyRequest } from "fastify";
import type { RequestParams, dataModels } from "../../types";
import { HttpStatus, findId, randomName } from "../../utils";
import { userRepo } from "./user.typeorm.repository";
import { resetUser } from "../tasks";

/**
 * find element in db.
 * {@link findId}
 * @param req - Fastify requset object
 * @param res - Fastify response object
 * @returns Promise<void> or response with 404
 */

export const checkElementInDb = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const params = req.params as RequestParams;
  if (params.userId) {
    const { userId } = params;
    const allUsers = await userRepo.getAllUsers();
    await findId(allUsers, res, userId);
  }
};

/**
 * async response from db with all users
 * @param _ - request object , unuse
 * @param res - Fastify response object
 * @returns return all users in db with 200 code
 */

export const getAllUsers = async (_: FastifyRequest, res: FastifyReply) => {
  const reply = await userRepo.getAllUsers();

  await res.code(HttpStatus.OK).send(reply);
};

/**
 * async response from db with user on id
 * @param req - Fastify requset object
 * @param res - Fastify response object
 * @returns return user on id with 200 code and without password field
 */

export const getUser = async (req: FastifyRequest, res: FastifyReply) => {
  const { userId } = req.params as RequestParams;
  const reply = await userRepo.findUser(userId);

  await res.code(HttpStatus.OK).send(reply);
};

/**
 * async response from db with new user
 * @param req - Fastify requset object
 * @param res - Fastify response object
 * @returns return new user with req.body data and 201 code
 */

export const addUser = async (req: FastifyRequest, res: FastifyReply) => {
  const body = req.body as dataModels.UserModel;
  const userName = randomName(body.name);
  const userWithName = {
    ...body,
    ...{ name: userName },
  };
  const newUser = await userRepo.addUser(userWithName);

  await res.code(HttpStatus.CREATED).send(newUser);
};

/**
 * async response from db with updated user
 * @param req - Fastify requset object
 * @param res - Fastify response object
 * @returns return updated user with 200 code
 */

export const updateUser = async (req: FastifyRequest, res: FastifyReply) => {
  const { userId } = req.params as RequestParams;
  const body = req.body as dataModels.UserModel;
  const updatedUser = await userRepo.updateUser(userId, body);

  await res.code(HttpStatus.OK).send(updatedUser);
};

/**
 * async response to db. Delete user on id and set id to null in tasks repo
 * @param req - Fastify requset object
 * @param res - Fastify response object
 * @returns return `void` with 204 code
 */

export const deleteUser = async (req: FastifyRequest, res: FastifyReply) => {
  const { userId } = req.params as RequestParams;
  await userRepo.deleteUser(userId);
  await resetUser(userId);

  await res.code(HttpStatus.NO_CONTENT).send();
};
