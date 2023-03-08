import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatLike } from './cat-like.entity';
import { CatLikesController } from './cat-likes.controller';
import { CatLikesService } from './cat-likes.service';

@Module({
  imports: [TypeOrmModule.forFeature([CatLike])],
  controllers: [CatLikesController],
  providers: [CatLikesService],
})
export class CatLikesModule {}
