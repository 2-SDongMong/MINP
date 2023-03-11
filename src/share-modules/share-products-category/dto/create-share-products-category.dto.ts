import { IsNotEmpty } from 'class-validator';

export class CreateProductsCategoryDto {
  @IsNotEmpty()
  name: string;
}
