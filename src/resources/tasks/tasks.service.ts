import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
    if (!task) {
      throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async addTask(dto: CreateTaskDTO, boardId: string): Promise<Task> {
    return this.taskRepository.createTask(dto, boardId);
  }

  async updateTask(id: string, dto: UpdateTaskDTO): Promise<Task> {
    const task = await this.taskRepository.findTaskById(id);
    if (!task) {
      throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
    }
    return this.taskRepository.updateTask(id, dto);
  }

  async deleteTask(id: string): Promise<string> {
    const task = await this.taskRepository.findTaskById(id);
    if (!task) {
      throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
    }
    const result = await this.taskRepository.deleteTask(id);
    if (result.affected > 0) {
      return `Task with id ${id} is deleted`;
    }
  }
}
