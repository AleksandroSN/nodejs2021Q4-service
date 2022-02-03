import * as fs from "fs";
import { PATH_TO_ERROR_LOG_FILE } from "../utils";

export const logUncaughtException = () => {
  process.on("uncaughtException", (err) => {
    process.stdout.write("Error, saved in file errorLog.log \n");
    process.stdout.write(`${err} \n`);
    fs.writeFileSync(PATH_TO_ERROR_LOG_FILE, err.message, {
      flag: "a",
    });
    process.exit(1);
  });
};

export const logUnhandledRejection = () => {
  process.on("unhandledRejection", (err: Error) => {
    process.stdout.write("Error, saved in file errorLog.log \n");
    process.stdout.write(`${err} \n`);
    fs.writeFileSync(PATH_TO_ERROR_LOG_FILE, err.message, {
      flag: "a",
    });
    process.exit(1);
  });
};
