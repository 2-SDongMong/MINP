import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductsCategoryDto } from './dto/create-share-products-category.dto';
import { ProductsCategory } from './entities/products-category.entity';

@Injectable()
export class ProductsCategoryService {
  constructor(
    @InjectRepository(ProductsCategory)
    private readonly productsCategoryRepository: Repository<ProductsCategory>
  ) {}

  async create(
    createProductsCategoryDto: CreateProductsCategoryDto
  ): Promise<ProductsCategory> {
    const newProductCategory = this.productsCategoryRepository.create(
      createProductsCategoryDto
    );
    return await this.productsCategoryRepository.save(newProductCategory);
  }

  async findAll(): Promise<ProductsCategory[]> {
    return await this.productsCategoryRepository.find();
  }
}
