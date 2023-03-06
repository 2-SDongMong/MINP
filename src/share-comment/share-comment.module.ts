import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareComment } from './share-comment.entity';
import { ShareCommentController } from './share-comment.controller';
import { ShareCommentService } from './share-comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShareComment])],
  controllers: [ShareCommentController],
  providers: [ShareCommentService],
})
export class ShareCommentModule {}
