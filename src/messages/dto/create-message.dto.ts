import { IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  readonly recipient_id: number;

  @IsString()
  readonly content: string;
}
