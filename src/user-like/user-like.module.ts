import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLike } from './user-like.entity';
import { UserLikeController } from './user-like.controller';
import { UserLikeService } from './user-like.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserLike])],
  controllers: [UserLikeController],
  providers: [UserLikeService],
})
export class UserLikeModule {}
