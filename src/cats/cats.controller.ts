import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Req,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/util/s3/aws.service';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catService: CatsService,
    private readonly s3Service: S3Service
  ) {}

  // 유저 ID에 속성 된 고양이 전체 상세보기
  @Get('/')
  async getMyCat(@Req() req) {
    const data = await this.catService.getMyCat(req.userId);
    return data;
  }

  @Post('/')
  async createCat(@Req() req, @Body() data: CreateCatDto) {
    const newCat = await this.catService.createCat(req.userId, data);
    return newCat;
  }

  @Patch('/:id')
  async updateCat(
    @Req() req,
    @Param('id') catId: number,
    @Body() data: UpdateCatDto
  ) {
    return await this.catService.updateCatById(req.userId, catId, data);
  }

  @Delete('/:id')
  deleteCat(@Req() req, @Param('id') catId: number) {
    return this.catService.deleteCatById(req.userId, catId);
  }
}
