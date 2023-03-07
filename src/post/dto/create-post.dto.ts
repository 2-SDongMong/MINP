import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  readonly category: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly content?: string;
}
