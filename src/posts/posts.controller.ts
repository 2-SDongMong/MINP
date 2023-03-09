import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { UpdatePostDto } from './dto/update-Post.dto';
import { PostCategoryType } from './post.entity';

@Controller('posts')
export class PostsController {
    // 서비스 주입
    constructor(private readonly postsService: PostsService) { }

    // 게시물 목록을 조회
    @Get()
    async getPosts() {
        return await this.postsService.getPosts();
    }
    
    // 게시물 카테고리별 조회 -> 게시물 category로 확인
    @Get('/:category')
    async getPostByCategory(@Param('category') postCategory: PostCategoryType) {
        return await this.postsService.getPostByCategory(postCategory);
    }

    // 게시물 상세 조회 -> 게시물 ID로 확인
    @Get('/:id')
    async getPostById(@Param('id') postId: number) {
        return await this.postsService.getPostById(postId);
    }

    // 게시물 작성
    @Post()
    createPost(@Body() data: CreatePostDto) {
        return this.postsService.createPost(
            data.title,
            data.category,
            data.content,
        );
    }

    // 게시물 수정
    @Patch('/:id')
    async updatePost(
        @Param('id') postId: number,
        @Body() data: UpdatePostDto) {
        return await this.postsService.updatePost(
            postId,
            data.title,
            data.category,
            data.content,);
    }

    // 게시글 삭제
    @Delete('/:id')
    async deletePost(
        @Param('id') postId: number,
        @Body() data: DeletePostDto) {
        return await this.postsService.deletePost(postId);
    }
}
