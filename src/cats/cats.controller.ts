import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body,
  Param
} from '@nestjs/common';
import { UserInfo } from 'src/users/user.info.decorator';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';


@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  // 유저 ID에 속성 된 고양이 전체 상세보기
  @Get('/')
  async getMyCats() {
    const userId = 1
    return await this.catService.getMyCats(userId);
  }

  // 고양이ID로 고양이 한 마리만 상세보기 API,굳이 필요하진 않을 거 같지만 일단 둠
  // @Get('/:id')
  // async getMyCatsById(@Param('id') catId: number) {
  //   return await this.catService.getMyCatsById(catId);
  // }

  @Post('/mycat')
  createCat(
    @UserInfo() user,
    @Body() data: CreateCatDto
    ) {
    const userId = user.user_id;
    return this.catService.createCat(userId, data)
  }

  // @Put('/:id')
  // updateCat(
  //   @Param('id') catId: number,
  //   @Body() data: UpdateCatDto,
  // ) {
  //   return this.catService.updateCatById(catId);
  // }

  // @Delete('/:id')
  // deleteCat(@Param('id') catId: number,) {
  //   return this.catService.deleteCatById(catId)
  // }
}
