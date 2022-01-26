export type TypeField = { type: string | string[] };

export type SchemaOptsType<Prop> = {
  type: string;
  properties: Prop;
};
