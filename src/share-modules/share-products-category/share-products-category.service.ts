import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShareProductsCategoryDto } from './dto/share-producs-category.dto';
import { ShareProductsCategory } from './entities/share-products-category.entity';

@Injectable()
export class ShareProductsCategoryService {
  constructor(
    @InjectRepository(ShareProductsCategory)
    private readonly shareProductsCategoryRepository: Repository<ShareProductsCategory>,
  ) {}
  async create(
    createShareProductsCategoryDto: CreateShareProductsCategoryDto,
  ): Promise<ShareProductsCategory> {
    const shareProductsCategory = new ShareProductsCategory();
    shareProductsCategory.name = createShareProductsCategoryDto.name;

    return await this.shareProductsCategoryRepository.save(
      shareProductsCategory,
    );
  }
}
