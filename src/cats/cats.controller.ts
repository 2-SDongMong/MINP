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
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  // 유저 ID에 속성 된 고양이 전체 상세보기
  @Get('/')
  async getMyCat(@Req() req) {
    const data = await this.catService.getMyCat(req.userId);
    return data;
  }

  @Post('/')
  createCat(@Req() req, @Body() data: CreateCatDto) {
    return this.catService.createCat(req.userId, data);
  }

  @Patch('/:id')
  async updateCat(
    @Req() req,
    @Param('id') catId: number,
    @Body() data: UpdateCatDto
  ) {
    console.log('hello');
    return await this.catService.updateCatById(req.userId, catId, data);
  }

  @Delete('/:id')
  deleteCat(@Req() req, @Param('id') catId: number) {
    return this.catService.deleteCatById(req.userId, catId);
  }
}
