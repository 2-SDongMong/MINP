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
import { UsersService } from './users.service';
import { UpdateMemberDto } from './dto/update-member-status.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signUp')
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

  // Admin page API
  // 가입 신청 대기 조회 API
  @Get('/admin')
  getAllUser(@Req() req) {
    return this.usersService.getUserByStatus(req.userId);
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
  getMember(@Req() req) {
    return this.usersService.getAllMember(req.userId);
  }

  // 전체 회원 삭제 API
  @Delete('/admin/member/:id')
  deleteMember(@Req() req, @Param('id') userId: number) {
    return this.usersService.deleteMemberById(req.userId, userId);
  }
}
