import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "../tasks/tasks.entity";
import { Board } from "./boards.entity";
import { CreateBoardDTO } from "./dto/create-board.dto";
import { UpdateBoardDTO } from "./dto/update-board.dto";

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardsRepository: Repository<Board>,
    @InjectRepository(Task) private taskRepository: Repository<Task>
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardsRepository.find();
  }

  async findBoard(id: string): Promise<Board> {
    const board = await this.boardsRepository.findOne(id);
    if (!board) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return board;
  }

  async addBoard(dto: CreateBoardDTO): Promise<Board> {
    return this.boardsRepository.save(dto);
  }

  async updateBoard(id: string, dto: UpdateBoardDTO) {
    const oldBoard = await this.boardsRepository.findOne(id);
    const updatedBoard = { ...oldBoard, ...dto } as Board;
    return this.boardsRepository.save(updatedBoard);
  }

  async deleteBoard(id: string): Promise<void> {
    const tasksWithBoardId = await this.taskRepository.find({
      where: { boardId: id },
    });
    await this.taskRepository.remove(tasksWithBoardId);
    await this.boardsRepository.delete(id);
  }
}
