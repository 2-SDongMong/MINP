import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
//import { UsersService } from 'src/users/users.service';
import { IsNull, Not, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post, PostCategoryType } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>
  ) {}

  private logger = new Logger('PostsService');

  async getPosts(page: number = 1) {
    this.logger.debug(`getPosts()`);

    const take = 3;

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
          page,
          last_Page: Math.ceil(total / take),
        }
      }
    } else {
        throw new NotFoundException('해당 페이지는 존재하지 않습니다')
    }  

    // 수정전2
    // return await this.postsRepository.find({
    //   //where: { deleted_at: null },
    //   relations: {
    //     user: {
    //       cats: true,
    //     },
    //   },
    //   select: {
    //     user: {
    //       user_id: true,
    //       nickname: true,
    //     },
    //     post_id: true,
    //     title: true,
    //     category: true,
    //     content: true,
    //     created_at: true,
      // },

      // 수정 전1
      // select: [
      //   'user_id',
      //   'post_id',
      //   'title',
      //   'category',
      //   'content',
      //   'created_at',
      // ],
    // });
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
      // 조건확인으로 IsNull() 을 사용해도 될까? -> 일단 사용
      where: { user_id: Not(IsNull()), post_id, deleted_at: IsNull() },
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
    // data: CreatePostDto,
    // usersService: UsersService,
  ) {

    this.postsRepository.insert({
      user_id: userId,
      title,
      category,
      content,
    });

    // this.postsRepository.insert({
    //   //user_id: userId,
    //   data,
    //   usersService,
    // });
  }

  async updatePost(
    id: number,
    title: string,
    category: PostCategoryType,
    content: string
  ) {
    // await this.checkPassword(id, password); // 이건 비밀번호를 검증하는 기능.. 우린 아이디 비교를 해야한다.

    // 현재 아이디를 비교하는 방법..
    // user_id 가 null 이 아니고, 글에 작성된 id와 현재 로그인된 id가 같다면
    if (id === id) {
      this.postsRepository.update(id, { title, category, content });
    }
  }

  async deletePost(id: number) {
    //await this.checkPassword(id, password);

    // 게시글을 작성한 유저 본인이 맞는 경우, 해당 Post 테이블에서 deletedAt 항목을 ‘null’에서 ‘삭제처리한 datetime’으로 수정
    this.postsRepository.softDelete(id);
  }

  // user_id 가 null 이 아니고, 글에 작성된 id와 현재 로그인된 id가 같은지 검증하는 함수 구현

  // private async checkPassword(id: number, password: number) {
  //   const post = await this.postRepository.findOne({
  //     where: { id, deletedAt: null },
  //     select: ["password"],
  //   });
  //   if (_.isNil(post)) {
  //     throw new NotFoundException(`post not found. id: ${id}`);
  //   }

  //   if (post.password !== password.toString()) {
  //     throw new UnauthorizedException(
  //       `post password is not correct. id: ${id}`
  //     );
  //   }
  // }
}
