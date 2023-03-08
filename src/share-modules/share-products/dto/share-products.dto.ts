import { IsString } from 'class-validator';

export class CreateShareProductDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;
}
