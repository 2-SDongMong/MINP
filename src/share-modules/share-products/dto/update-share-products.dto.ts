import { PartialType } from '@nestjs/mapped-types';
import { CreateShareProductDto } from './create-share-products.dto';

export class UpdateShareProductDto extends PartialType(CreateShareProductDto) {}
