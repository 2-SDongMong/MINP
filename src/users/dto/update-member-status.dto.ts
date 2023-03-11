import { PartialType } from '@nestjs/mapped-types';
import { IsEnum } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateMemberDto extends PartialType(CreateUserDto) {
  // 회원가입할 때 status가 없음....;; CreateUserDto 여기서 받아올 수 없음
  // @IsEnum()
  // readonly status: string;
}