import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Render,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from 'src/s3-upload/aws.service';
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
    // Upload the image to S3 and get the image URL
    const folder = 'product_images'; // replace with your desired folder name
    const imageUrl = await this.awsService.uploadFileToS3(folder, file);
    console.log('imageUrl:', imageUrl);

    // Add the image URL to the product data
    createProductDto.imageUrl = imageUrl;

    // Save the product with the image URL
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
