import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { errorThrower } from "../../exceptions";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { UpdateTaskDTO } from "./dto/update-task.dto";
import { TaskRepository } from "./task.repository";
import { Task } from "./tasks.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAllTasks();
  }

  async getTask(id: string): Promise<Task> {
    const task = await this.taskRepository.findTaskById(id);
    await errorThrower<Task, NotFoundException>(
      task,
      "Task not found",
      NotFoundException
    );
    return task;
  }

  async addTask(dto: CreateTaskDTO, boardId: string): Promise<Task> {
    return this.taskRepository.createTask(dto, boardId);
  }

  async updateTask(id: string, dto: UpdateTaskDTO): Promise<Task> {
    await this.getTask(id);
    return this.taskRepository.updateTask(id, dto);
  }

  async deleteTask(id: string): Promise<string> {
    await this.getTask(id);
    const result = await this.taskRepository.deleteTask(id);
    if (result.affected > 0) {
      return `Task with id ${id} is deleted`;
    }
  }
}
