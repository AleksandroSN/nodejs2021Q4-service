import { FastifyAdapter } from "@nestjs/platform-fastify";
import FastifyFormidable from "fastify-formidable";
// import { Options } from "formidable";
import { PATH_TO_FILES } from "src/utils";

// const formidableOptions: Options = {

// }
export const fastifyAdapter = (): FastifyAdapter => {
  const app = new FastifyAdapter();
  app.register(FastifyFormidable, {
    formidable: {
      maxFileSize: 5e6,
      uploadDir: PATH_TO_FILES,
    },
  });
  console.log("FASTIFY");
  return app;
};
