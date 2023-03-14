import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, PaginationOptions } from 'src/util/pagiante';
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
    const { title, description, productsTradeLocation, productsCategoryId } =
      createProductsDto;

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

  async list(options: PaginationOptions): Promise<Pagination<Products>> {
    const { take, page } = options;
    const [results, total] = await this.productsRepository.findAndCount({
      select: ['id', 'title'],
      take: take,
      skip: take * (page - 1),
      order: { createdAt: 'DESC' },
    });
    return new Pagination({
      results,
      total,
      currentPage: page,
    });
  }
}
