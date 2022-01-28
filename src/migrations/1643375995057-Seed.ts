import * as dotenv from "dotenv";
import * as path from "path";
import { generateHash } from "../common";

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});
import { MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../resources/users/users.entity";

export class Seed1643375853319 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const migrationsRunEnv = process.env.TYPEORM_MIGRATIONS_RUN === "true";
    const hashedPassword = await generateHash(process.env.SEED_PASSWORD);
    const isHashedPassword = migrationsRunEnv
      ? process.env.SEED_PASSWORD
      : hashedPassword;
    await queryRunner.manager.save(
      queryRunner.manager.create<User>(User, {
        name: process.env.SEED_NAME,
        login: process.env.SEED_LOGIN,
        password: isHashedPassword,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete<User>(User, {
      name: process.env.SEED_NAME,
    });
  }
}
