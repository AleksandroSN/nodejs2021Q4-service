import type { RouteShorthandOptionsWithHandler } from "fastify";
import { resNewUser, validateResNewUser } from "./auth.helper";
import { authHandler } from "./auth.service";

// TO-DO change to type string
export const postAuthOptions: RouteShorthandOptionsWithHandler = {
  schema: {
    body: validateResNewUser,
    response: {
      201: resNewUser,
    },
  },
  handler: authHandler,
};
