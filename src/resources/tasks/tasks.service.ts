import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { UpdateTaskDTO } from "./dto/update-task.dto";
import { Task } from "./tasks.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async getTask(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async addTask(dto: CreateTaskDTO, boardId: string): Promise<Task> {
    const taskWithBoardId = { ...dto, ...{ boardId } } as Task;
    return this.taskRepository.save(taskWithBoardId);
  }

  async updateTask(id: string, dto: UpdateTaskDTO): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    const updatedTask = { ...task, ...dto } as Task;
    return this.taskRepository.save(updatedTask);
  }

  async deleteTask(id: string): Promise<DeleteResult> {
    return this.taskRepository.delete(id);
  }
}
