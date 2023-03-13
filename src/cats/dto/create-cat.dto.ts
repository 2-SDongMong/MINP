import { IsBoolean, IsNumber, IsString } from "@nestjs/class-validator";

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
  readonly image: string;

  @IsString()
  readonly character?: string;
}
