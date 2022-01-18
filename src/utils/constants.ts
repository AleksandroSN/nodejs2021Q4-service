import path from "path";

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

type CommonObject = Record<string, string>;

export const invalidsPort: CommonObject = {
  "80": "80",
  "443": "443",
  "8080": "8080",
};

export const logLevels: CommonObject = {
  "0": "error",
  "1": "warn",
  "2": "info",
  "3": "debug",
  "4": "trace",
};

export const logFile = path.join(__dirname, "../../logs/info.log");
export const errorLogFile = path.join(__dirname, "../../logs/error.log");

export const HOST = "0.0.0.0";

export const SALT_DEFAULT_ROUNDS = 10;
