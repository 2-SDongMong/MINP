import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateShareProductDto } from './dto/create-share-products.dto';
import { UpdateShareProductDto } from './dto/update-share-products.dto';
import { ShareProducts } from './entities/share-products.entity';
import { ShareProductsService } from './share-products.service';

@Controller('share-products')
export class ShareProductsController {
  constructor(private readonly shareProductsService: ShareProductsService) {}

  @Get()
  async findAll(): Promise<ShareProducts[]> {
    return await this.shareProductsService.findAll();
  }

  @Get(':productId')
  async findEach(
    @Param('productId') productId: string
  ): Promise<ShareProducts> {
    return await this.shareProductsService.findEach(productId);
  }

  @Post()
  async createShare(
    @Body() createShareProductDto: CreateShareProductDto
  ): Promise<ShareProducts> {
    return await this.shareProductsService.createShare(createShareProductDto);
  }

  @Patch(':productId')
  async updateShare(
    @Param('productId') productId: string,
    @Body() updateShareProductDto: UpdateShareProductDto
  ) {
    await this.shareProductsService.checkTradeOut({ productId });
    return await this.shareProductsService.update({
      productId,
      updateShareProductDto,
    });
  }
  @Delete('/products/:id')
  deleteProductById(@Param('id') id: string) {
    return this.shareProductsService.deleteById(id);
  }
}
