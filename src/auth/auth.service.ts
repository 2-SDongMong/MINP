import { HttpException, HttpStatus, ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import _ from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    ) {}


  // login
  public async login(dto:LoginUserDto){
    const findPassword = await this.userService.findPassword(dto.email)
    const user = await this.userService.findOneByEmail(dto.email);
    const isPasswordMatching = await bcrypt.compare(
      dto.password,
      findPassword.password,
    );
    
    if (!isPasswordMatching) {
      throw new HttpException(
        '잘못된 인증 정보입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.password = undefined;

    const tokens = await this.getTokens(user.user_id, user.email);
    const refreshTokentHash = await this.hashPassword(tokens.refresh_token);
    await this.userService.update(user.user_id, { hashdRt: refreshTokentHash });

    return tokens;
  }

  async logout(userId: number) {
    
    await this.userService.update(userId, { hashdRt: null });
  }

  async getTokens(userId: number, email: string) {
    const [accesstoken, refreshtoken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'JWT_ACCESS_SECRET',
          expiresIn: '24h',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'JWT_REFRESH_SECRET',
          expiresIn: '30d',
        },
      ),
    ]);

    return {
      access_token: accesstoken,
      refresh_token: refreshtoken,
    };
  }

  async hashPassword(data: string) {

    return bcrypt.hash(data, 10);
  }
  
  

 //2. access만료 refresh 유효 -> refresh 검증 후 access 재발급 refreshTokens ㄱㄱ
  async refreshTokens(userId: object, refreshtoken: string) {
    const user_id = userId['sub']
    const token = refreshtoken.split('bearer ')[1];
    //bearer refreshtoken 이런 토큰
    const user = await this.userService.findOne(user_id);
    const refreshTokentCompare = await bcrypt.compare(token, user?.hashdRt);
    if (!refreshTokentCompare) throw new ForbiddenException('Access Denied.');
    const tokens = await this.getTokens(user?.user_id, user?.email);
    const refreshTokenHash = await this.hashPassword(tokens.refresh_token);
    await this.userService.update(user?.user_id, { hashdRt: refreshTokenHash });

    return tokens;
    }

}