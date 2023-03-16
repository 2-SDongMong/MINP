import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './aws.service';

@Controller()
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Get()
  getHello() {
    return 'hello, aws s3';
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadMediaFile(@UploadedFile() file: Express.Multer.File) {
    return await this.s3Service.uploadFileToS3('cats', file);
  }

  @Post('cats')
  getImageUrl(@Body('key') key: string) {
    return this.s3Service.getAwsS3FileUrl(key);
  }
}
