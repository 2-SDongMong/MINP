import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsCategoryDto } from './dto/share-product-category.dto';
import { ProductsCategory } from './entities/products-category.entity';

@Injectable()
export class ProductsCategoryService {
  constructor(
    @InjectRepository(ProductsCategory)
    private readonly productsCategoryRepository: Repository<ProductsCategory>
  ) {}

  async create(
    productsCategoryDto: ProductsCategoryDto
  ): Promise<ProductsCategory> {
    const newProductsCategory =
      this.productsCategoryRepository.create(productsCategoryDto);
    return await this.productsCategoryRepository.save(newProductsCategory);
  }

  async findAll(): Promise<ProductsCategory[]> {
    return await this.productsCategoryRepository.find();
  }
}
