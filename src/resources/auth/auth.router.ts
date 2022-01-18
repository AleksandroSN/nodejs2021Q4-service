import type {
  FastifyInstance,
  FastifyServerOptions,
  HookHandlerDoneFunction,
} from "fastify";
import { postAuthOptions } from "./auth.options";

export const authRouter = (
  app: FastifyInstance,
  _: FastifyServerOptions,
  done: HookHandlerDoneFunction
) => {
  app.post("/login", postAuthOptions);

  done();
};
