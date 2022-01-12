import "reflect-metadata";
import { createConnection } from "typeorm";
import { app } from "./app";
import { logger } from "./logger";
import { DBCONFIG, PORT } from "./serverOptions";
import { HOST } from "./utils";

logger.portValidation(PORT, app);
logger.debugInfo(app);
/**
 * Start connection to postgresql
 * Start HTTP_SERVER on port from `process.env.PORT` or default port `9999`.
 * Function is async.
 * @returns Promise<void>
 */

createConnection(DBCONFIG)
  .then(async () => {
    process.stdout.write("Success connection to DB \n");
    await app.listen(PORT, HOST);
    process.stdout.write(`START at http://${HOST}:${PORT} \n`);
  })
  .catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
