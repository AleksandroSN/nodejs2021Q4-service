import { registerAs } from "@nestjs/config";
import type { AppConfig } from "./config.inteface";

export default registerAs(
  "appConfig",
  (): AppConfig => ({
    PORT: process.env["PORT"] || 3000,
    BASE_HOST: process.env["BASE_HOST"],
    USE_FASTIFY: process.env["USE_FASTIFY"],
  })
);
