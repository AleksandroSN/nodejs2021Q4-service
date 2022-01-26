import type { ConnectionOptions } from "typeorm";
import {
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
  MIGRATIONS_RUN,
} from "../common";

const DBCONFIG: ConnectionOptions = {
  type: "postgres",
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: false,
  logging: false,
  migrationsRun: Boolean(+MIGRATIONS_RUN),
  dropSchema: false,
  entities: ["src/resources/**/*{.js,.ts}"],
  migrations: ["src/migration/**/*{.js,.ts}"],
  subscribers: ["src/resources/**/*{.js,.ts}"],
  cli: {
    entitiesDir: "src/resources",
    migrationsDir: "src/migration",
    subscribersDir: "src/resources",
  },
};

export default DBCONFIG;
