import { Body, Controller, Post, Put} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";


@Controller("user")
export class UsersController { 
  constructor(private readonly userService: UsersService) {}

  @Post("/signup")
  async createUser(@Body() dto: CreateUserDto) {
    
    return await this.userService.create(dto);
  }


  @Put("/update")
  updateUser() {
    this.userService.updateUser("email", "new_name", "new_password");
  }
}