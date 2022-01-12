export interface UserModel {
  id: string;
  name: string;
  login: string;
  password: string;
}

export interface TaskModel {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

export interface ColumnModel {
  title: string;
  order: number;
}
export interface BoardModel {
  id: string;
  title: string;
  columns: ColumnModel[];
}
