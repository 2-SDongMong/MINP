import { Body, Controller, Get, Post, Put } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() body) {
    return await this.userService.login(body.email, body.password);
  }

  @Post('/signup')
  async createUser(@Body() body) {
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
