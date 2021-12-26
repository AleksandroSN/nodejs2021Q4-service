import type { FastifyServerOptions } from "fastify";
import { logFile, errorLogFile, logLevels } from "../utils";
import { PORT as PORT_ENV, LOG_LEVEL } from "../common";
import { logger } from "../logger";

export const PORT: string = PORT_ENV || "9999";
const level = logLevels[LOG_LEVEL] || "silent";

export const serverOptions: FastifyServerOptions = {
  logger: logger.getPinoConfig(level, logFile, errorLogFile),
};
