import { DeleteResult, getRepository } from "typeorm";
import type { dataModels } from "../../types";
import { Task } from "./tasks.model";

/**
 * Get all tasks from PGTable Tasks
 * @returns `Promise<dataModels.TaskModel[]>`
 */

const getAllTasks = async (): Promise<dataModels.TaskModel[]> =>
  getRepository(Task).find();

/**
 * Get one task on id from PGTable Tasks
 * @returns `Promise<dataModels.TaskModel>`
 */

const getTask = async (
  id: string
): Promise<dataModels.TaskModel | undefined> => {
  const task = await getRepository(Task).findOne(id);
  return task;
};

/**
 * Add new task to PGTable Tasks
 * @returns `Promise<dataModels.TaskModel>`
 */

const addTask = async (
  body: dataModels.TaskModel,
  boardId: string
): Promise<dataModels.TaskModel> => {
  const taskWithBoardId = { ...body, ...{ boardId } };
  const newTask = await getRepository(Task).save(taskWithBoardId);
  return newTask;
};

/**
 * Update task from PGTable Tasks
 * @returns `Promise<dataModels.TaskModel>`
 */

const updateTask = async (
  id: string,
  body: dataModels.TaskModel
): Promise<dataModels.TaskModel> => {
  const tasksRepository = getRepository(Task);
  const task = await tasksRepository.findOne(id);
  const updatedTask = { ...task, ...body } as dataModels.TaskModel;
  const result = await tasksRepository.save(updatedTask);
  return result;
};

/**
 * Delete task on id from PGTable Tasks
 * @returns `Promise<DeleteResult>`
 */

const deleteTask = async (id: string): Promise<DeleteResult> =>
  getRepository(Task).delete(id);

/**
 * Delete all task if board will be deleted from PGTable Tasks
 * @returns `Promise<void>`
 */

const deleteAllTasksOnBoardId = async (boardId: string): Promise<void> => {
  const tasksRepository = getRepository(Task);
  const tasksWithBoardId = await tasksRepository.find({ boardId });
  await tasksRepository.remove(tasksWithBoardId);
};

/**
 * Modify userId in task if user will be deleted from PGTable Tasks
 * @returns `Promise<void>`
 */

const modifyUserIdInTask = async (userId: string): Promise<void> => {
  const tasksRepository = getRepository(Task);
  const tasksWithBoardId = await tasksRepository.find({ userId });
  const modifyTask = tasksWithBoardId.map((task) => ({
    ...task,
    ...{ userId: null },
  }));
  await tasksRepository.save(modifyTask);
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
