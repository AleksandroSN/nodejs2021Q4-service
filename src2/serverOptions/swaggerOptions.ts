import type { SwaggerOptions } from "fastify-swagger";
import { PORT } from "./serverOptions";
import { HOST } from "../utils";

export const swaggerOptions: SwaggerOptions = {
  exposeRoute: true,
  routePrefix: "/docs",
  openapi: {
    info: {
      title: "Trello Service",
      description: "Let's try to create a competitor for Trello!",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://${HOST}:${PORT}`,
      },
    ],
  },
};
