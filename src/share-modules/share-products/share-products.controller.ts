import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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

  @Get('/user/:userId')
  async getProductsByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return await this.productsService.findProductsByUserId(userId);
  }

  // products.controller.ts
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductsDto
  ) {
    if (file) {
      const folder = 'product_images';
      const imageUrl = await this.awsService.uploadFileToS3(folder, file);
      createProductDto.imageUrl = imageUrl;
    }

    // ProductsTradeLocation 객체를 생성하고 city와 cityDetail을 설정합니다.
    const productsTradeLocation = new ProductsTradeLocation();
    productsTradeLocation.latitude =
      createProductDto.productsTradeLocation.latitude;
    productsTradeLocation.longitude =
      createProductDto.productsTradeLocation.longitude;

    createProductDto.productsTradeLocation = productsTradeLocation;

    return await this.productsService.create(createProductDto);
  }

  @Post('imageUpload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: UpdateProductsDto
  ) {
    try {
      const folder = 'cat_images';
      const imageUrl = await this.awsService.uploadFileToS3(folder, file);
      return { url: imageUrl };
    } catch (err) {
      console.log(err);
    }
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateProduct(
    @Param('id') id: string,
    @Body('') updateProductsDto: UpdateProductsDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file) {
      const folder = 'product_images';
      const imageUrl = await this.awsService.uploadFileToS3(folder, file);
      updateProductsDto.imageUrl = imageUrl;
    }

    const { productsCategoryId, ...products } = updateProductsDto;

    const updateData = {
      ...products,
      productsCategory: productsCategoryId
        ? { id: productsCategoryId }
        : undefined,
    };

    const result = await this.productsService.update(id, updateData);

    return result;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productsService.delete(id);
  }
}
