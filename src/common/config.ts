import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

const envConfig = [
  "PORT",
  "NODE_ENV",
  "JWT_SECRET_KEY",
  "AUTH_MODE",
  "LOG_LEVEL",
  "POSTGRES_PORT",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "POSTGRES_DB",
  "POSTGRES_HOST",
  "SEED_LOGIN",
  "SEED_NAME",
  "SEED_PASSWORD",
  "MIGRATIONS_RUN",
] as const;

type Env = Record<typeof envConfig[number], string>;

/**
 * Collect all keys from `process.env`.
 * Return {@link Env}
 * @returns new object with type Env.
 * If key from arr is unvalid throw Error.
 * @throws {@link Error}
 */

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
  PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
  AUTH_MODE,
  LOG_LEVEL,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_HOST,
  SEED_LOGIN,
  SEED_NAME,
  SEED_PASSWORD,
  MIGRATIONS_RUN,
} = config;
