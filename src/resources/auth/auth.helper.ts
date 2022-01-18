import type { SchemaOptsType, TypeField } from "../../types";

type NewUserType = Record<"login" | "password", TypeField>;

interface ValidateNewUser extends SchemaOptsType<NewUserType> {
  required: string[];
}

export const resNewUser: SchemaOptsType<NewUserType> = {
  type: "object",
  properties: {
    login: { type: "string" },
    password: { type: "string" },
  },
};

export const validateResNewUser: ValidateNewUser = {
  ...resNewUser,
  required: ["login", "password"],
};
