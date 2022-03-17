import { ExpressAdapter } from "@nestjs/platform-express";

export const expressAdapter = (): ExpressAdapter => {
  const app = new ExpressAdapter();
  console.log("EXPRESS");
  return app;
};
