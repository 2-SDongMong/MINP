import { PartialType} from '@nestjs/mapped-types';
import { IsBoolean } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateMypageDto extends PartialType(CreateUserDto) {
  nickname?: string;
  address_road?: string;

  address_bname?: string;
  @IsBoolean()
  address_certified?: boolean;

  phone_number?: string;
}
