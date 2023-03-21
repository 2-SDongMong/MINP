import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
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
    example: '3b5fe03b-d92e-4590-a896-963197965a64',
    description: '상품 카테고리 ID',
    required: false, // 선택적 필드로 변경
  })
  @IsString()
  productsCategoryId?: string;

  @ApiProperty({
    type: ProductsTradeLocationDto,
    example: { latitude: 37.3968925296743, longitude: 127.111925428711 },
    description: '판매 지역 정보',
  })
  @IsNotEmpty()
  productsTradeLocation: ProductsTradeLocationDto;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: '상품 이미지 URL',
    required: false, // 선택적 필드로 변경
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}
