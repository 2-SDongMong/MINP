import { Body, Param, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { UserInfo } from './user.info.decorator';
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
