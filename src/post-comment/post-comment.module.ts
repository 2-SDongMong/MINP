import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostComment } from './post-comment.entity';
import { PostCommentController } from './post-comment.controller';
import { PostCommentService } from './post-comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostComment])],
  controllers: [PostCommentController],
  providers: [PostCommentService],
})
export class PostCommentModule {}
