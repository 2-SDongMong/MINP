import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
  } from "@nestjs/common";
  import { JwtService } from "@nestjs/jwt";
  import { UsersService } from "src/users/users.service";
  
  @Injectable()
  export class AuthMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService,
      private readonly userService: UsersService
      ) {}
  
    async use(req: any, res: any, next: Function) {
      const authHeader = req.headers.authorization;
  
      if (!authHeader) {
        throw new UnauthorizedException("JWT not found");
      }
  
      let token: string;
      try {
        token = authHeader.split(" ")[1];
        const { email } = this.jwtService.verify(token,{
          secret: 'JWT_REFRESH_SECRET'
        })
        const User = this.userService.findOneByEmail(email)
        req.user = (await User).user_id;
        
        next();
      } catch (err) {
        throw new UnauthorizedException(`Invalid JWT: ${token}`);
      }
    }
  }