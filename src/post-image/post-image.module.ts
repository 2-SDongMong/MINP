import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostImage } from './post-image.entity';
import { PostImageController } from './post-image.controller';
import { PostImageService } from './post-image.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostImage])],
  controllers: [PostImageController],
  providers: [PostImageService],
})
export class PostImageModule {}
