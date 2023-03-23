import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { ProductsTradeLocation } from '../share-products-trade-location/entities/products-trade-location.entity';
import { Products } from './entities/share-products.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(ProductsTradeLocation)
    private readonly productsTradeLocationRepository: Repository<ProductsTradeLocation>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  async findAll() {
    const value = await this.cacheManager.get(`all-share-products`);
    
    if(!value){
      const allProducts = await this.productsRepository.find({
        relations: ['productsTradeLocation', 'productsCategory'],
      });
      await this.cacheManager.set(`all-share-products`, allProducts);

      return allProducts;
    }
    return value;

  }

  async findOne(id) {
    return await this.productsRepository.findOne({
      where: { id },
      relations: ['user', 'productsTradeLocation', 'productsCategory'],
    });
  }

  async findProductsByUserId(userId: number) {
    console.log('Searching for products by userId:', userId);

    return await this.productsRepository
      .createQueryBuilder('products')
      .innerJoin('products.user', 'user', 'user.user_id = :userId', { userId })
      .leftJoinAndSelect(
        'products.productsTradeLocation',
        'productsTradeLocation'
      )
      .leftJoinAndSelect('products.productsCategory', 'productsCategory')
      .getMany();
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
    // Check if the product exists in the database
    const existingProduct = await this.productsRepository.findOne({
      where: { id },
    });
    console.log('Existing product:', existingProduct); // Add log here

    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const { productsCategoryId, ...products } = updateProductsDto;

    // Set productsCategoryId only if it is not null
    const updateData = {
      ...products,
      productsCategory: productsCategoryId
        ? { id: productsCategoryId }
        : undefined,
    };

    const result = await this.productsRepository.update(id, updateData);

    console.log('Update result:', result); // Add log here

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
