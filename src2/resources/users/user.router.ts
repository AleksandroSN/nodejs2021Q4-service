import type { FastifyInstance } from "fastify";
import {
  getAllUsersOpts,
  getUserOpts,
  postOpts,
  putOpts,
  deleteOpts,
} from "./user.options";

/**
 * middleware routes for users
 * @param app - Fastify server instance
 * @returns void
 */

export const usersRoute = async (app: FastifyInstance): Promise<void> => {
  app.get("/users", getAllUsersOpts);

  app.get("/users/:userId", getUserOpts);

  app.post("/users", postOpts);

  app.put("/users/:userId", putOpts);

  app.delete("/users/:userId", deleteOpts);
};
