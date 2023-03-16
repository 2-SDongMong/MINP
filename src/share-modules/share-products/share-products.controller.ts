import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from 'src/s3-upload/aws.service';
import { ProductsTradeLocation } from '../share-products-trade-location/entities/products-trade-location.entity';
import { CreateProductsDto } from './dto/create-share-products.dto';
import { UpdateProductsDto } from './dto/update-share-products.dto';
import { ProductsService } from './share-products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly awsService: AwsService
  ) {}

  @Get()
  async getAllProducts() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productsService.findOne(id);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductsDto
  ) {
    const folder = 'product_images';
    const imageUrl = await this.awsService.uploadFileToS3(folder, file);
    createProductDto.imageUrl = imageUrl;

    // ProductsTradeLocation 객체를 생성하고 city와 cityDetail을 설정합니다.
    const productsTradeLocation = new ProductsTradeLocation();
    productsTradeLocation.city = createProductDto.productsTradeLocation.city;
    productsTradeLocation.cityDetail =
      createProductDto.productsTradeLocation.cityDetail;

    createProductDto.productsTradeLocation = productsTradeLocation;

    return await this.productsService.create(createProductDto);
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
