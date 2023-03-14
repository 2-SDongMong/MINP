import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProductsDto } from './dto/create-share-products.dto';
import { UpdateProductsDto } from './dto/update-share-products.dto';
import { ProductsService } from './share-products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productsService.findOne(id);
  }

  @Post()
  async createProduct(@Body() createProductsDto: CreateProductsDto) {
    return await this.productsService.create(createProductsDto);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductsDto: UpdateProductsDto
  ) {
    await this.productsService.checkTrade(id);
    return await this.productsService.update(id, updateProductsDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productsService.delete(id);
  }
}
