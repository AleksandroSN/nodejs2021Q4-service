import type { FastifyReply, FastifyRequest } from "fastify";
import { HttpStatus, findId } from "../../utils";
import type { dataModels, RequestParams } from "../../types";
import { tasksRepo } from "./tasks.typeorm.repositore";

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
  if (params.taskId) {
    const { taskId } = params;
    const allTasks = await tasksRepo.getAllTasks();
    await findId(allTasks, res, taskId);
  }
};

/**
 * async response from db with all task
 * @param _ - request object , unuse
 * @param res - Fastify response object
 * @returns return all task in db with 200 code
 */

export const getAllTasks = async (_: FastifyRequest, res: FastifyReply) => {
  const result = await tasksRepo.getAllTasks();
  await res.code(HttpStatus.OK).send(result);
};

/**
 * async response from db with task on id
 * @param req - Fastify request object
 * @param res - Fastify response object
 * @returns return task on id with 200 code
 */

export const getTask = async (req: FastifyRequest, res: FastifyReply) => {
  const { taskId } = req.params as RequestParams;
  const result = await tasksRepo.getTask(taskId);

  await res.code(HttpStatus.OK).send(result);
};

/**
 * async response from db with new task
 * @param req - Fastify request object
 * @param res - Fastify response object
 * @returns return new task with 201 code
 */

export const addTask = async (req: FastifyRequest, res: FastifyReply) => {
  const { boardId } = req.params as RequestParams;
  const body = req.body as dataModels.TaskModel;
  const task = await tasksRepo.addTask(body, boardId);

  await res.code(HttpStatus.CREATED).send(task);
};

/**
 * async response from db with updated task
 * @param req - Fastify request object
 * @param res - Fastify response object
 * @returns return updated task with 200 code
 */

export const updateTask = async (req: FastifyRequest, res: FastifyReply) => {
  const { taskId } = req.params as RequestParams;
  const body = req.body as dataModels.TaskModel;
  const taskIdx = await tasksRepo.updateTask(taskId, body);

  await res.code(HttpStatus.OK).send(taskIdx);
};

/**
 * async response from db with void value
 * @param req - Fastify request object
 * @param res - Fastify response object
 * @returns return void with 204 code
 */

export const deleteTask = async (req: FastifyRequest, res: FastifyReply) => {
  const { taskId } = req.params as RequestParams;
  await tasksRepo.deleteTask(taskId);

  res.code(HttpStatus.NO_CONTENT).send();
};

/**
 * async delete all task if board deleted
 * @param req - Fastify request object
 * @param res - Fastify response object
 * @returns return void
 */

export const deleteAllTasks = async (req: FastifyRequest) => {
  const { boardId } = req.params as RequestParams;
  await tasksRepo.deleteAllTasksOnBoardId(boardId);
};

/**
 * async update userId to 'null' if user deleted
 * @param req - Fastify request object
 * @param res - Fastify response object
 * @returns return void
 */

export const resetUser = async (userId: string) => {
  await tasksRepo.modifyUserIdInTask(userId);
};
