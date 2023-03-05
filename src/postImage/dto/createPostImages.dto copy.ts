import { IsArray } from 'class-validator';

// 사진 여러장 한꺼번에 등록
export class CreatePostImagesDto {
  @IsArray()
  readonly post_images: string[];
}

[추가] user, sharePost, shareComment, shareImage 제외 8개 모듈 DTO 파일 생성
[추가] 총 12개 모듈 데이터베이스 Entity파일 생성 
[추가] class-validator, class- transformer 패키지 추가 (DTO 유효성 검사용)
[추가] @nestjs/mapped-types 패키지 추가 (DTO 클래스 간편 복제용)
