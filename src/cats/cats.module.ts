import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Service } from 'src/util/s3/aws.service';
import { S3Module } from 'src/util/s3/s3.module';
import { Cat } from './cat.entity';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cat]), S3Module],
  controllers: [CatsController],
  providers: [CatsService, S3Service],
})
export class CatsModule {}
