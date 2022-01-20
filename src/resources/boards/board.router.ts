import type { FastifyInstance } from "fastify";
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
 * @returns void
 */

export const boardsRouter = async (app: FastifyInstance): Promise<void> => {
  app.get("/boards", getAllBoardsOpts);

  app.get("/boards/:boardId", getBoardOpts);

  app.post("/boards", postBoardOpts);

  app.put("/boards/:boardId", putBoardOpts);

  app.delete("/boards/:boardId", deleteBoardOpts);
};
