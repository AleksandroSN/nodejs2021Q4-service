import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { UpdateTaskDTO } from "./dto/update-task.dto";
import { Task } from "./tasks.entity";
import { TasksService } from "./tasks.service";

@Controller("boards/:boardId/tasks")
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get(":taskId")
  findOne(@Param("taskId") taskId: string): Promise<Task> {
    return this.taskService.getTask(taskId);
  }

  @Post()
  addOne(
    @Body() dto: CreateTaskDTO,
    @Param("boardId") boardId: string
  ): Promise<Task> {
    return this.taskService.addTask(dto, boardId);
  }

  @Put(":taskId")
  updateOne(
    @Body() dto: UpdateTaskDTO,
    @Param("taskId") taskId: string
  ): Promise<Task> {
    return this.taskService.updateTask(taskId, dto);
  }

  @Delete(":taskId")
  deleteOne(@Param("taskId") taskId: string): Promise<string> {
    return this.taskService.deleteTask(taskId);
  }
}
