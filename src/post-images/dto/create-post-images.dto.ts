import { IsArray } from 'class-validator';

// 사진 여러장 한꺼번에 등록
export class CreatePostImagesDto {
  @IsArray()
  readonly post_images: string[];
}
