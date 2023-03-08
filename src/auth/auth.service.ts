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
    console.log("findPassword",findPassword)

    const user = await this.userService.findOneByEmail(dto.email);
    console.log("user",user)
    const isPasswordMatching = await bcrypt.compare(
      dto.password,
      findPassword.password,
    );
    console.log(isPasswordMatching);
    if (!isPasswordMatching) {
      throw new HttpException(
        '잘못된 인증 정보입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.password = undefined;
    console.log("넘음?")
    const tokens = await this.getTokens(user.user_id, user.email);
    const rtHash = await this.hashPassword(tokens.refresh_token);

    await this.userService.update(user.user_id, { hashdRt: rtHash });
    return tokens;
  }

  async logout(userId: number) {
    console.log("update-----------------",userId)
    await this.userService.update(userId, { hashdRt: null });
  }

  async getTokens(userId: number, email: string) {
    const [at, rt] = await Promise.all([
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
      access_token: at,
      refresh_token: rt,
    };
  }

  async hashPassword(data: string) {
    return bcrypt.hash(data, 10);
  }
  
  async refreshTokens(userId: number, rt: string) {
    console.log("refresh 들어옴?")
    const user = await this.userService.findOne(userId);
    //찾아 없으면 x
    if (!user || !user.hashdRt) throw new ForbiddenException('Access Denied.');
    //db의 토큰과 비교
    const rtMatches = await bcrypt.compare(rt, user.hashdRt);

    if (!rtMatches) throw new ForbiddenException('Access Denied.');
    //토큰 받아 새로
    const tokens = await this.getTokens(user.user_id, user.email);
    //다시 넣어
    const rtHash = await this.hashPassword(tokens.refresh_token);

    await this.userService.update(user.user_id, { hashdRt: rtHash });
    return tokens;
    }

}