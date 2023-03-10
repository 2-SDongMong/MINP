import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateMypageDto extends PartialType(CreateUserDto) {
  // 회원가입할 때 status가 없음....;; CreateUserDto 여기서 받아올 수 없음
}