import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Patch,
  Param,
} from '@nestjs/common';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateMypageDto } from './dto/update-mypage.dto';
import { UserInfo } from './user.info.decorator';
import { UsersService } from './users.service';
import { Request } from 'express';
import { UpdateMemberDto } from './dto/update-member-status.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() dto: CreateUserDto) {
    return await this.usersService.create(dto);
  }

  @Put('/update')
  updateUser() {
    this.usersService.updateUser('email', 'new_name', 'new_password');
  }

  // My page API
  // 유저 정보 조회
  @Get('/mypage')
  getUser(@Req() req) {
    return this.usersService.getUserById(req.user);
  }

  // 유저 정보 수정
  @Patch('/mypage/:id')
  updateUserInfo(
    @Req() req,
    @Param('id') userId: number,
    @Body() data: UpdateMypageDto
  ) {
    return this.usersService.updateUserById(req.user, userId, data);
  }

  // 유저 정보 삭제
  @Delete('/mypage/:id')
  deleteUserInfo(@Req() req, @Param('id') userId: number) {
    return this.usersService.deleteUserById(req.user, userId);
  }

  // Admin page API
  // 가입 신청 대기 조회 API
  @Get('/admin')
  getAllUser(@Req() req) {
    return this.usersService.getUserByStatus(req.user);
  }

  // 가입 신청 승인 API
  @Patch('/admin/:id')
  accessMember(
    @Req() req,
    @Param('id') userId: number,
    @Body() data: UpdateMemberDto
  ) {
    return this.usersService.accessMember(req.user, userId, data);
  }

  // 일반 회원 목록 조회 API
  @Get('/admin/member')
  getMember(@Req() req) {
    return this.usersService.getAllMember(req.user);
  }

  // 전체 회원 삭제 API
  @Delete('/admin/member/:id')
  deleteMember(@Req() req, @Param('id') userId: number) {
    return this.usersService.deleteMemberById(req.user, userId);
  }
}
