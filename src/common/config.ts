import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

const envConfig = [
  "PORT_ENV",
  "NODE_ENV",
  "MONGO_CONNECTION_STRING",
  "JWT_SECRET_KEY",
  "AUTH_MODE",
] as const;

type Env = {
  [key in typeof envConfig[number]]: string;
};

/* eslint-disable no-param-reassign */
const config = envConfig.reduce((envObj, key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error("cannot find key in config object");
  }
  envObj[key] = value;
  return envObj;
}, {} as Env);
/* eslint-enable no-param-reassign */

export const {
  PORT_ENV,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE,
} = config;
