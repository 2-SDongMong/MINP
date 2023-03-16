import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { IsNull, Not, Repository } from 'typeorm';
import { Post, PostCategoryType } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>
  ) {}

  private logger = new Logger('PostsService');

  async getPosts(page: number = 1) {
    this.logger.debug(`getPosts()`);

    // 페이지네이션 
    const take = 10;

    const [posts, total] = await this.postsRepository.findAndCount({
      take,
      skip: (page - 1) * take, 
    });

    const last_Page = Math.ceil(total/take);

    if (last_Page >= page) {
      return {
        data: posts,
        meta: {
          total,
          page: page <=0 ? page = 1 : page,
          last_Page: last_Page,
        }
      }
    } else {
        throw new NotFoundException('해당 페이지는 존재하지 않습니다')
    }  
  }

  async getPostByCategory(postsCategory: PostCategoryType) {
    return await this.postsRepository.find({
      where: { category: postsCategory, deleted_at: null },
      select: [
        'user_id',
        'title',
        'category',
        'content',
        'created_at',
        'updated_at',
      ],
    });
  }

  async getPostById(post_id: number) {
    return await this.postsRepository.findOne({
      where: { post_id, deleted_at: IsNull() },
      select: [
        'user_id',
        'title',
        'category',
        'content',
        'created_at',
        'updated_at',
      ],
    });
  }

  createPost(
    userId: number,
    title: string,
    category: PostCategoryType,
    content: string
  ) {

    this.postsRepository.insert({
      user_id: userId,
      title,
      category,
      content,
    });
  }

  async updatePost(
    userId: number,
    id: number,
    title: string,
    category: PostCategoryType,
    content: string
  ) {
    const post = await this._existenceCheckById(id);
    this._authorCheckByUserId(post.user_id, userId);

    this.postsRepository.update(id, { title, category, content });
  }

  async deletePost(userId: number, postId: number) {
    const post = await this._existenceCheckById(postId);
    this._authorCheckByUserId(post.user_id, userId);
    this.postsRepository.softDelete(postId);
  }


  private async _existenceCheckById(id: number) {
    const post = await this.postsRepository.findOne({
      where: { post_id: id },
    });
    if (_.isNil(post)) {
      throw new NotFoundException(`Post article not found. id: ${id}`);
    }
    return post;
  }

  private async _authorCheckByUserId(authorId: number, userId: number) {
    if (authorId !== userId) {
      throw new UnauthorizedException(
        `Unauthorized. user id: ${userId} not match with author id: ${authorId}`
      );
    }
  }
}
