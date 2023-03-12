import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductsImageService } from './products-image.service';

@Controller('products-image')
export class ProductsImageController {
  constructor(private readonly productsImageService: ProductsImageService) {}

  @Get()
  getHello() {
    return 'hello, aws s3';
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('productImages'))
  async uploadMediaFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    const uploadPromises = files.map((file) =>
      this.productsImageService.uploadFileToS3('productsImage', file)
    );
    return await Promise.all(uploadPromises);
  }

  @Post('cats')
  getImageUrl(@Body('key') key: string) {
    return this.productsImageService.getAwsS3FileUrl(key);
  }
}
