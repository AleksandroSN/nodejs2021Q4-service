import { FastifyAdapter } from "@nestjs/platform-fastify";
import { contentParser } from "fastify-multer";

export const fastifyAdapter = (): FastifyAdapter => {
  const app = new FastifyAdapter();
  app.register(contentParser);
  console.log("FASTIFY");
  return app;
};
