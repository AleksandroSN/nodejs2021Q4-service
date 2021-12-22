import path from "path";

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

type LogLevelsModel = Record<string, string>;

export const logLevels: LogLevelsModel = {
  "0": "error",
  "1": "warn",
  "2": "info",
  "3": "debug",
  "4": "trace",
};

export const logFile = path.join(__dirname, "../../log.txt");
export const errorLogFile = path.join(__dirname, "../../errorLog.txt");
