import type { TypeString } from "../../types";

type UserOptsWithPassword = {
  id: TypeString;
  name: TypeString;
  login: TypeString;
  password: TypeString;
};

type UserOptsWithoutPassword = Omit<UserOptsWithPassword, "password">;

interface IUserWithPassword {
  type: string;
  properties: UserOptsWithPassword;
}

interface IUserWithoutPassword {
  type: string;
  properties: UserOptsWithoutPassword;
}

interface IValidateBody extends IUserWithPassword {
  required: string[];
}

export const userWithPassword: IUserWithPassword = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    login: { type: "string" },
    password: { type: "string" },
  },
};

export const userWithoutPassword: IUserWithoutPassword = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    login: { type: "string" },
  },
};

export const validateBody: IValidateBody = {
  ...userWithPassword,
  required: ["name", "password"],
};
