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
  // FIXME: 이미지 업로더 수정
  @Post('/')
  @UseInterceptors(FileInterceptor('image'))
  async createCat(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateCatDto
  ) {
    if(file) {
      console.log(data)
      console.log(file)
      const folder = 'cat_images';
      const imageUrl = await this.s3Service.uploadFileToS3(folder, file);
      // data.image = imageUrl;
    }

    return this.catService.createCat(req.userId, data);
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateCat(
    @Req() req,
    @Param('id') catId: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: UpdateCatDto
  ) {
    const folder = 'cat_images';
    const image = await this.s3Service.uploadFileToS3(folder, file);
    // data.image = image;
    return await this.catService.updateCatById(req.userId, catId, data);
  }

  @Delete('/:id')
  deleteCat(@Req() req, @Param('id') catId: number) {
    return this.catService.deleteCatById(req.userId, catId);
  }
}
