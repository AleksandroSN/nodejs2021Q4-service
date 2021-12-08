import type {
  FastifyInstance,
  FastifyServerOptions,
  HookHandlerDoneFunction,
} from "fastify";
import {
  getAllBoardsOpts,
  getBoardOpts,
  putBoardOpts,
  postBoardOpts,
  deleteBoardOpts,
} from "./board.options";

/**
 * middleware routes for boards
 * @param app - Fastify server instance
 * @param _ - Fastify Server options, unuse
 * @param done - callback done function
 * @returns void
 */

export const boardsRouter = (
  app: FastifyInstance,
  _: FastifyServerOptions,
  done: HookHandlerDoneFunction
) => {
  app.get("/boards", getAllBoardsOpts);

  app.get("/boards/:boardId", getBoardOpts);

  app.post("/boards", postBoardOpts);

  app.put("/boards/:boardId", putBoardOpts);

  app.delete("/boards/:boardId", deleteBoardOpts);

  done();
};
