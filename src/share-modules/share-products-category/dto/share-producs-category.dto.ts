import { IsString } from 'class-validator';

export class CreateShareProductsCategoryDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;
}
