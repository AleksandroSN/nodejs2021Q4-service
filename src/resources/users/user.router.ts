import type {
  FastifyInstance,
  FastifyServerOptions,
  HookHandlerDoneFunction,
} from "fastify";
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
 * @param _ - Fastify Server options, unuse
 * @param done - callback done function
 * @returns void
 */

export const usersRoute = (
  app: FastifyInstance,
  _: FastifyServerOptions,
  done: HookHandlerDoneFunction
) => {
  app.get("/users", getAllUsersOpts);

  app.get("/users/:userId", getUserOpts);

  app.post("/users", postOpts);

  app.put("/users/:userId", putOpts);

  app.delete("/users/:userId", deleteOpts);

  done();
};
