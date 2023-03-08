import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostImage } from './post-image.entity';
import { PostImagesController } from './post-images.controller';
import { PostImagesService } from './post-images.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostImage])],
  controllers: [PostImagesController],
  providers: [PostImagesService],
})
export class PostImagesModule {}
