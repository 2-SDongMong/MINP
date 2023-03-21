import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cat.entity';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { AwsModule } from 'src/s3-upload/aws.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cat]), AwsModule],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
