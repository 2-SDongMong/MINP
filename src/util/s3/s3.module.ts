import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { S3Service } from './aws.service';
import { S3Controller } from './s3.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [S3Controller],
  providers: [S3Service],
})
export class S3Module {}
