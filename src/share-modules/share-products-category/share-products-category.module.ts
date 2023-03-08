import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareProductsController } from '../share-products/share-products.controller';
import { ShareProductsService } from '../share-products/share-products.service';
import { ShareProductsCategory } from './entities/share-products-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShareProductsCategory])],
  providers: [ShareProductsController, ShareProductsService],
})
export class ShareProductsCategoryModule {}
