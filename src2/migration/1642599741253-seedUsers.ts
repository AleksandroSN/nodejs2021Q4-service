/* eslint-disable quotes */
/* eslint-disable class-methods-use-this */
import type { MigrationInterface, QueryRunner } from "typeorm";
import {
  generateHash,
  MIGRATIONS_RUN,
  SEED_LOGIN,
  SEED_NAME,
  SEED_PASSWORD,
} from "../common";
import { User } from "../resources/users/user.model";

export class SeedUsers1642599741253 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const migrationsRunEnv = Boolean(+MIGRATIONS_RUN);
    const hashedPassword = await generateHash(SEED_PASSWORD);
    const isHashedPassword = migrationsRunEnv ? SEED_PASSWORD : hashedPassword;
    await queryRunner.manager.save(
      queryRunner.manager.create<User>(User, {
        name: SEED_NAME,
        login: SEED_LOGIN,
        password: isHashedPassword,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete<User>(User, { name: SEED_NAME });
  }
}
