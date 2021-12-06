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
  userId: string;
  boardId: string;
  columnId: string;
}

export interface BoardModel {
  id: string;
  title: string;
  columns: string[];
}
