import "reflect-metadata";
import { createConnection } from "typeorm";
import { v4 as uuid } from "uuid";
import { app } from "./app";
import { logger } from "./logger";
import { User } from "./resources/users/user.model";
import { PORT } from "./serverOptions";
import type { dataModels } from "./types";
// import { HOST } from "./utils";

logger.portValidation(PORT, app);
logger.debugInfo(app);
/**
 * Start HTTP_SERVER on port from `process.env.PORT` or default port `9999`.
 * Function is async.
 * @returns Promise<void>
 */

// const test = new User();

// console.log(test);

createConnection()
  .then(async (connection) => {
    const testData: dataModels.UserModel = {
      id: uuid(),
      login: "TEST",
      name: "VASYA",
      password: "RRREEEWWWEWE",
    };
    const user = new User(testData);
    await connection.manager.save(user);
    console.log("connection!");
  })
  // .then(async () => {
  //   await app.listen(PORT, HOST);
  //   process.stdout.write(`START at http://${HOST}:${PORT} \n`);
  // })
  .catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
