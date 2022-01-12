import "reflect-metadata";
import { app } from "./app";
import { logger } from "./logger";
import { PORT } from "./serverOptions";
import { HOST } from "./utils";

logger.portValidation(PORT, app);
logger.debugInfo(app);
/**
 * Start HTTP_SERVER on port from `process.env.PORT` or default port `9999`.
 * Function is async.
 * @returns Promise<void>
 */

const start = async () => {
  try {
    await app.listen(PORT, HOST);
    process.stdout.write(`START at http://${HOST}:${PORT} \n`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
