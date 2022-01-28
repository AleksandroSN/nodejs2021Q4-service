import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { TaskRepository } from "./task.repository";
import { TasksController } from "./tasks.controller";
import { Task } from "./tasks.entity";
import { TasksService } from "./tasks.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
