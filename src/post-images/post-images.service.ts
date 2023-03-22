import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostImageDto } from './dto/create-post-image.dto';
import { CreatePostImagesDto } from './dto/create-post-images.dto';
import { PostImage } from './post-image.entity';

@Injectable()
export class PostImagesService {
  constructor(
    @InjectRepository(PostImage)
    private postImagesRepository: Repository<PostImage>
  ) {}

  async createImages(postId: number, data: CreatePostImagesDto) {
    const { post_images } = data;
    for (let i = 0; i < post_images.length; i++) {
      await this.postImagesRepository.insert({
        post_id: postId,
        post_image: post_images[i],
      });
    }
    return post_images.length;
  }

  async getImagesByPostId(postId: number) {
    return await this.postImagesRepository.find({
      where: { post_id: postId },
    });
  }
}
