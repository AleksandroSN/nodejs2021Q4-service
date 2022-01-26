import type { SchemaOptsType, TypeField } from "../../types";

type NewTokenType = Record<"token", TypeField>;

export const resNewToken: SchemaOptsType<NewTokenType> = {
  type: "object",
  properties: {
    token: { type: "string" },
  },
};
