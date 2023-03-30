import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Req,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateMypageDto } from './dto/update-mypage.dto';
import { UsersService } from './users.service';
import { UpdateMemberDto } from './dto/update-member-status.dto';
import { UpdateAddressCertifiedDto } from './dto/update-address-certified.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signUp')
  async createUser(@Body() dto: CreateUserDto) {
    return await this.usersService.create(dto);
  }

  // My page API
  // 유저 정보 조회
  @Get('/mypage')
  async getUser(@Req() req) {
    const data = await this.usersService.getUserById(req.userId);
    return data;
  }

  // 유저 정보 수정
  @Patch('/mypage/:id')
  async updateUserInfo(
    @Req() req,
    @Param('id') userId: number,
    @Body() data: UpdateMypageDto
  ) {
    await this.usersService.updateUserById(req.userId, userId, data);
    return true;
  }

  // 유저 정보 삭제
  @Delete('/mypage/:id')
  deleteUserInfo(@Req() req, @Param('id') userId: number) {
    return this.usersService.deleteUserById(req.userId, userId);
  }

  // 내가 쓴 게시글 조회
  // 품앗이 요청
  @Get('/mypost')
  async showMyRequest(@Req() req) {
    const data = await this.usersService.showMyRequest(req.userId);
    return data;
  }

  // 내가 쓴 품앗이 요청 삭제
  @Delete('requests/:id')
  deleteMyRequest(@Req() req, @Param('id') requestId: number) {
    return this.usersService.deleteMyRequest(req.userId, requestId);
  }

  // 내가 쓴 나눔 게시글 삭제
  @Delete('share/:id')
  async deleteMyShare(@Req() req, @Param('id') shareId: number) {
    return this.usersService.deleteMyShare(req.userId, shareId);
  }

  // 내가 쓴 자유 게시판 삭제
  @Delete('/post/:id')
  async deleteMyPost(@Req() req, @Param('id') postId: number) {
    return this.usersService.deleteMyPost(req.userId, postId);
  }

  // Admin page API
  // 가입 신청 대기 조회 API
  @Get('/admin')
  async getAllUser(@Req() req, @Query() query) {
    const data = await this.usersService.getUserByStatus(
      req.userId,
      Number(query.registrationPage) || 1
    );
    return data;
  }

  // 가입 신청 승인 API
  @Patch('/admin/:id')
  accessMember(
    @Req() req,
    @Param('id') userId: number,
    @Body() data: UpdateMemberDto
  ) {
    return this.usersService.accessMember(req.userId, userId, data);
  }

  // 일반 회원 목록 조회 API
  @Get('/admin/member')
  getMember(@Req() req, @Query() query) {
    return this.usersService.getAllMember(
      req.userId,
      Number(query.memberPage) || 1
    );
  }

  // 전체 회원 삭제 API
  @Delete('/admin/member/:id')
  deleteMember(@Req() req, @Param('id') userId: number) {
    return this.usersService.deleteMemberById(req.userId, userId);
  }

  //이메일로 유저 찾기
  @Get('/:email')
  async getUserId(@Param(`email`) email) {
    console.log('user.controllers.ts', email);
    const a = await this.usersService.findOneByEmail(email);
    return a.user_id;
  }

  // 유저의 '위치(동네) 인증' 처리: address_certified을 false -> true로 변경
  @Patch('address/certify')
  updateAddressCertified(
    @Req() req,
    @Body() isCertified: UpdateAddressCertifiedDto
  ) {
    this.usersService.updateAddressCertified(req.userId, isCertified);
  }

  //닉네임 중복 확인
  @Post('/signup/check')
  async checkNickname(@Body() nickname) {
    return this.usersService.checkNickname(nickname.nickname);
  }
}
