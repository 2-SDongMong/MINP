import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductCategoryDto } from './dto/create-share-product-category.dto';
import { ProductCategory } from './entities/product-category.entity';

@Injectable()
export class ProductsCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async create(
    createProductCategoryDto: CreateProductCategoryDto,
  ): Promise<ProductCategory> {
    const newProductCategory = this.productCategoryRepository.create(
      createProductCategoryDto,
    );
    return await this.productCategoryRepository.save(newProductCategory);
  }

  async findAll(): Promise<ProductCategory[]> {
    return await this.productCategoryRepository.find();
  }
}
