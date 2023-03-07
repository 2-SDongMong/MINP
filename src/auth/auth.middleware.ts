import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
  } from "@nestjs/common";
  import { JwtService } from "@nestjs/jwt";
  
  @Injectable()
  export class AuthMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) {}
  
    async use(req: any, res: any, next: Function) {
      const authHeader = req.headers.authorization;
  
      if (!authHeader) {
        throw new UnauthorizedException("JWT not found");
      }
  
      let token: string;
      try {
        token = authHeader.split(" ")[1];
        console.log("token---------------",token)
        const payload = await this.jwtService.verify(token);
        req.user = payload;
        next();
      } catch (err) {
        throw new UnauthorizedException(`Invalid JWT: ${token}`);
      }
    }
  }