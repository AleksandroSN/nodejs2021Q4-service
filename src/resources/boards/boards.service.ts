import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Board } from "./boards.entity";
import { CreateBoardDTO } from "./dto/create-board.dto";
import { UpdateBoardDTO } from "./dto/update-board.dto";

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardsRepository: Repository<Board>
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardsRepository.find();
  }

  async findBoard(id: string): Promise<Board> {
    return this.boardsRepository.findOne(id);
  }

  async addBoard(dto: CreateBoardDTO): Promise<Board> {
    return this.boardsRepository.save(dto);
  }

  async updateBoard(id: string, dto: UpdateBoardDTO) {
    const oldBoard = await this.boardsRepository.findOne(id);
    const updatedBoard = { ...oldBoard, ...dto } as Board;
    return this.boardsRepository.save(updatedBoard);
  }

  async deleteBoard(id: string): Promise<DeleteResult> {
    // deleteAllTasks
    return this.boardsRepository.delete(id);
  }
}
