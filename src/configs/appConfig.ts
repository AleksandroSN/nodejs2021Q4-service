import { registerAs } from "@nestjs/config";
import type { AppConfig } from "./config.inteface";

export default registerAs(
  "appConfig",
  (): AppConfig => ({
    PORT: process.env.PORT || 3000,
    BASE_HOST: process.env.BASE_HOST || "localhost",
    USE_FASTIFY: process.env.USE_FASTIFY || "false",
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "SECRET",
    LOG_LEVEL: process.env.LOG_LEVEL || "0",
  })
);
