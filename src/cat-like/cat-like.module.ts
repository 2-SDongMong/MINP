import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatLike } from './cat-like.entity';
import { CatLikeController } from './cat-like.controller';
import { CatLikeService } from './cat-like.service';

@Module({
  imports: [TypeOrmModule.forFeature([CatLike])],
  controllers: [CatLikeController],
  providers: [CatLikeService],
})
export class CatLikeModule {}
