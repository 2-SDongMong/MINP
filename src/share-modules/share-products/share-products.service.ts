import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsTradeLocation } from '../share-products-trade-location/entities/products-trade-location.entity';
import { Products } from './entities/share-products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(ProductsTradeLocation)
    private readonly productsTradeLocationRepository: Repository<ProductsTradeLocation>
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
    console.log('createProductsDto:', createProductsDto);
    const {
      title,
      description,
      city,
      cityDetail,
      productsCategoryId,
      imageUrl,
    } = createProductsDto;

    // 데이터 유효성 검증
    if (
      !title ||
      !description ||
      !city || // 변경됨
      !cityDetail || // 변경됨
      !productsCategoryId
    ) {
      console.error('Invalid data:', createProductsDto);
      throw new UnprocessableEntityException('Invalid product data');
    }
    // productsTradeLocation 객체 생성 및 저장
    const newProductsTradeLocation =
      this.productsTradeLocationRepository.create({
        city,
        cityDetail,
      });
    console.log('newProductsTradeLocation:', newProductsTradeLocation);
    const savedProductsTradeLocation =
      await this.productsTradeLocationRepository.save(newProductsTradeLocation);
    console.log('savedProductsTradeLocation:', savedProductsTradeLocation);

    // 조회하여 저장된 값을 확인
    const loadedProductsTradeLocation =
      await this.productsTradeLocationRepository.findOne({
        where: { id: savedProductsTradeLocation.id },
      });
    console.log('loadedProductsTradeLocation:', loadedProductsTradeLocation);

    // 저장된 productsTradeLocation의 ID를 사용하여 products 객체 생성 및 저장
    const result = await this.productsRepository.save({
      title,
      description,
      productsTradeLocation: savedProductsTradeLocation,
      productsCategory: { id: productsCategoryId },
      imageUrl, // imageUrl 추가
    });
    console.log('result:', result);
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
