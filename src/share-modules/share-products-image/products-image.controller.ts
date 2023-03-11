import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsImageService } from './products-image.service';

@Controller('products-image')
export class ProductsImageController {
  constructor(private readonly productsImageService: ProductsImageService) {}

  @Get()
  getHello() {
    return 'hello, aws s3';
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadMediaFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return await this.productsImageService.uploadFileToS3('cats', file);
  }

  @Post('cats')
  getImageUrl(@Body('key') key: string) {
    return this.productsImageService.getAwsS3FileUrl(key);
  }
}
