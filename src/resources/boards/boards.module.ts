import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { TaskRepository } from "../tasks/task.repository";
import { BoardRepository } from "./board.repository";
import { BoardsController } from "./boards.controller";
import { Board } from "./boards.entity";
import { BoardsService } from "./boards.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, BoardRepository, TaskRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
