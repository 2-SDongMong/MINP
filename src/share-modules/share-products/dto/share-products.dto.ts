import { IsString } from 'class-validator';

export class CreateShareProductsCategoryDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;
}
