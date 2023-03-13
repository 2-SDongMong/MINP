import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Req,
  Patch,
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
  async getMyCats(@Req() req) {
    return await this.catService.getMyCats(req.user);
  }

  // 고양이ID로 고양이 한 마리만 상세보기 API,굳이 필요하진 않을 거 같지만 일단 둠
  // @Get('/:id')
  // async getMyCatsById(@Param('id') catId: number) {
  //   return await this.catService.getMyCatsById(catId);
  // }

  @Post('/')
  createCat(@Req() req, @Body() data: CreateCatDto) {
    return this.catService.createCat(req.user, data);
  }

  @Patch('/:id')
  updateCat(
    @Req() req,
    @Param('id') catId: number,
    @Body() data: UpdateCatDto
  ) {
    return this.catService.updateCatById(req.user, catId, data);
  }

  @Delete('/:id')
  deleteCat(@Req() req, @Param('id') catId: number) {
    return this.catService.deleteCatById(req.user, catId);
  }
}
