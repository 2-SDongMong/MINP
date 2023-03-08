import { Body, Controller, Post } from '@nestjs/common';
import { CreateShareProductsCategoryDto } from './dto/share-producs-category.dto';
import { ShareProductsCategory } from './entities/share-products-category.entity';
import { ShareProductsCategoryService } from './share-products-category.service';

@Controller()
export class ShareProductsCategoryController {
  constructor(
    private readonly shareProductsCategoryService: ShareProductsCategoryService,
  ) {}

  @Post()
  async create(
    @Body() createShareProductsCategoryDto: CreateShareProductsCategoryDto,
  ): Promise<ShareProductsCategory> {
    return await this.shareProductsCategoryService.create(
      createShareProductsCategoryDto,
    );
  }
}
