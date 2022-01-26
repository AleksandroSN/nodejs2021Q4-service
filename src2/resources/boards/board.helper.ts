import type { SchemaOptsType, TypeField } from "../../types";

type ColumnOpts = Record<"id" | "title" | "order", TypeField>;

type ColumnsOpts = {
  type: string;
  items: SchemaOptsType<ColumnOpts>;
};

type BoardOpts = Omit<ColumnOpts, "order">;
interface BoardOptsFull extends BoardOpts {
  columns: ColumnsOpts;
}

interface IValidateBody extends SchemaOptsType<BoardOptsFull> {
  required: string[];
}

export const column: SchemaOptsType<ColumnOpts> = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    order: { type: "integer" },
  },
};

export const columns: ColumnsOpts = {
  type: "array",
  items: column,
};

export const board: SchemaOptsType<BoardOptsFull> = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    columns,
  },
};

export const validateBody: IValidateBody = {
  type: "object",
  required: ["title"],
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    columns,
  },
};
