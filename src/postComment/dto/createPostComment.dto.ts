import { IsString } from 'class-validator';

export class CreatePostCommentDto {
  @IsString()
  readonly content: string;
}
