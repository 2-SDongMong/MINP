import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharePost } from './share-post.entity';
import { SharePostController } from './share-post.controller';
import { SharePostService } from './share-post.service';

@Module({
  imports: [TypeOrmModule.forFeature([SharePost])],
  controllers: [SharePostController],
  providers: [SharePostService],
})
export class SharePostModule {}
