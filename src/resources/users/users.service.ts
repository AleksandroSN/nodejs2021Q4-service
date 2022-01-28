import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomName } from "src/utils";
import { TaskRepository } from "../tasks/task.repository";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { User } from "./users.entity";
import { UserRepository } from "./users.repository";
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly usersRepository: UserRepository,
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.findAllUsers();
  }

  async addUser(dto: CreateUserDTO): Promise<User> {
    const userName = randomName(dto.name);
    const userWithName = {
      ...dto,
      ...{ name: userName },
    } as User;
    return this.usersRepository.createUser(userWithName);
  }

  async findUser(id: string): Promise<User> {
    const user = await this.usersRepository.findUserById(id);
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateUser(id: string, dto: UpdateUserDTO): Promise<User> {
    const user = await this.usersRepository.findUserById(id);
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return this.usersRepository.updateUser(id, dto);
  }

  async deleteUser(id: string): Promise<string> {
    const user = await this.usersRepository.findUserById(id);
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    await this.taskRepository.updateUsersIds(id);
    const result = await this.usersRepository.deleteUser(id);
    if (result.affected > 0) {
      return `User with id ${id} is deleted`;
    }
  }
}
