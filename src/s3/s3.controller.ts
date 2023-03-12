import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { S3Service } from './aws.service';

@Controller()
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Get()
  getHello() {
    return 'hello, aws s3';
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('image', 10))
  async uploadMediaFiles(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
    const results = [];
    for (const file of files) {
      results.push(await this.s3Service.uploadFileToS3('products', file));
    }
    return results;
  }

  @Post('products')
  getImageUrl(@Body('key') key: string) {
    return this.s3Service.getAwsS3FileUrl(key);
  }
}
