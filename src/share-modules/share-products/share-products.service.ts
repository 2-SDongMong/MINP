import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './entities/share-products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>
  ) {}

  async findAll() {
    return await this.productsRepository.find({
      relations: ['productsTradeLocation', 'productsCategory'],
    });
  }

  async findOne(id) {
    return await this.productsRepository.findOne({
      where: { id },
      relations: ['productsTradeLocation', 'productsCategory'],
    });
  }

  async create(createProductsDto) {
    const {
      title,
      description,
      productsTradeLocation,
      productsCategoryId,
      imageUrl,
    } = createProductsDto;

    // 데이터 유효성 검증
    if (
      !title ||
      !description ||
      !productsTradeLocation ||
      !productsCategoryId
    ) {
      throw new UnprocessableEntityException('Invalid product data');
    }

    const result = await this.productsRepository.save({
      title,
      description,
      productsTradeLocation: { ...productsTradeLocation },
      productsCategory: { id: productsCategoryId },
      imageUrl, // imageUrl 추가
    });

    return result;
  }

  async update(id, updateProductsDto) {
    const { productsTradeLocation, ...products } = updateProductsDto;
    const result = await this.productsRepository.update(id, {
      ...products,
      productsTradeLocation: { ...productsTradeLocation },
    });

    return result.affected > 0;
  }

  async delete(id) {
    const result = await this.productsRepository.delete(id);
    return result.affected > 0;
  }

  async checkTrade(id) {
    const products = await this.productsRepository.findOne(id);
    if (products.isTrade) {
      throw new UnprocessableEntityException(
        'This products is already trade out'
      );
    }
  }
}
