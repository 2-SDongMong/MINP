import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-share-product-category.dto';
import { ProductCategory } from './entities/product-category.entity';
import { ProductsCategoryService } from './products-category.service';

@Controller('products-category')
export class ProductsCategoryController {
  constructor(
    private readonly productsCategoryService: ProductsCategoryService
  ) {}

  @Post()
  async create(
    @Body() createProductCategoryDto: CreateProductCategoryDto
  ): Promise<ProductCategory> {
    return await this.productsCategoryService.create(createProductCategoryDto);
  }

  @Get()
  async findAll(): Promise<ProductCategory[]> {
    return await this.productsCategoryService.findAll();
  }
}
