import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    // private userPassword = new Map(),
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email, deleted_at: null },
      select: ['email', 'password'],
    });

    if (_.isNil(user)) {
      throw new NotFoundException(`User not found. email: ${email}`);
    }

    if (user.password !== password) {
      throw new UnauthorizedException(
        `User password is not correct. email: ${email}`,
      );
    }

    const payload = { email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  async createUser(
    email: string,
    name: string,
    nickname: string,
    address: string,
    password: string,
    phone_number: string,
    referral_code: string,
  ) {
    const existUser = await this.getUserInfo(email);
    // if (!_.isNil(existUser)) {
    //   throw new ConflictException(`User already exists. email: ${email}`);
    // }

    const insertResult = await this.usersRepository.insert({
      email,
      name,
      nickname,
      address,
      phone_number,
      referral_code,
      password,
    });

    const payload = { 
      user_id: insertResult.identifiers[0].user_id,
      email: insertResult.identifiers[0].email 
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  updateUser(email: string, nickname: string, password: string) {
    this.usersRepository.update({ email }, { nickname, password });
  }

  async getUserInfo(email: string) {
    return await this.usersRepository.findOne({
      where: { email, deleted_at: null },
      select: ['nickname'],
    });
  }

  // My page API
  async getUser(userId: number) {
    return await this.usersRepository.findOne({
      where: { user_id:userId},
      select: ['email', 'name', 'nickname', 'address', 'phone_number', 'password']
    });
  }

    updateUserInfo(userId: number, nickname: string, address: string, phone_number: string, password: string) {
    this.usersRepository.update({
      user_id:userId}, 
      { 
        nickname, 
        address, 
        phone_number, 
        password
      });
  }

  // deleteUser(userId: number, password: number) {
  //   if (this.userPassword.get(userId) !== password) {
  //     throw new UnauthorizedException(
  //       '입력된 비밀번호가 다릅니다.'
  //     );   
  //   }
  // }
}
