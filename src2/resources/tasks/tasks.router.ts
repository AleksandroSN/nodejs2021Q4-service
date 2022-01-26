import type { FastifyInstance } from "fastify";
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
 * @returns void
 */

export const tasksRouter = async (app: FastifyInstance): Promise<void> => {
  app.get("/boards/:boardId/tasks", getAllTasksOpts);

  app.get("/boards/:boardId/tasks/:taskId", getTaskOpts);

  app.post("/boards/:boardId/tasks", postOpts);

  app.put("/boards/:boardId/tasks/:taskId", putOpts);

  app.delete("/boards/:boardId/tasks/:taskId", deleteOpts);
};
