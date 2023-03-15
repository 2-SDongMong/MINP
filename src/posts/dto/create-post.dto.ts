import { IsNumber, IsString } from 'class-validator';
import { PostCategoryType } from '../post.entity';

export class CreatePostDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly category: PostCategoryType;

  @IsString()
  readonly content?: string;

  @IsNumber()
  readonly user_id: number;
}
