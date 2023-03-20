import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateMypageDto extends PartialType(CreateUserDto) {
  nickname?: string;
  address_road?: string;
  address_bname?: string;
  phone_number?: string;
  password?: string;
}
