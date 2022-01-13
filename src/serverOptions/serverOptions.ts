import type { FastifyServerOptions } from "fastify";
import type { ConnectionOptions } from "typeorm";
import { logFile, errorLogFile, logLevels } from "../utils";
import {
  PORT as PORT_ENV,
  LOG_LEVEL,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} from "../common";
import { logger } from "../logger";

export const PORT: string = PORT_ENV || "9999";
const level = logLevels[LOG_LEVEL] || "silent";

export const serverOptions: FastifyServerOptions = {
  logger: logger.getPinoConfig(level, logFile, errorLogFile),
};

export const DBCONFIG: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: ["src/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/**/*.ts"],
};
