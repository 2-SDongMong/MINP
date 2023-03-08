import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostComment } from './post-comment.entity';
import { PostCommentsController } from './post-comments.controller';
import { PostCommentsService } from './post-comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostComment])],
  controllers: [PostCommentsController],
  providers: [PostCommentsService],
})
export class PostCommentsModule {}
