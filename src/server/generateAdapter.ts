import { ExpressAdapter } from "@nestjs/platform-express";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { expressAdapter } from "./expressAdapter";
import { fastifyAdapter } from "./fastifyAdapter";

export const generateAdapter = (): ExpressAdapter | FastifyAdapter => {
  const isFastify = process.env.USE_FASTIFY;
  if (isFastify === "true") {
    return fastifyAdapter();
  }
  return expressAdapter();
};
