import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { generateHash } from "src/common";

/**
 * Entity User for TypeORM.
 * If params undefined constructor use default params
 * @returns new Entity<User>
 */

@Entity({ name: "Users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  login: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  @Exclude()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await generateHash(this.password);
  }

  @BeforeUpdate()
  async updateHashedPassword() {
    this.password = await generateHash(this.password);
  }

  /**
   * constructor recieve object and destructure him
   * @return Object of User without password
   */

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
