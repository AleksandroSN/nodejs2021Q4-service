import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { generateHash } from "../../common";
import { Task } from "../tasks/tasks.entity";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Entity User for TypeORM.
 * If params undefined constructor use default params
 * @returns new Entity<User>
 */

@Entity({ name: "Users" })
export class User {
  @ApiProperty({
    example: "e6b552cf-64ae-4d6e-a28e-bdfd8446ea58",
    description: "string in UUID format",
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({
    example: "Derow",
    description: "Something name",
  })
  @Column({ type: "varchar", length: 255, nullable: true })
  name: string;

  @ApiProperty({
    example: "Derow777",
    description: "Something login",
  })
  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  login: string;

  @ApiProperty({
    example: "P@ssW0Rd",
    description: "Something password",
  })
  @Column({ type: "varchar", length: 255, nullable: true })
  @Exclude()
  password: string;

  @OneToMany(() => Task, (task) => task.userId)
  task: Task | undefined;

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
