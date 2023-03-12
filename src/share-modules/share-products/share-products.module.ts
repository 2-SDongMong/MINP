import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsImage } from '../share-products-image/entities/products-image.entity';
import { ProductsImageService } from '../share-products-image/products-image.service';
import { ShareProducts } from './entities/share-products.entity';
import { ShareProductsController } from './share-products.controller';
import { ShareProductsService } from './share-products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShareProducts, ProductsImage])],
  controllers: [ShareProductsController],
  providers: [ShareProductsService, ProductsImageService],
})
export class ShareProductsModule {}
