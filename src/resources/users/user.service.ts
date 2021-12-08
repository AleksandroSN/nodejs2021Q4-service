import type { FastifyReply, FastifyRequest } from "fastify";
import type { RequestParams, dataModels } from "../../types";
import { HttpStatus, findId } from "../../utils";
import { userRepo } from "./user.memory.repository";
import { resetUser } from "../tasks";

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
  findId(userRepo.users, res, userId);
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
  const user = await userRepo.addUser(body);

  await res.code(HttpStatus.CREATED).send(user);
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
  findId(userRepo.users, res, userId);

  const updatedUser = await userRepo.updateUser(userId, body);

  await res.code(HttpStatus.OK).send(updatedUser);
};

/**
 * async response from db without
 * @param req - Fastify requset object
 * @param res - Fastify response object
 * @returns return void with 204 code
 */

export const deleteUser = async (req: FastifyRequest, res: FastifyReply) => {
  const { userId } = req.params as RequestParams;
  findId(userRepo.users, res, userId);
  await userRepo.deleteUser(userId);
  await resetUser(userId);

  await res.code(HttpStatus.NO_CONTENT).send();
};
