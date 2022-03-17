import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomName } from "../../utils";
import { TaskRepository } from "../tasks/task.repository";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { User } from "./users.entity";
import { UserRepository } from "./users.repository";
import { errorThrower } from "../../exceptions";
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
    await errorThrower<User, NotFoundException>(
      user,
      "User not found",
      NotFoundException
    );
    return user;
  }

  async findUserByLogin(login: string): Promise<User> {
    const user = await this.usersRepository.findUserByLogin(login);
    await errorThrower<User, BadRequestException>(
      user,
      "Bad combination user/password",
      BadRequestException
    );
    return user;
  }

  async updateUser(id: string, dto: UpdateUserDTO): Promise<User> {
    await this.findUser(id);
    return this.usersRepository.updateUser(id, dto);
  }

  async deleteUser(id: string): Promise<string> {
    await this.findUser(id);
    await this.taskRepository.updateUsersIds(id);
    const result = await this.usersRepository.deleteUser(id);
    if (result.affected > 0) {
      return `User with id ${id} is deleted`;
    }
  }
}
