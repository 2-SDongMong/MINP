import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProductsCategoryDto {
  @ApiProperty({ example: 'ㅇㅇㅇㅇ', description: '상품카테고리설명' })
  @IsNotEmpty()
  name: string;
}
