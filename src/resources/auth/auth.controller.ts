import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthResponseDTO } from "./dto/auth-response.dto";
import { AuthUserDTO } from "./dto/auth-user.dto";

@Controller()
@ApiTags("Authentication")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  @ApiOperation({ summary: "Authenticate of users" })
  @ApiBody({ type: AuthUserDTO })
  @ApiResponse({ status: 200, type: AuthResponseDTO })
  login(@Body() dto: AuthUserDTO) {
    return this.authService.login(dto);
  }
}
