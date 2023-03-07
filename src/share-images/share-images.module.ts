import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareImage } from './share-image.entity';
import { ShareImagesController } from './share-images.controller';
import { ShareImagesService } from './share-images.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShareImage])],
  controllers: [ShareImagesController],
  providers: [ShareImagesService],
})
export class ShareImagesModule {}
