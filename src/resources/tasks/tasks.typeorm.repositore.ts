import { getRepository } from "typeorm";
import type { dataModels } from "../../types";
import { Task } from "./tasks.model";

const getAllTasks = async (): Promise<dataModels.TaskModel[]> =>
  getRepository(Task).find();

const getTask = async (
  id: string
): Promise<dataModels.TaskModel | undefined> => {
  const task = await getRepository(Task).findOne(id);
  return task;
};

const addTask = async (
  body: dataModels.TaskModel,
  boardId: string
): Promise<dataModels.TaskModel> => {
  const taskWithBoardId = { ...body, ...{ boardId } };
  const newTask = await getRepository(Task).save(taskWithBoardId);
  return newTask;
};

const updateTask = async (
  id: string,
  body: dataModels.TaskModel
): Promise<dataModels.TaskModel> => {
  const task = await getRepository(Task).findOne(id);
  const updatedTask = { ...task, ...body } as dataModels.TaskModel;
  const result = await getRepository(Task).save(updatedTask);
  return result;
};

const deleteTask = async (id: string) => getRepository(Task).delete(id);

const deleteAllTasksOnBoardId = async (boardId: string) => {
  const tasksWithBoardId = await getRepository(Task).find({ boardId });
  await getRepository(Task).remove(tasksWithBoardId);
};

const modifyUserIdInTask = async (userId: string) => {
  const tasksWithBoardId = await getRepository(Task).find({ userId });
  const modifyTask = tasksWithBoardId.map((task) => ({
    ...task,
    ...{ userId: null },
  }));
  await getRepository(Task).save(modifyTask);
};

export const tasksRepo = {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
  deleteAllTasksOnBoardId,
  modifyUserIdInTask,
};
