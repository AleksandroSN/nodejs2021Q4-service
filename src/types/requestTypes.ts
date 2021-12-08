export interface RequestParams {
  userId: string;
  taskId: string;
  boardId: string;
  "*": string | undefined;
}
