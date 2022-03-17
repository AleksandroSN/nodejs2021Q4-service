import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { comparePassword } from "../../common";
import { User } from "../users/users.entity";
import { UsersService } from "../users/users.service";
import { AuthUserDTO } from "./dto/auth-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async generateToken(user: User) {
    const payload = { userId: user.id, login: user.login };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  async login(dto: AuthUserDTO) {
    const userIsExist = await this.userService.findUserByLogin(dto.login);
    const comparePass = await comparePassword(
      dto.password,
      userIsExist.password
    );
    if (comparePass) {
      return this.generateToken(userIsExist);
    }
    throw new UnauthorizedException("Bad combination user/password");
  }
}
