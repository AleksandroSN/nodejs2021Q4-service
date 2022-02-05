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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { JwtGuard } from "../auth/jwt-guard";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { UpdateTaskDTO } from "./dto/update-task.dto";
import { Task } from "./tasks.entity";
import { TasksService } from "./tasks.service";

@Controller("boards/:boardId/tasks")
@ApiTags("Tasks")
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  @ApiOperation({ summary: "Get All Tasks" })
  @ApiParam({ name: "boardId", description: "string in UUID format" })
  @ApiResponse({ status: 200, type: [Task] })
  findAll(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get(":taskId")
  @ApiOperation({ summary: "Get one Task" })
  @ApiParam({ name: "boardId", description: "string in UUID format" })
  @ApiParam({ name: "taskId", description: "string in UUID format" })
  @ApiResponse({ status: 200, type: Task })
  findOne(@Param("taskId", ParseUUIDPipe) taskId: string): Promise<Task> {
    return this.taskService.getTask(taskId);
  }

  @Post()
  @ApiOperation({ summary: "Add new Task" })
  @ApiParam({ name: "boardId", description: "string in UUID format" })
  @ApiResponse({ status: 201, type: Task })
  @ApiBody({ type: Task })
  addOne(
    @Body() dto: CreateTaskDTO,
    @Param("boardId", ParseUUIDPipe) boardId: string
  ): Promise<Task> {
    return this.taskService.addTask(dto, boardId);
  }

  @Put(":taskId")
  @ApiOperation({ summary: "Update one Task" })
  @ApiParam({ name: "boardId", description: "string in UUID format" })
  @ApiParam({ name: "taskId", description: "string in UUID format" })
  @ApiBody({ type: Task })
  @ApiResponse({ status: 200, type: Task })
  updateOne(
    @Body() dto: UpdateTaskDTO,
    @Param("taskId", ParseUUIDPipe) taskId: string
  ): Promise<Task> {
    return this.taskService.updateTask(taskId, dto);
  }

  @Delete(":taskId")
  @ApiOperation({ summary: "Delete one Task" })
  @ApiParam({ name: "boardId", description: "string in UUID format" })
  @ApiParam({ name: "taskId", description: "string in UUID format" })
  @ApiResponse({
    status: 200,
    type: "Task with id 5e5f848d-48b5-49ee-9fd3-933ea34bba3b is deleted",
    description: "Response with next text: Task with id UUID is deleted",
  })
  deleteOne(@Param("taskId", ParseUUIDPipe) taskId: string): Promise<string> {
    return this.taskService.deleteTask(taskId);
  }
}
