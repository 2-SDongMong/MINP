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

  @Get(':id')
  async findEach(@Param('id') id: string): Promise<ShareProducts> {
    return await this.shareProductsService.findEach({ id });
  }

  @Post()
  async createShare(
    @Body() createShareProductDto: CreateShareProductDto
  ): Promise<ShareProducts> {
    return await this.shareProductsService.createShare(createShareProductDto);
  }

  @Patch(':id')
  async updateShare(
    @Param('id') id: string,
    @Body() updateShareProductDto: UpdateShareProductDto
  ) {
    await this.shareProductsService.checkTradeOut({ id });
    return await this.shareProductsService.update({
      id,
      updateShareProductDto,
    });
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<void> {
    await this.shareProductsService.deleteById(id);
  }
}
