import { IsNotEmpty } from 'class-validator';

export class ProductsCategoryDto {
  @IsNotEmpty()
  name: string;
}
