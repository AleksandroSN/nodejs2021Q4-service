import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskRepository } from "../tasks/task.repository";
import { BoardRepository } from "./board.repository";
import { Board } from "./boards.entity";
import { CreateBoardDTO } from "./dto/create-board.dto";
import { UpdateBoardDTO } from "./dto/update-board.dto";

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private readonly boardsRepository: BoardRepository,
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardsRepository.findAllBoards();
  }

  async findBoard(id: string): Promise<Board> {
    const board = await this.boardsRepository.findBoardById(id);
    if (!board) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return board;
  }

  async addBoard(dto: CreateBoardDTO): Promise<Board> {
    return this.boardsRepository.createBoard(dto);
  }

  async updateBoard(id: string, dto: UpdateBoardDTO): Promise<Board> {
    const board = await this.boardsRepository.findBoardById(id);
    if (!board) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return this.boardsRepository.updateBoard(id, dto);
  }

  async deleteBoard(id: string): Promise<string> {
    const board = await this.boardsRepository.findBoardById(id);
    if (!board) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    await this.taskRepository.deleteAllTask(id);
    const result = await this.boardsRepository.deleteBoard(id);
    if (result.affected > 0) {
      return `Board with id ${id} is deleted`;
    }
  }
}
