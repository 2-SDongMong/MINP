import { IsNumber, IsString, IsBoolean } from 'class-validator';

export class CreateCatDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly age?: number;

  @IsString()
  readonly gender: string;

  @IsBoolean()
  readonly neutered: boolean;

  @IsString()
  image: string;

  @IsString()
  readonly character?: string;
}
