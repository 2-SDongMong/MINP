import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsCategoryDto } from './dto/share-product-category.dto';
import { ProductsCategory } from './entities/products-category.entity';
import { ProductsCategoryService } from './products-category.service';

@Controller('productsCategory')
export class ProductsCategoryController {
  constructor(
    private readonly productsCategoryService: ProductsCategoryService
  ) {}

  @Post()
  async create(
    @Body() productsCategoryDto: ProductsCategoryDto
  ): Promise<ProductsCategory> {
    return await this.productsCategoryService.create(productsCategoryDto);
  }

  @Get()
  async findAll(): Promise<ProductsCategory[]> {
    return await this.productsCategoryService.findAll();
  }
}
