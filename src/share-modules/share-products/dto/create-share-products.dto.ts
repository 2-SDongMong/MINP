import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ProductsCategoryDto } from 'src/share-modules/share-products-category/dto/share-product-category.dto';
import { ProductsTradeLocationDto } from 'src/share-modules/share-products-trade-location/dto/products-trade-location.dto';

export class CreateProductsDto {
  @ApiProperty({ example: '상품 이름', description: '상품 이름' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '상품 설명', description: '상품 설명' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: ProductsCategoryDto,
    example: '516e5f13-7bde-43c2-ad0a-96cc826ac518',
    description: '상품 카테고리 ID',
    required: false, // 선택적 필드로 변경
  })
  @IsString()
  productsCategoryId?: string;

  @ApiProperty({
    type: ProductsTradeLocationDto,
    example: { city: 'Seoul', cityDetail: 'mapo' },
    description: '판매 지역 정보',
  })
  @IsNotEmpty()
  productsTradeLocation: ProductsTradeLocationDto;
}
