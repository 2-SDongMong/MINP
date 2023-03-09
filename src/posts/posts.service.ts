import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Repository } from 'typeorm';
import { Post, PostCategoryType } from './post.entity';

@Injectable()
export class PostsService {
    constructor(
      @InjectRepository(Post) private postsRepository: Repository<Post>
    ) { }

    async getPosts() {
      return await this.postsRepository.find({
        where: { deleted_at: null },
        select: ["user_id", "post_id", "title", "category", "content", "created_at"],
      });
    }

    async getPostByCategory(postsCategory: PostCategoryType) {
        return await this.postsRepository.findOne({
            where: { category : postsCategory, deleted_at: null }, 
            select: ["user_id", "title", "category", "content", "created_at", "updated_at"],
          });
    }
    
    //post_images 테이블에서 같은 id를 post_id로 가지는 사진들의 post_image 컬럼을 조인해 조회하는거 아직 구현 못함
    async getPostById(id: number) {
        console.log(id);
      return await this.postsRepository.findOne({
        where: { post_id : id, deleted_at: null }, 
        select: ["user_id", "title", "category", "content", "created_at", "updated_at"],
      });
    }

    createPost(title: string, category: PostCategoryType, content: string) {
      this.postsRepository.insert({
        user_id : 1, // 임의로 설정
        title,
        category,
        content,
      });
    }

    async updatePost(id: number, title: string, category: PostCategoryType, content: string) {
      // await this.checkPassword(id, password); // 이건 비밀번호를 검증하는 기능.. 우린 아이디 비교를 해야한다.

      //현재 아이디를 비교하는 방법..
      // user_id 가 null 이 아니고, 글에 작성된 id와 현재 로그인된 id가 같다면 > if문
      this.postsRepository.update(id , { title, category, content });
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

