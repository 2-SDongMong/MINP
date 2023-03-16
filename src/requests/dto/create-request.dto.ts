import { IsString, IsDateString } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  readonly detail: string;

  @IsDateString()
  readonly reserved_begin_date: Date;

  @IsDateString()
  readonly reserved_end_date: Date;
}
