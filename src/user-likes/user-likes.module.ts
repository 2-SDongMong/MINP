import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLike } from './user-like.entity';
import { UserLikesController } from './user-likes.controller';
import { UserLikesService } from './user-likes.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserLike])],
  controllers: [UserLikesController],
  providers: [UserLikesService],
})
export class UserLikesModule {}
