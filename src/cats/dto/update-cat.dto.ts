import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';

export class UpdateCatDto extends PartialType(CreateCatDto) {
  age?: number;
  neutered?: boolean;
  image?: string;
  character?: string;
}

