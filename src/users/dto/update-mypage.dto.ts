import { PartialType} from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateMypageDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  nickname: string;

  address?: string;

  phone_number?: string;
}
