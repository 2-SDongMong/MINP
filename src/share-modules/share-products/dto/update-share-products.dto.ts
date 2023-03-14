import { PartialType } from '@nestjs/mapped-types';
import { CreateProductsDto } from './create-share-products.dto';

export class UpdateProductsDto extends PartialType(CreateProductsDto) {
  title?: string;
  description?: string;
}
