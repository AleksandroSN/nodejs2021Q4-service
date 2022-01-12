import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import type { dataModels } from "../../types";

/**
 * create User with params.
 * If params undefined constructor use default params
 * @returns new instance User
 */

@Entity({ name: "Users" })
export class User implements dataModels.UserModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  /**
   * constructor recieve object and destructure him
   * for add default value
   * object have next keys :
   * @param id - unique id in uuid format. Type string.
   * @param name - user name. Type string.
   * @defaultValue param user "USER"
   * @param login - user login. Type string.
   * @defaultValue param login "user"
   * @param password - user password. Type string.
   * @defaultValue param password "P\@55w0rd"
   */

  constructor(
    {
      id = uuid(),
      name = "USER",
      login = "user",
      password = "P@55w0rd",
    } = {} as dataModels.UserModel
  ) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }
}
