import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly nickname: string;
  @IsString()
  readonly name: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly address_road: string;
  @IsString()
  readonly address_bname: string;
  @IsString()
  readonly phone_number: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly referral_code?: string;
}
