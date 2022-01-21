/* eslint-disable quotes */
/* eslint-disable class-methods-use-this */
import type { MigrationInterface, QueryRunner } from "typeorm";
import { SEED_LOGIN, SEED_NAME, SEED_PASSWORD } from "../common";
import { User } from "../resources/users/user.model";

export class SeedUsers1642599741253 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(
      queryRunner.manager.create<User>(User, {
        name: SEED_NAME,
        login: SEED_LOGIN,
        password: SEED_PASSWORD,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete<User>(User, { name: SEED_NAME });
  }
}
