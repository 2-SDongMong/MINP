import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsImage } from '../share-products-image/entities/products-image.entity';
import { ProductsImageService } from '../share-products-image/products-image.service';
import { CreateShareProductDto } from './dto/create-share-products.dto';
import { ShareProducts } from './entities/share-products.entity';

@Injectable()
export class ShareProductsService {
  constructor(
    @InjectRepository(ShareProducts)
    private readonly shareProductsRepository: Repository<ShareProducts>,
    @InjectRepository(ProductsImage)
    private readonly productsImageRepository: Repository<ProductsImage>,
    private readonly productsImageService: ProductsImageService
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
    images: Express.Multer.File[]
  ): Promise<{ product: ShareProducts; imageUrls: string[] }> {
    const newShareProduct = this.shareProductsRepository.create(
      createShareProductDto
    );
    const savedProduct = await this.shareProductsRepository.save(
      newShareProduct
    );

    // 업로드한 이미지들을 S3에 업로드하고 각 이미지의 URL을 ShareProducts 엔티티에 추가
    const imageUrls = [];
    for (const image of images) {
      const { key } = await this.productsImageService.uploadFileToS3(
        'share-products',
        image
      );
      imageUrls.push(
        `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`
      );
    }
    savedProduct.imageUrls = imageUrls;

    const updatedProduct = await this.shareProductsRepository.save(
      savedProduct
    );

    return { product: updatedProduct, imageUrls };
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
  async checkTradeOut({ productId }) {
    const product = await this.shareProductsRepository.findOne({
      where: { id: productId },
    });
    if (product.isTrade)
      throw new UnprocessableEntityException('이미 거래가 완료된 상품입니다.');
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.shareProductsRepository.delete({ id });
    return result.affected > 0;
  }
}
