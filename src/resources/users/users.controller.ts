import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtGuard } from "../auth/jwt-guard";
import { CreateUserDTO } from "./dto/create-user.dto";
import { ResponseUserDTO } from "./dto/response-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { User } from "./users.entity";
import { UsersService } from "./users.service";

@Controller("users")
@ApiTags("Users")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiOperation({ summary: "Get All Users" })
  @ApiResponse({ status: 200, type: [ResponseUserDTO] })
  findAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get one User" })
  @ApiParam({ name: "id", description: "string in UUID format" })
  @ApiResponse({ status: 200, type: ResponseUserDTO })
  findOne(@Param("id", ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.findUser(id);
  }

  @Post()
  @ApiOperation({ summary: "Add new User" })
  @ApiResponse({ status: 201, type: ResponseUserDTO })
  @ApiBody({ type: User })
  addOne(@Body() newUser: CreateUserDTO): Promise<User> {
    return this.userService.addUser(newUser);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update one User" })
  @ApiParam({ name: "id", description: "string in UUID format" })
  @ApiBody({ type: User })
  @ApiResponse({ status: 200, type: ResponseUserDTO })
  updateOne(
    @Body() updateUser: UpdateUserDTO,
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<User> {
    return this.userService.updateUser(id, updateUser);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete one User" })
  @ApiParam({ name: "id", description: "string in UUID format" })
  @ApiResponse({
    status: 200,
    type: "User with id 5e5f848d-48b5-49ee-9fd3-933ea34bba3b is deleted",
    description: "Response with next text: User with id UUID is deleted",
  })
  deleteOne(@Param("id", ParseUUIDPipe) id: string): Promise<string> {
    return this.userService.deleteUser(id);
  }
}
