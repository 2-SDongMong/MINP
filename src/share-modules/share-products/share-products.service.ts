import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { ProductsTradeLocation } from '../share-products-trade-location/entities/products-trade-location.entity';
import { Products } from './entities/share-products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(ProductsTradeLocation)
    private readonly productsTradeLocationRepository: Repository<ProductsTradeLocation>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async findAll() {
    return await this.productsRepository.find({
      relations: ['productsTradeLocation', 'productsCategory'],
    });
  }

  async findOne(id) {
    return await this.productsRepository.findOne({
      where: { id },
      relations: ['user', 'productsTradeLocation', 'productsCategory'],
    });
  }

  async findProductsByUserId(userId: number) {
    return await this.productsRepository.find({
      where: { user: { user_id: userId } },
      relations: ['user', 'productsTradeLocation', 'productsCategory'],
    });
  }

  // ProductsService

  async create(createProductsDto) {
    const {
      title,
      description,
      latitude,
      longitude,
      productsCategoryId,
      imageUrl,
      userId,
    } = createProductsDto;

    // 데이터 유효성 검증
    if (
      !title ||
      !description ||
      !latitude || // 변경됨
      !longitude || // 변경됨
      !productsCategoryId ||
      !userId
    ) {
      console.error('Invalid data:', createProductsDto);
      throw new UnprocessableEntityException('Invalid product data');
    }

    // productsTradeLocation 객체 생성 및 저장
    const newProductsTradeLocation =
      this.productsTradeLocationRepository.create({
        latitude,
        longitude,
      });
    const savedProductsTradeLocation =
      await this.productsTradeLocationRepository.save(newProductsTradeLocation);

    // 조회하여 저장된 값을 확인
    const loadedProductsTradeLocation =
      await this.productsTradeLocationRepository.findOne({
        where: { id: savedProductsTradeLocation.id },
      });

    // user 객체 생성 및 저장
    const user = await this.usersRepository.findOne({
      where: { user_id: userId },
    });

    // 저장된 productsTradeLocation의 ID를 사용하여 products 객체 생성 및 저장
    const result = await this.productsRepository.save({
      title,
      description,
      productsTradeLocation: savedProductsTradeLocation,
      productsCategory: { id: productsCategoryId },
      imageUrl,
      user, // user 객체로 수정
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

  async checkTrade(id: string) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (product.tradeStatus === '나눔완료') {
      // 거래가 완료된 상품인지 확인합니다.
      throw new UnprocessableEntityException('This product is already traded');
    }
  }

  async delete(id) {
    const result = await this.productsRepository.delete(id);
    return result.affected > 0;
  }
}
