import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductsCategoryDto } from './dto/create-share-products-category.dto';
import { ProductsCategory } from './entities/products-category.entity';
import { ProductsCategoryService } from './products-category.service';

@Controller('products-category')
export class ProductsCategoryController {
  constructor(
    private readonly productsCategoryService: ProductsCategoryService
  ) {}

  @Post()
  async create(
    @Body() createProductsCategoryDto: CreateProductsCategoryDto
  ): Promise<ProductsCategory> {
    return await this.productsCategoryService.create(createProductsCategoryDto);
  }

  @Get()
  async findAll(): Promise<ProductsCategory[]> {
    return await this.productsCategoryService.findAll();
  }
}
