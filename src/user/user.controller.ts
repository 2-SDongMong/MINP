import { Body, Controller, Get, Post, Put } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
    
  @Post("/login")
  async login(@Body() data:LoginUserDto) {
    return await this.userService.login(data.email, data.password);
  }

  @Post("/signup")
  async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data.email, data.name, data.nickname,data.address, data.password, data.phone_number,data.referral_code);
  }

  @Put("/update")
  updateUser() {
    this.userService.updateUser("email", "new_name", "new_password");
  }
}