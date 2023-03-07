import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareComment } from './share-comment.entity';
import { ShareCommentsController } from './share-comments.controller';
import { ShareCommentsService } from './share-comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShareComment])],
  controllers: [ShareCommentsController],
  providers: [ShareCommentsService],
})
export class ShareCommentsModule {}
