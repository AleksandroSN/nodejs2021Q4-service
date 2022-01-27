import { Injectable } from "@nestjs/common";
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
    return this.taskRepository.findOne(id);
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

  async deleteAllTasksOnBoardId(boardId: string): Promise<void> {
    const tasksWithBoardId = await this.taskRepository.find({ boardId });
    await this.taskRepository.remove(tasksWithBoardId);
  }

  async modifyUserIdInTask(userId: string): Promise<void> {
    const tasksWithBoardId = await this.taskRepository.find({ userId });
    const modifyTask = tasksWithBoardId.map((task) => ({
      ...task,
      ...{ userId: null },
    })) as Task[];
    await this.taskRepository.save(modifyTask);
  }
}
