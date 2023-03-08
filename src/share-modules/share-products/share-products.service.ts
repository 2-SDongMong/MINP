import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShareProductDto } from './dto/create-share-products.dto';
import { ShareProducts } from './entities/share-products.entity';

@Injectable()
export class ShareProductsService {
  constructor(
    @InjectRepository(ShareProducts)
    private readonly shareProductsRepository: Repository<ShareProducts>,
  ) {}

  async findAll(): Promise<ShareProducts[]> {
    return await this.shareProductsRepository.find();
  }

  async findEach(productId) {
    return await this.shareProductsRepository.findOne({
      where: { id: productId },
    });
  }

  async createShare(
    createShareProductDto: CreateShareProductDto,
  ): Promise<ShareProducts> {
    const newShareProduct = this.shareProductsRepository.create(
      createShareProductDto,
    );
    return await this.shareProductsRepository.save(newShareProduct);
  }
  async update({ productId, updateShareProductDto }) {
    const myproduct = await this.shareProductsRepository.findOne({
      where: { id: productId },
    });

    const newProduct = {
      ...myproduct,
      id: productId,
      ...updateShareProductDto,
    };

    return await this.shareProductsRepository.save(newProduct);
  }
}
