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
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  jwtService: any;
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginUserDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const { accessToken, refreshToken } = await this.authService.login(dto);

    // 쿠키에 accessToken 할당
    res.cookie('accessToken', accessToken);

    return res.json({ accessToken });

    // FIXME: 쿠키 방식이 모두에게 잘 적용됨을 확인하면 삭제하기
    // return await this.authService.login(dto);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@UserId() userId: number, @Res() res) {
    // 쿠키에서 accessToken 제거
    res.clearCookie('accessToken');

    // users테이블에서 hashdRt 항목 null로 변경
    await this.authService.logout(userId);
    return res.json({ message: '정상적으로 로그아웃 되었습니다.' });
  }

  @Post('/refresh')
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    //쿠키, 웹스토리지에 있는 refreshtoken으로
    @GetCurrentUser('refreshToken') refreshToken: string,
    @UserId() userId: object
  ) {
    return await this.authService.refreshTokens(userId, refreshToken);
  }
}
function Public() {
  throw new Error('Function not implemented.');
}
