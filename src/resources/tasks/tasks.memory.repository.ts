import type { dataModels } from "../../types";
import { Task } from "./tasks.model";

interface TaskRepoModel {
  tasks: dataModels.TaskModel[];
  getAllTasks(): void;
  getTask(taskId: string): Promise<dataModels.TaskModel | undefined>;
  addTask(
    body: dataModels.TaskModel,
    boardId: string
  ): Promise<dataModels.TaskModel>;
  updateTask(
    taskId: string,
    body: dataModels.TaskModel
  ): Promise<dataModels.TaskModel>;
  deleteTask(taskId: string): Promise<void>;
  deleteTasksOnId(boardId: string): Promise<void>;
  modifyUserDataInTask(userId: string): Promise<void>;
}

/**
 * class for work with tasks array (InMemoryDB)
 * @returns instance class `TaskRepo` with empty tasks arr
 */
class TaskRepo implements TaskRepoModel {
  tasks: dataModels.TaskModel[];

  constructor() {
    this.tasks = [];
  }

  /**
   * Get all tasks from array
   * @returns `Promise<dataModels.TaskModel[]>`
   */

  async getAllTasks() {
    return Promise.resolve(this.tasks);
  }

  /**
   * Add new task into array
   * @returns `Promise<User>`
   */

  async getTask(taskId: string) {
    const result = this.tasks.find((task) => task.id === taskId);
    return Promise.resolve(result);
  }

  /**
   * Get task on id from array
   * @returns `Promise<dataModels.TaskModel>` or `undefined`
   */

  async addTask(body: dataModels.TaskModel, boardId: string) {
    const newTask = new Task(body);
    const modTask = { ...newTask, ...{ boardId } };
    this.tasks.push(modTask);
    return Promise.resolve(modTask);
  }

  /**
   * Update task on id from array
   * @returns `Promise<dataModels.TaskModel>`
   */

  async updateTask(taskId: string, body: dataModels.TaskModel) {
    const taskIdx = this.tasks.findIndex((task) => task.id === taskId);
    const updatedTask = {
      ...this.tasks[taskIdx],
      ...body,
    } as dataModels.TaskModel;
    this.tasks.splice(taskIdx, 1, updatedTask);
    return Promise.resolve(updatedTask);
  }

  /**
   * Delete task on id from array
   * @returns `Promise<void>`
   */

  async deleteTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    return Promise.resolve();
  }

  /**
   * If board will be deleted all tasks on boardId will be deleted.
   * @returns `Promise<void>`
   */

  async deleteTasksOnId(boardId: string) {
    this.tasks = this.tasks.filter((task) => task.boardId !== boardId);
    return Promise.resolve();
  }

  /**
   * If User will be deleted all tasks on userId will be updated to `null`.
   * @returns `Promise<void>`
   */

  async modifyUserDataInTask(userId: string) {
    this.tasks = this.tasks.map((task) =>
      task.userId === userId ? { ...task, ...{ userId: null } } : task
    );
    return Promise.resolve();
  }
}

export const tasksRepo = new TaskRepo();
