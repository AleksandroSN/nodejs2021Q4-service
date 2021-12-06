import { v4 as uuid } from "uuid";
import type { dataModels } from "../../types";

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
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }
}
