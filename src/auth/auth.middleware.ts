import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
  } from "@nestjs/common";
  import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
  
  @Injectable()
  export class AuthMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService,
      private readonly userService: UserService
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
          secret: 'JWT_ACCESS_SECRET'
        })
        console.log(email)
        const User = this.userService.findOneByEmail(email)
        console.log("User",User)

        req.user = (await User).user_id;
        next();
      } catch (err) {
        throw new UnauthorizedException(`Invalid JWT: ${token}`);
      }
    }
  }