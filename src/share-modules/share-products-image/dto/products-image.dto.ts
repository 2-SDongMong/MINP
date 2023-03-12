import { IsNotEmpty, IsString } from 'class-validator';

export class ProductsImageDto {
  @IsNotEmpty()
  @IsString()
  readonly url: string;

  @IsNotEmpty()
  @IsString()
  readonly shareProductsId: string;
}
