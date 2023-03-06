import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareImage } from './share-image.entity';
import { ShareImageController } from './share-image.controller';
import { ShareImageService } from './share-image.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShareImage])],
  controllers: [ShareImageController],
  providers: [ShareImageService],
})
export class ShareImageModule {}
