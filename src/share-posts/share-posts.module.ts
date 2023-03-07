import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharePost } from './share-post.entity';
import { SharePostsController } from './share-posts.controller';
import { SharePostsService } from './share-posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([SharePost])],
  controllers: [SharePostsController],
  providers: [SharePostsService],
})
export class SharePostsModule {}
