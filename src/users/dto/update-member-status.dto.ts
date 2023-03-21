import { IsString } from 'class-validator';
import { UserStatusType } from '../user.entity';

export class UpdateMemberDto {
  @IsString()
  readonly status: UserStatusType;
}
