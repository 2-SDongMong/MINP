import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { IsNull, LessThan, LessThanOrEqual, Repository } from 'typeorm';
import { Post, PostCategoryType } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>
  ) {}

  private logger = new Logger('PostsService');

  // 커서 페이지네이션
  async getPostsByCursor(endCursor?: number) {
    console.log('endCursor', endCursor);
    const isFirstPage = !endCursor;
    const [posts, total] = await this.postsRepository.findAndCount({
      take: 7 + 1,
      where: !isFirstPage ? { post_id: LessThanOrEqual(endCursor) } : null,
      relations: {
        user: {},
      },
      select: {
        user: {
          nickname: true,
        },
      },
      order: {
        post_id: 'DESC',
      },
    });

    // FIXME: 앞뒤 페이지 호출 시 이용할 것.
    const take = 7;

    console.log('POST, ', posts);

    // 호출한 7개 중 마지막 인덱스를 newEndCursor로 삼는다. 다음 페이지를
    // 불러올 떄 이 newEndCursor보다 작은 인덱스 7개를 호출하게 된다.
    // 7개를 채우지 못하고 반환된 경우 newEndCursor는 false가 된다.
    let newEndCursor = posts[posts.length - 1]?.post_id ?? false;

    let startCursor = posts[0]?.post_id ?? false;
    let hasPreviousPage = isFirstPage ? false : total >= take;
    let hasNextPage = hasPreviousPage ? posts.length > take : true;

    // FIXME: 앞뒤 페이지 호출 시 이용할 것.
    const takePosts = posts.slice(0, 7);

    console.log('takePosts, ', takePosts);

    console.log('total, ', total);
    console.log('hasPreviousPage, ', hasPreviousPage);
    console.log('hasNextPage, ', hasNextPage);

    return {
      data: takePosts,
      pageOpt: {
        total,
        take,
        endCursor: newEndCursor,
        startCursor,
        hasNextPage,
        hasPreviousPage,
      },
    };
  }

  // 오프셋 페이지네이션
  async getPosts(page: number = 1) {
    const take = 7;

    const total = await this.postsRepository.count();
    const posts = await this.postsRepository.find({
      relations: {
        user: {},
      },
      select: {
        user: {
          nickname: true,
        },
      },
      order: {
        updated_at: 'DESC',
      },
      take,
      skip: (page - 1) * take,
    });

    const last_Page = Math.ceil(total / take);

    if (last_Page >= page) {
      return {
        data: posts,
        meta: {
          total,
          page: page <= 0 ? (page = 1) : page,
          last_Page: last_Page,
        },
      };
    } else {
      throw new NotFoundException('해당 페이지는 존재하지 않습니다');
    }
  }

  async getPostByCategory(page: number = 1, postsCategory: PostCategoryType) {
    const take = 7;

    const total = await this.postsRepository.count({
      where: { category: postsCategory, deleted_at: null },
    });
    const posts = await this.postsRepository.find({
      relations: {
        user: {},
      },
      where: { category: postsCategory, deleted_at: null },
      select: {
        user: {
          nickname: true,
        },
      },
      order: {
        updated_at: 'DESC',
      },
      take,
      skip: (page - 1) * take,
    });

    const last_Page = Math.ceil(total / take);

    if (last_Page >= page) {
      return {
        data: posts,
        meta: {
          total,
          page: page <= 0 ? (page = 1) : page,
          last_Page: last_Page,
        },
      };
    } else {
      throw new NotFoundException('해당 페이지는 존재하지 않습니다');
    }
  }

  async getPostById(post_id: number) {
    return await this.postsRepository.find({
      where: { post_id, deleted_at: IsNull() },
      relations: {
        post_images: true,
        post_comments: {
          user: true,
        },
        user: true,
      },
      select: {
        post_images: {
          post_image_id: true,
          post_image: true,
        },
        user: {
          nickname: true,
        },
        post_id: true,
        user_id: true,
        title: true,
        category: true,
        content: true,
        post_comments: {
          post_comment_id: true,
          content: true,
          user: {
            nickname: true,
          },
          user_id: true,
          created_at: true,
        },
        created_at: true,
        updated_at: true,
      },
    });
  }

  async createPost(
    userId: number,
    title: string,
    category: PostCategoryType,
    content: string
  ) {
    const newPost = this.postsRepository.create({
      user_id: userId,
      title,
      category,
      content,
    });
    return await this.postsRepository.save(newPost);
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
