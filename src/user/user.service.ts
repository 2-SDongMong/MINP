import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import _ from "lodash";
import { InsertResult, Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email, deletedAt: null },
      select: ["email", "password"],
    });

    if (_.isNil(user)) {
      throw new NotFoundException(`User not found. email: ${email}`);
    }

    if (user.password !== password) {
      throw new UnauthorizedException(
        `User password is not correct. email: ${email}`
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
    
    const insertResult = await this.userRepository.insert({
      email,
      name,
      nickname,
      address,
      phone_number,
      referral_code,
      password,
    });

    const payload = { email: insertResult.identifiers[0].email };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  updateUser(email: string, nickname: string, password: string) {
    this.userRepository.update({ email }, { nickname, password });
  }

  async getUserInfo(email: string) {
    return await this.userRepository.findOne({
      where: { email, deletedAt: null },
      select: ["nickname"], // 이외에도 다른 정보들이 필요하면 리턴해주면 됩니다.
    });
  }
}