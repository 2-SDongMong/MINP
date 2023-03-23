import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UsersService
  ) {}

  async use(req: any, res: any, next: Function) {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      // FIXME: UnauthorizedException이 잘 던져지는 것을 확인하면 삭제하기 => 잘 안됨.
      // => accessToken이 없으면 일단 다음 미들웨어로 건낸다.
      return next();
    }

    try {
      const { email } = this.jwtService.verify(accessToken, {
        secret: 'JWT_ACCESS_SECRET',
      });
      const User = await this.userService.findOneByEmail(email);
      req.userId = User.user_id;
      req.user = User;

      next();
    } catch (err) {
      // FIXME: 여기서 바로 에러를 던지는 대신 넘겨주는 이점을 생각해보기.
      // throw new UnauthorizedException(`Invalid JWT: ${accessToken}`);
      res.clearCookie('accessToken');
      next(err);
    }
  }
}
