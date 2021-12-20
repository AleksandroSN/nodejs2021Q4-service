import type { SchemaOptsType, TypeField } from "../../types";

type TaskOpts = Record<
  "id" | "title" | "order" | "description" | "userId" | "boardId" | "columnId",
  TypeField
>;

export const task: SchemaOptsType<TaskOpts> = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    order: { type: "integer" },
    description: { type: "string" },
    userId: { type: ["string", "null"] },
    boardId: { type: ["string", "null"] },
    columnId: { type: ["string", "null"] },
  },
};
