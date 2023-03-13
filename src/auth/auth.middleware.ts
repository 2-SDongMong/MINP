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
    const authHeader = req.headers.authorization;
    console.log("어디서 멈춤?")
    const accessToken = authHeader?.split(' ')[1];
    if (!accessToken) {
      return next();
    }

    try {
      const { email } = this.jwtService.verify(accessToken, {
        secret: 'JWT_ACCESS_SECRET',
      });
      const User = this.userService.findOneByEmail(email);
      req.user = (await User).user_id;
      console.log((await User).user_id)
      next();
    } catch (err) {
      throw new UnauthorizedException(`Invalid JWT: ${accessToken}`);
    }
  }
}
