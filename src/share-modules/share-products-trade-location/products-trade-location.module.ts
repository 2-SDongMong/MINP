import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsTradeLocation } from './entities/products-trade-location.entity';
import { ProductsTradeLocationService } from './products-trade-location.service';
import { ProductsTradeLocationController } from './products-trade-location.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsTradeLocation])],
  providers: [ProductsTradeLocationService],
  controllers: [ProductsTradeLocationController],
  exports: [ProductsTradeLocationService],
})
export class ProductsTradeLocationModule {}
