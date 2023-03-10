import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  PayloadTooLargeException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { GetCurrentUser } from './decorator/get-current-user.decorator';
import { UserId } from './decorator/get-current-userid.decorator';
import { RtGuard } from './guards/rt.guard';

@Controller('auth')
export class AuthController {
  jwtService: any;
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginUserDto) {
    console.log('오류찾기 auth.controller.ts');

    return await this.authService.login(dto);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@UserId() userId: number) {
    return await this.authService.logout(userId);
  }

  @Post('/refresh')
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUser('refreshToken') refreshToken: string,
    @UserId() userId: number
  ) {
    return await this.authService.refreshTokens(userId, refreshToken);
  }
}
function Public() {
  throw new Error('Function not implemented.');
}
