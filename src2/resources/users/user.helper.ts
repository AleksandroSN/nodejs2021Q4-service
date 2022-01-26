import type { SchemaOptsType, TypeField } from "../../types";

type UserOptsWithPassword = Record<
  "id" | "name" | "login" | "password",
  TypeField
>;

type UserOptsWithoutPassword = Omit<UserOptsWithPassword, "password">;

interface IValidateBody extends SchemaOptsType<UserOptsWithPassword> {
  required: string[];
}

export const userWithPassword: SchemaOptsType<UserOptsWithPassword> = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    login: { type: "string" },
    password: { type: "string" },
  },
};

export const userWithoutPassword: SchemaOptsType<UserOptsWithoutPassword> = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    login: { type: "string" },
  },
};

export const validateBody: IValidateBody = {
  ...userWithPassword,
  required: ["login", "password"],
};
