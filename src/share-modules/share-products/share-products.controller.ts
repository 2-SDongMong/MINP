import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateShareProductDto } from './dto/share-products.dto';
import { ShareProducts } from './entities/share-products.entity';
import { ShareProductsService } from './share-products.service';

@Controller('share-products')
export class ShareProductsController {
  constructor(private readonly shareProductsService: ShareProductsService) {}

  @Get()
  async findAll(): Promise<ShareProducts[]> {
    return await this.shareProductsService.findAll();
  }

  @Post()
  async create(
    @Body() createShareProductDto: CreateShareProductDto,
  ): Promise<ShareProducts> {
    return await this.shareProductsService.create(createShareProductDto);
  }
}
