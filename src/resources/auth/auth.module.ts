import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

// TO-DO add auth class with JWT settings
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || "SECRET",
      signOptions: {
        expiresIn: "24h",
      },
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
