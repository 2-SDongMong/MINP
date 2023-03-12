import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from 'src/s3/s3.moudule';
import { ProductsCategory } from '../share-products-category/entities/products-category.entity';
import { ProductsImage } from '../share-products-image/entities/products-image.entity';
import { ShareProducts } from './entities/share-products.entity';
import { ShareProductsController } from './share-products.controller';
import { ShareProductsService } from './share-products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShareProducts, ProductsCategory, ProductsImage]),
    S3Module,
  ],
  controllers: [ShareProductsController],
  providers: [ShareProductsService],
})
export class ShareProductsModule {}
