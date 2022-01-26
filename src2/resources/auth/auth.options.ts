import type { RouteShorthandOptionsWithHandler } from "fastify";
import { resNewToken } from "./auth.helper";
import { authHandler } from "./auth.service";

export const postAuthOptions: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: resNewToken,
    },
  },
  handler: authHandler,
};
