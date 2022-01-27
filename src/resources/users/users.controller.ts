import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { User } from "./users.entity";
import { UsersService } from "./users.service";

@Controller("users")
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findUser(id);
  }

  @Post()
  addUser(@Body() newUser: CreateUserDTO) {
    return this.userService.addUser(newUser);
  }

  @Put(":id")
  updateOne(@Param("id") id: string, @Body() updateUser: UpdateUserDTO) {
    return this.userService.updateUser(id, updateUser);
  }

  @Delete(":id")
  deleteOne(@Param("id") id: string) {
    return this.userService.deleteUser(id);
  }
}
