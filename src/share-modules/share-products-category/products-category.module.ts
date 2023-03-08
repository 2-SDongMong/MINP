import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { ProductsCategoryController } from './products-category.controller';
import { ProductsCategoryService } from './products-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  controllers: [ProductsCategoryController],
  providers: [ProductsCategoryService],
})
export class ShareProductsCategoryModule {}
