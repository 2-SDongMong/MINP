import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PostService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { UpdatePostDto } from './dto/update-Post.dto';

@Controller('post')
export class PostController {
    // 서비스 주입
    constructor(private readonly postService: PostService) { }

    // 게시물 목록을 가져오는 API
    @Get('/posts')
    async getPosts() {
        return await this.postService.getPosts();
    }
    

    // 게시물 상세보기 -> 게시물 category로 확인
    // @Get('/posts/:category')
    // getPostByCategory(@Param('category') postCategory: string) {
    //     return this.postService.getPostByCategory(postCategory);
    // }


    // 게시물 상세보기 -> 게시물 ID로 확인
    @Get('/posts/:id')
    async getPostById(@Param('id') postId: number) {
        return await this.postService.getPostById(postId);
    }

    // 게시물 작성
    @Post('/posts')
    createPost(@Body() data: CreatePostDto) {
        return this.postService.createPost(
            data.title,
            data.category,
            data.content,
        );
    }

    // 게시물 수정
    @Patch('/posts/:id')
    async updatePost(
        @Param('id') postId: number,
        @Body() data: UpdatePostDto) {
        return await this.postService.updatePost(
            postId,
            data.title,
            data.category,
            data.content,);
    }

    // 게시글 삭제
    @Delete('/posts/:id')
    async deletePost(
        @Param('id') postId: number,
        @Body() data: DeletePostDto) {
        return await this.postService.deletePost(postId);
    }
}
