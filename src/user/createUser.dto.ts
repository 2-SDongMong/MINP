import { IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsNumber()
  readonly password: number;

  nickname: string;
  password: string;
  name: string;
  email: string;
  address: string;
  phone_number: string;
  status: number;
  referral_code: string;
}
