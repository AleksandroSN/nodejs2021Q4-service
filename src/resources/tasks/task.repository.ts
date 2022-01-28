import { DeleteResult, EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { UpdateTaskDTO } from "./dto/update-task.dto";
import { Task } from "./tasks.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async findAllTasks(): Promise<Task[]> {
    return await this.find();
  }

  async findTaskById(id: string): Promise<Task> {
    return await this.findOne(id);
  }

  async createTask(dto: CreateTaskDTO, boardId: string): Promise<Task> {
    const taskWithBoardId = { ...dto, ...{ boardId } } as Task;
    return await this.save(taskWithBoardId);
  }

  async updateTask(id: string, dto: UpdateTaskDTO): Promise<Task> {
    const task = await this.findOne(id);
    const updatedTask = { ...task, ...dto } as Task;
    return await this.save(updatedTask);
  }

  async deleteTask(id: string): Promise<DeleteResult> {
    return await this.delete(id);
  }

  async deleteAllTask(boardId: string): Promise<Task[]> {
    const tasksWithBoardId = await this.find({ boardId });
    return this.remove(tasksWithBoardId);
  }

  async updateUsersIds(userId: string): Promise<void> {
    const tasksWithUserId = await this.find({ userId });
    const modifyTask = tasksWithUserId.map((task) => ({
      ...task,
      ...{ userId: null },
    })) as Task[];
    await this.save(modifyTask);
  }
}
