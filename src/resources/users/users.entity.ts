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
