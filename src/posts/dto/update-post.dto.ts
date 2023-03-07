import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

export class UpdateRequestDto extends PartialType(CreatePostDto) {}
