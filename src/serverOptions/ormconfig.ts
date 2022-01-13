import type { ConnectionOptions } from "typeorm";
import {
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} from "../common";

export const DBCONFIG: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: ["src/resources/**/*{.js,.ts}"],
  migrations: ["src/migration/**/*{.js,.ts}"],
  subscribers: ["src/subscriber/**/*{.js,.ts}"],
  cli: {
    entitiesDir: "src/resources",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
