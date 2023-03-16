import { Controller, Post, Body } from '@nestjs/common';

import { ProductsTradeLocationDto } from './dto/products-trade-location.dto';
import { ProductsTradeLocationService } from './products-trade-location.service';

@Controller('products-trade-location')
export class ProductsTradeLocationController {
  constructor(
    private readonly productsTradeLocationService: ProductsTradeLocationService
  ) {}

  @Post()
  async create(@Body() productsTradeLocationDto: ProductsTradeLocationDto) {
    return await this.productsTradeLocationService.create(
      productsTradeLocationDto
    );
  }
}
