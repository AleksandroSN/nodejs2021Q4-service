/* eslint-disable quotes */
/* eslint-disable class-methods-use-this */
import type { MigrationInterface, QueryRunner } from "typeorm";
import { generateHash } from "../common";
import { User } from "../resources/users/user.model";

export class SeedUsers1642599741253 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashedPassword = await generateHash("admin");
    await queryRunner.manager.save(
      queryRunner.manager.create<User>(User, {
        name: "admin",
        login: "admin",
        password: `${hashedPassword}`,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete<User>(User, { name: "admin" });
  }
}
