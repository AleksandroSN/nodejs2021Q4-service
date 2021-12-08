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
 * @param tasks - array boards
 * @returns empty tasks arr
 */
class TaskRepo implements TaskRepoModel {
  tasks: dataModels.TaskModel[];

  constructor() {
    this.tasks = [];
  }

  async getAllTasks() {
    return Promise.resolve(this.tasks);
  }

  async getTask(taskId: string) {
    const result = this.tasks.find((task) => task.id === taskId);
    return Promise.resolve(result);
  }

  async addTask(body: dataModels.TaskModel, boardId: string) {
    const newTask = new Task(body);
    const modTask = { ...newTask, ...{ boardId } };
    this.tasks.push(modTask);
    return Promise.resolve(modTask);
  }

  async updateTask(taskId: string, body: dataModels.TaskModel) {
    const taskIdx = this.tasks.findIndex((task) => task.id === taskId);
    const updatedTask = {
      ...this.tasks[taskIdx],
      ...body,
    } as dataModels.TaskModel;
    this.tasks.splice(taskIdx, 1, updatedTask);
    return Promise.resolve(updatedTask);
  }

  async deleteTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    return Promise.resolve();
  }

  async deleteTasksOnId(boardId: string) {
    this.tasks = this.tasks.filter((task) => task.boardId !== boardId);
    return Promise.resolve();
  }

  async modifyUserDataInTask(userId: string) {
    this.tasks = this.tasks.map((task) =>
      task.userId === userId ? { ...task, ...{ userId: null } } : task
    );
    return Promise.resolve();
  }
}

export const tasksRepo = new TaskRepo();
