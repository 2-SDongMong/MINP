import { Body, Param, Controller, Get, Post, Put, Delete} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserInfo } from './user.info.decorator';
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

  // My page API
  @Get('/mypage')
  getUser(
    @UserInfo() user,
    // @Param('id') userId:number)
    ){
    const userId= user.user_id;
    return this.userService.getUser(userId)
  }
  // TODO: @Put('/mypage/:id')
  // updateUserInfo(@Param('id') userId:number,
  // @Body() data: UpdateUserDto
  // ) {
  //   return this.userService.updateUserInfo(userId,"nickname","address", "phone_number", "password");
  // }

  // TODO: @Delete('/mypage/:id')
  // deleteUserInfo(
    // @param('id) userId: number,
    // @body() data: DeleteUserDto,
    // ) {
    // return this.userService.deleteUserInfo(userId, data.password)
  // }
}