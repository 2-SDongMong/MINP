import { IsString, IsDate } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  readonly detail: string;

  @IsDate()
  readonly reserved_time: Date;
}
