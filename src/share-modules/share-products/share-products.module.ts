import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/share-products.entity';
import { ProductsController } from './share-products.controller';
import { ProductsService } from './share-products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ShareProductsModule {}
