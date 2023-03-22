import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostCategoryType } from './post.entity';
import { CreatePostImageDto } from '../post-images/dto/create-post-image.dto';
import { PostImagesService } from '../post-images/post-images.service';
import { CreatePostImagesDto } from '../post-images/dto/create-post-images.dto';

@Controller('posts')
export class PostsController {
  // 서비스 주입
  constructor(
    private readonly postsService: PostsService,
    private readonly postImagesService: PostImagesService
  ) {}

  private logger = new Logger('PostsController');

  // 이미지 한 장/ 여러 장 등록
  @Post('/:postId/images')
  async createImage(
    @Param('postId') postId: number,
    @Body() data: CreatePostImagesDto
  ) {
    return await this.postImagesService.createImages(postId, data);
  }

  @Get('/:postId/images')
  async getImagesByPostId(@Param('postId') postId: number) {
    return await this.postImagesService.getImagesByPostId(postId);
  }

  // 게시물 목록을 조회 / 오프셋 페이지네이션 구현
  @Get()
  // async getPosts() {
  //   this.logger.debug(`getPosts()`);
  //   return await this.postsService.getPosts();
  // }

  //페이지네이션
  async getPosts(@Param('page') page: number = 1) {
    this.logger.debug(`getPosts()`);
    return await this.postsService.getPosts(page);
  }

  // 게시물 카테고리별 조회 -> 게시물 category로 확인
  @Get('category/:category')
  async getPostByCategory(@Param('category') postCategory: PostCategoryType) {
    return await this.postsService.getPostByCategory(postCategory);
  }

  // 게시물 상세 조회 -> 게시물 ID로 확인
  @Get('/:id')
  @UsePipes(ValidationPipe)
  async getPostById(@Param('id') postId: number) {
    this.logger.debug(`getPostById() : ${postId}`);
    return await this.postsService.getPostById(postId);
  }

  // 게시물 작성
  @Post()
  @UsePipes(ValidationPipe)
  async createPost(@Req() req, @Body() data: CreatePostDto) {
    return await this.postsService.createPost(
      req.userId,
      data.title,
      data.category,
      data.content
    );
  }

  // 게시물 수정
  @Patch('/:id')
  @UsePipes(ValidationPipe)
  updatePost(
    @Req() req,
    @Param('id') postId: number,
    @Body() data: UpdatePostDto
  ) {
    this.logger.debug(`UpdatePostDto() : ${UpdatePostDto}`);
    return this.postsService.updatePost(
      req.userId,
      postId,
      data.title,
      data.category,
      data.content
    );
  }

  // 게시글 삭제
  @Delete('/:id')
  @UsePipes(ValidationPipe)
  async deletePost(@Req() req, @Param('id', ParseIntPipe) postId: number) {
    this.logger.debug(`deletePost() : ${postId}`);
    return await this.postsService.deletePost(req.userId, postId);
  }
}
