import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Repository } from 'typeorm';
import { Post, PostCategoryType } from './post.entity';

@Injectable()
export class PostService {
    constructor(
      @InjectRepository(Post) private postRepository: Repository<Post>
    ) { }

    //삭제예정
    private posts = [];
    private postPasswords = new Map();

    async getPosts() {
      return await this.postRepository.find({
        where: { deleted_at: null },
        select: ["user_id", "title", "category", "content", "created_at"],
      });
    }


    // 카테고리 별 조회,...
    // getPostByCategory(postCategory: string) {
    //     throw new Error('Method not implemented.');
    // }

    async getPostById(id: number) {
      return await this.postRepository.findOne({
        where: { post_id : id, deleted_at: null }, // id 왜,, 빨간줄,,,
        select: ["title", "category", "content", "created_at", "updated_at"],
      });
    }

    createPost(title: string, category: PostCategoryType, content: string) {
      this.postRepository.insert({
        title,
        category,
        content,
      });
    }

    async updatePost(id: number, title: string, category: PostCategoryType, content: string) {
      // 비밀번호를 받지 않으니까,, 그냥 아이디가 같다면 수정가능하게 바꾸면 되지 않을까...
      // await this.checkPassword(id, password);
      this.postRepository.update(id, { title, category, content });
    }

    async deletePost(id: number) {
      // 비밀번호를 받지 않으니까,, 그냥 아이디가 같다면 수정가능하게 바꾸면 되지 않을까...
      //await this.checkPassword(id, password);
      this.postRepository.softDelete(id);
    }

    // private async checkPassword(id: number, password: number) {
    //   const article = await this.postRepository.findOne({
    //     where: { id, deletedAt: null },
    //     select: ["password"],
    //   });
    //   if (_.isNil(article)) {
    //     throw new NotFoundException(`Article not found. id: ${id}`);
    //   }
  
    //   if (article.password !== password.toString()) {
    //     throw new UnauthorizedException(
    //       `Article password is not correct. id: ${id}`
    //     );
    //   }
    // }
}
