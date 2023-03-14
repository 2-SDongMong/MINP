import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UsersService
  ) {}

  async use(req: any, res: any, next: Function) {
    // FIXME: 쿠키 방식이 모두에게 잘 적용됨을 확인하면 삭제하기
    // const authHeader = req.headers.authorization;

    // console.log('authMiddleware: ', authHeader);
    // const accessToken = authHeader && authHeader?.split(' ')[1];

    const { accessToken } = req.cookies;

    if (!accessToken) {
      throw new UnauthorizedException('AccessToken not found');
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
      throw new UnauthorizedException(`Invalid JWT: ${accessToken}`);
    }
  }
}
