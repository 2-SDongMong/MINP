import { IsString, IsDateString } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  readonly detail: string;

  @IsDateString()
  readonly reserved_time: Date;
}
