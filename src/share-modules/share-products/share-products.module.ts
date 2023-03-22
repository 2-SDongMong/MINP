import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AwsModule } from 'src/s3-upload/aws.module';
import { User } from 'src/users/user.entity';
import { ProductsTradeLocation } from '../share-products-trade-location/entities/products-trade-location.entity';

import { Products } from './entities/share-products.entity';
import { ProductsController } from './share-products.controller';
import { ProductsService } from './share-products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products, ProductsTradeLocation, User]),
    AwsModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ShareProductsModule {}
