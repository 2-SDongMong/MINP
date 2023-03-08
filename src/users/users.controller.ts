import { Body, Param, Controller, Get, Post, Put, Delete, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInfo } from './user.info.decorator';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Put('/update')
  updateUser() {
    this.userService.updateUser('email', 'new_name', 'new_password');
  }

  // My page API
  @Get('/mypage')
  getUser(
    @UserInfo() user,
    @Req() req
    // @Param('id') userId:number)
    ){
    console.log(req.user)
    const userId= user.user_id;
    return this.userService.getUserById(userId)
  }
  @Put('/mypage/:id')
  updateUserInfo(@Param('id') userId:number,
  @Body() data: UpdateUserDto
  ) {
    return this.userService.updateUserById(userId,"nickname","address", "phone_number", "password");
  }

  @Delete('/mypage/id')
  deleteUserInfo(@Param('id') userId: number,) {
    return this.userService.deleteUserById(userId)
  }
}
