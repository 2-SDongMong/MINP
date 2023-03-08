import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

export class DeletePostDto extends PartialType(CreatePostDto) {}

