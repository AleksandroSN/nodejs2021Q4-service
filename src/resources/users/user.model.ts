import { v4 as uuid } from "uuid";
import type { dataModels } from "../../types";

/**
 * create User with params.
 * If params undefined constructor use default params
 * @param id - unique id
 * @param name - user name
 * @param login - user login
 * @param password - user password
 * @returns new instance User
 */

export class User implements dataModels.UserModel {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor({
    id = uuid(),
    name = "USER",
    login = "user",
    password = "P@55w0rd",
  }: dataModels.UserModel) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }
}
