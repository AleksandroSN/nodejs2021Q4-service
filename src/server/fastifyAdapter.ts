import { FastifyAdapter } from "@nestjs/platform-fastify";
import FastifyFormidable, {
  FastifyFormidableOptions,
} from "fastify-formidable";
import { formidableConfig } from "../configs";

const formidableOptions: FastifyFormidableOptions = {
  formidable: formidableConfig,
};
export const fastifyAdapter = (): FastifyAdapter => {
  const app = new FastifyAdapter();
  app.register(FastifyFormidable, formidableOptions);
  console.log("FASTIFY");
  return app;
};
