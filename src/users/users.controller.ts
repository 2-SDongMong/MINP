import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  //dto를통한통신
  @Post('/login')
  async login(@Body() body) {
    return await this.userService.login(body.email, body.password);
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    return await this.userService.createUser(
      body.email,
      body.name,
      body.nickname,
      body.address,
      body.password,
      body.phone_number,
      body.referral_code,
    );
  }

  @Put('/update')
  updateUser() {
    this.userService.updateUser('email', 'new_name', 'new_password');
  }
}
