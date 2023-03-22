import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean } from 'class-validator';
import { CreateRequestDto } from './create-request.dto';

export class UpdateRequestDto extends PartialType(CreateRequestDto) {
  // FIXME: 수정 요청시 이 부분 떄문에 에러가 남. ("is_onging must be boolean")
  @IsBoolean()
  readonly is_ongoing?: boolean;
}
