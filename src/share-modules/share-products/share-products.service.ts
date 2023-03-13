import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShareProductDto } from './dto/create-share-products.dto';
import { ShareProducts } from './entities/share-products.entity';

@Injectable()
export class ShareProductsService {
  constructor(
    @InjectRepository(ShareProducts)
    private readonly shareProductsRepository: Repository<ShareProducts>
  ) {}

  async findAll(): Promise<ShareProducts[]> {
    return await this.shareProductsRepository.find({
      relations: ['productsCategory'],
    });
  }

  async findEach({ id }) {
    return await this.shareProductsRepository.findOne({
      where: { id },
      relations: ['productsCategory'],
    });
  }

  async createShare(createProductDto: CreateShareProductDto) {
    const { productsCategoryId, ...shareProducts } = createProductDto;

    const result = await this.shareProductsRepository.save({
      ...shareProducts,
      productsCategory: { id: productsCategoryId },
    });

    return result;
  }

  async update({ id, updateShareProductDto }) {
    const myproduct = await this.shareProductsRepository.findOne({
      where: { id },
    });

    const newProduct = {
      ...myproduct,
      id,
      ...updateShareProductDto,
    };

    return await this.shareProductsRepository.save(newProduct);
  }
  async checkTradeOut({ id }) {
    const product = await this.shareProductsRepository.findOne({
      where: { id },
    });
    if (product.isTrade)
      throw new UnprocessableEntityException('이미 거래가 완료된 상품입니다.');
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.shareProductsRepository.delete({ id });
    return result.affected > 0;
  }
}
