import { Body,Controller, Get, Post, Put, Delete, Req, Patch } from '@nestjs/common';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateMypageDto } from './dto/update-mypage.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInfo } from './user.info.decorator';
import { UsersService } from './users.service';
import { Request } from 'express';

@Controller('user')
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
  @Get('/mypage')
  getUser(@Req() req,){
    return this.usersService.getUserById(req.user)
  }

  @Patch('/mypage')
  updateUserInfo(
    @Req() req,
    @Body() data: UpdateMypageDto
    ) {
      return this.usersService.updateUserById(req.user, data);
    }

  @Delete('/mypage')
  deleteUserInfo(@Req() req,) {
    return this.usersService.deleteUserById(req.user)
  }
}
