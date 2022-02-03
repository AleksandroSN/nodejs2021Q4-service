import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { JwtGuard } from "../auth/jwt-guard";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { UpdateTaskDTO } from "./dto/update-task.dto";
import { Task } from "./tasks.entity";
import { TasksService } from "./tasks.service";

@Controller("boards/:boardId/tasks")
@UseGuards(JwtGuard)
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get(":taskId")
  findOne(@Param("taskId", ParseUUIDPipe) taskId: string): Promise<Task> {
    return this.taskService.getTask(taskId);
  }

  @Post()
  addOne(
    @Body() dto: CreateTaskDTO,
    @Param("boardId", ParseUUIDPipe) boardId: string
  ): Promise<Task> {
    return this.taskService.addTask(dto, boardId);
  }

  @Put(":taskId")
  updateOne(
    @Body() dto: UpdateTaskDTO,
    @Param("taskId", ParseUUIDPipe) taskId: string
  ): Promise<Task> {
    return this.taskService.updateTask(taskId, dto);
  }

  @Delete(":taskId")
  deleteOne(@Param("taskId", ParseUUIDPipe) taskId: string): Promise<string> {
    return this.taskService.deleteTask(taskId);
  }
}
