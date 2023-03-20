import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateMypageDto } from './dto/update-mypage.dto';
import { UpdateMemberDto } from './dto/update-member-status.dto';
import { UpdateAddressCertifiedDto } from './dto/update-address-certified.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async create(userData: CreateUserDto) {
    //이메일 중복 체크
    const existUser = await this.getByEmail(userData.email);
    if (!_.isNil(existUser)) {
      throw new ConflictException(
        `User already exists. email: ${userData.email}`
      );
    }

    //해시, salt 10번//login password 지워지는거
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);

    return newUser;
  }

  //google에서 아이디 패스워드만 받아와서 나머지 입력받아서 넣어
  async googleCreate() {}

  //이건 아직 xx
  updateUser(email: string, nickname: string, password: string) {
    this.userRepository.update({ email }, { nickname, password });
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email, deleted_at: null },
      select: ['nickname'],
    });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email: email });
  }
  async findPassword(email: string) {
    const a = await this.userRepository.findOne({
      where: { email, deleted_at: null },
      select: ['password'],
    });

    return a;
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ user_id: id });
  }
  //refreshToken update
  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  // My page API
  // 유저 정보 조회
  async getUserById(id: number) {
    return await this.userRepository.findOne({
      where: { user_id: id },
      select: [
        'user_id',
        'email',
        'name',
        'nickname',
        'address_road',
        'address_bname',
        'address_certified',
        'phone_number',
        'status',
      ],
    });
  }

  // 유저 정보 수정
  async updateUserById(id: number, userId: number, bodyData: UpdateMypageDto) {
    const user = await this.findUser(id);
    if (user.user_id === Number(userId)) {
      const {
        nickname,
        address_road,
        address_bname,
        address_certified,
        phone_number,
      } = bodyData;
      await this.userRepository.update(id, {
        nickname,
        address_road,
        address_bname,
        address_certified,
        phone_number,
      });
      return '회원정보 수정이 완료되었습니다.';
    } else {
      throw new BadRequestException('로그인한 아이디가 일치하지 않습니다.');
    }
  }

  // 유저 정보 삭제
  async deleteUserById(id: number, userId: number) {
    const user = await this.findUser(id);
    if (user.user_id === Number(userId)) {
      await this.userRepository.softDelete(id);
    } else {
      throw new BadRequestException('로그인한 아이디가 일치하지 않습니다.');
    }
  }

  // Admin page API
  // 가입 신청 대기 조회
  async getUserByStatus(id: number) {
    const user = await this.findUser(id);
    if (user.status === '관리자') {
      const user = await this.userRepository.find({
        where: { status: '가입 대기' },
      });
      return user;
    } else {
      throw new UnauthorizedException('권한이 없습니다.');
    }
  }

  // 가입 신청 승인 -> enum... 어떻게 함...
  async accessMember(id: number, userId: number, bodyData: UpdateMemberDto) {
    const user = await this.findUser(id);
    if (user.status === '관리자') {
      const editStatus = await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set(bodyData)
        .where('user_id = :userId', { uerId: Number(userId) })
        .execute();
      return editStatus;
    } else {
      throw new UnauthorizedException('권한이 없습니다.');
    }
  }

  // 일반 회원 목록 조회
  async getAllMember(id: number) {
    const user = await this.findUser(id);
    if (user.status === '관리자') {
      const member = await this.userRepository.find({
        where: { status: '일반' },
      });
      return member;
    } else {
      throw new UnauthorizedException('권한이 없습니다.');
    }
  }

  // 회원 삭제 API
  async deleteMemberById(id: number, userId: number) {
    const user = await this.findUser(id);
    if (user.status === '관리자') {
      const member = await this.userRepository.softDelete({
        user_id: userId,
      });
      return member;
    } else {
      throw new UnauthorizedException('권한이 없습니다.');
    }
  }

  // 로그인 한 user 찾기
  async findUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { user_id: id },
      select: ['user_id', 'status'],
    });
    return user;
  }

  /* 
    유저의 현재 위치의 '동네명'이 회원 가입 시 등록한 주소의 '동네명'과 일치 또는
    현재 위치 좌표와 회원 가입시 등록한 '도로명' 주소로 찾은 좌표 사이 거리가 1km 내라면
    동네(위치) 인증으로 처리 
    프론트에서 위의 로직이 실행되며 이 API는 호출시 단순히 위치 인증 여부 컬럼
    (user.address_certified)을 '참'으로 변경함
  */
  updateAddressCertified(id: number, isCertified: UpdateAddressCertifiedDto) {
    const { address_certified } = isCertified;
    console.log(
      'inside user.service, isCertified boolean? ',
      address_certified,
      'id: ',
      id
    );
    this.userRepository.update(id, { address_certified });
  }
}
