import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

export default {
  type: "postgres",
  host: process.env.TYPEORM_HOST || "localhost",
  port: Number(process.env.TYPEORM_PORT) || 5432,
  username: process.env.TYPEORM_USERNAME || "root",
  password: process.env.TYPEORM_PASSWORD || "root",
  database: process.env.TYPEORM_DATABASE || "root",
  synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === "true",
  dropSchema: process.env.TYPEORM_DROP_SCHEMA === "true",
  entities: [process.env.TYPEORM_ENTITIES_DIR],
  migrations: [process.env.TYPEORM_MIGRATIONS_DIR],
  cli: {
    entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
  },
};
