import type { RouteShorthandOptionsWithHandler } from "fastify";
import { authHandler } from "./auth.service";

export const postAuthOptions: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      201: {
        type: "object",
        properties: {
          login: { type: "string" },
          password: { type: "string" },
        },
      },
    },
  },
  handler: authHandler,
};
