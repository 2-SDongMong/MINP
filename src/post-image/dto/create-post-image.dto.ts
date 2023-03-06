import { IsString } from 'class-validator';

export class CreatePostImageDto {
  @IsString()
  readonly post_image: string;
}
