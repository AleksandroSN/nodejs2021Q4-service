import * as path from "path";

type CommonObject = Record<string, string>;

export const SALT_DEFAULT_ROUNDS = 10;

export const LOG_LEVELS: CommonObject = {
  "0": "error",
  "1": "warn",
  "2": "info",
  "3": "debug",
  "4": "trace",
};

export const PATH_TO_LOG_FILE = path.join(__dirname, "../../logs/info.log");
export const PATH_TO_ERROR_LOG_FILE = path.join(
  __dirname,
  "../../logs/error.log"
);
