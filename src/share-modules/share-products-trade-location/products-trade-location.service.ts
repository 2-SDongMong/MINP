import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsTradeLocation } from './entities/products-trade-location.entity';
import { ProductsTradeLocationDto } from './dto/products-trade-location.dto';

@Injectable()
export class ProductsTradeLocationService {
  constructor(
    @InjectRepository(ProductsTradeLocation)
    private readonly productsTradeLocationRepository: Repository<ProductsTradeLocation>
  ) {}

  async create(
    productsTradeLocationDto: ProductsTradeLocationDto
  ): Promise<ProductsTradeLocation> {
    const newProductsTradeLocation =
      this.productsTradeLocationRepository.create(productsTradeLocationDto);
    return await this.productsTradeLocationRepository.save(
      newProductsTradeLocation
    );
  }
}
