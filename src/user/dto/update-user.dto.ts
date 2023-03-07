import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
//해시화된 리프레쉬토큰 저장
export class UpdateUserDto extends PartialType(CreateUserDto) {
  id?: number;
  hashdRt: string;
}