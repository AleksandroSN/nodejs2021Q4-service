import type {
  FastifyInstance,
  FastifyServerOptions,
  HookHandlerDoneFunction,
} from "fastify";
import {
  getAllTasksOpts,
  getTaskOpts,
  putOpts,
  postOpts,
  deleteOpts,
} from "./tasks.options";

/**
 * middleware routes for tasks
 * @param app - Fastify server instance
 * @param _ - Fastify Server options, unuse
 * @param done - callback done function
 * @returns void
 */

export const tasksRouter = (
  app: FastifyInstance,
  _: FastifyServerOptions,
  done: HookHandlerDoneFunction
) => {
  app.get("/boards/:boardId/tasks", getAllTasksOpts);

  app.get("/boards/:boardId/tasks/:taskId", getTaskOpts);

  app.post("/boards/:boardId/tasks", postOpts);

  app.put("/boards/:boardId/tasks/:taskId", putOpts);

  app.delete("/boards/:boardId/tasks/:taskId", deleteOpts);

  done();
};
