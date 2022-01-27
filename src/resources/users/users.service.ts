import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomName } from "src/utils";
import { Repository } from "typeorm";
import { Task } from "../tasks/tasks.entity";
import { CreateUserDTO } from "./dto/create-user.dto";
import { User } from "./users.entity";
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Task) private taskRepository: Repository<Task>
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async addUser(dto: CreateUserDTO): Promise<User> {
    const userName = randomName(dto.name);
    const userWithName = {
      ...dto,
      ...{ name: userName },
    } as User;
    const newUser = new User(userWithName);
    return this.usersRepository.save(newUser);
  }

  async findUser(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateUser(id: string, dto: CreateUserDTO): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    const updatedUser = { ...user, ...dto } as User;
    const userWithoutPass = new User(updatedUser);
    return this.usersRepository.save(userWithoutPass);
  }

  async deleteUser(id: string): Promise<void> {
    const tasksWithUserId = await this.taskRepository.find({
      where: { userId: id },
    });
    const modifyTask = tasksWithUserId.map((task) => ({
      ...task,
      ...{ userId: null },
    })) as Task[];
    await this.taskRepository.save(modifyTask);
    await this.usersRepository.delete(id);
  }
}
