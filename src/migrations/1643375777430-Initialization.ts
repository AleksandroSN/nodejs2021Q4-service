import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialization1643375777430 implements MigrationInterface {
  name = "Initialization1643375777430";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255), "login" character varying(255), "password" character varying(255), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "Tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "order" integer NOT NULL, "description" character varying(255) NOT NULL, "userId" uuid, "columnId" character varying, "boardId" uuid, CONSTRAINT "PK_f38c2a61ff630a16afca4dac442" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "Boards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255), "columns" text NOT NULL, CONSTRAINT "PK_5be7b56e2c14342b973e2569668" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "Tasks" ADD CONSTRAINT "FK_ca17d7904535e3448bf3634a2ba" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Tasks" ADD CONSTRAINT "FK_ecd45e48ba58dc52caef3c0e5dd" FOREIGN KEY ("boardId") REFERENCES "Boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Tasks" DROP CONSTRAINT "FK_ecd45e48ba58dc52caef3c0e5dd"`
    );
    await queryRunner.query(
      `ALTER TABLE "Tasks" DROP CONSTRAINT "FK_ca17d7904535e3448bf3634a2ba"`
    );
    await queryRunner.query(`DROP TABLE "Boards"`);
    await queryRunner.query(`DROP TABLE "Tasks"`);
    await queryRunner.query(`DROP TABLE "Users"`);
  }
}
