import { IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  readonly content: string;

  @IsNumber()
  readonly recipient_id: number;
}
