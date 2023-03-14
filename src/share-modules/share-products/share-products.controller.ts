import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Render,
} from '@nestjs/common';
import { PaginationOptions } from 'src/util/pagiante';
import { CreateProductsDto } from './dto/create-share-products.dto';
import { UpdateProductsDto } from './dto/update-share-products.dto';
import { Products } from './entities/share-products.entity';
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

  @Get()
  async list(@Query('page') page = 1): Promise<{
    products: Products[];
    currentPage: number;
    totalPages: number;
  }> {
    const options: PaginationOptions = {
      take: 10, // limit to 10 results per page
      page: +page, // show the requested page
    };
    const result = await this.productsService.list(options);
    const { results: products, currentPage, totalPages } = result;
    return { products, currentPage, totalPages };
  }
}
