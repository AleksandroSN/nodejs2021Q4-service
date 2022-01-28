import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthUserDTO } from "./dto/auth-user.dto";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("/login")
  login(@Body() dto: AuthUserDTO) {
    return this.authService.login(dto);
  }
}
