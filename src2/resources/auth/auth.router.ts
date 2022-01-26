import type { FastifyInstance } from "fastify";
import { postAuthOptions } from "./auth.options";

export const authRouter = async (app: FastifyInstance): Promise<void> => {
  app.post("/login", postAuthOptions);
};
