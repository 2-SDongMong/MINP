import { Body, Controller, Get, Post, Put, Query, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

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
}
