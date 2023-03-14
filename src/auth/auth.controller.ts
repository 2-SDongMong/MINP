import { Body, Post, UseGuards, Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
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

  @Post('')
  async sendMail(@Body() body) {
    return await this.authService.sendMail(body.email);
  }

  //구글 login
  // @Get('/login/google')
  // @UseGuards(AuthGuard('google'))
  // async loginGoogle(
  //   @Req() req: Request & IOAuthUser,
  //   @Res() res: Response
  //   ){
  //   this.authService.OAuthLogin({req,res})
  // }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@UserId() userId: number) {
    return await this.authService.logout(userId);
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
