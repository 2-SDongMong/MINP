import { Body, Controller, Post, Put} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";


@Controller("user")
export class UserController { 
  constructor(private readonly userService: UserService) {}

  @Post("/signup")
  async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }


  @Put("/update")
  updateUser() {
    this.userService.updateUser("email", "new_name", "new_password");
  }
}