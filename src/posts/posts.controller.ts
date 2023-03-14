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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { UpdatePostDto } from './dto/update-Post.dto';
import { PostCategoryType } from './post.entity';
import { UserId } from 'src/auth/decorator/get-current-userid.decorator'; // 형집님
import { UserInfo } from 'src/users/user-info.decorator'; // 희서님
import { UsersService } from 'src/users/users.service';

@Controller('posts')
export class PostsController {
  // 서비스 주입
  constructor(
    private readonly postsService: PostsService
    // private readonly userService: UsersService
    ) {}

  private logger = new Logger('PostsController');

  // 게시물 목록을 조회
  @Get()
  async getPosts() {
    this.logger.debug(`getPosts()`);
    return await this.postsService.getPosts();
  }

  // 게시물 카테고리별 조회 -> 게시물 category로 확인
  @Get('category/:category')
  async getPostByCategory(@Param('category') postCategory: PostCategoryType) {
    console.log(postCategory);
    return await this.postsService.getPostByCategory(postCategory);
  }

  // 게시물 상세 조회 -> 게시물 ID로 확인
  @Get('/:id')
  @UsePipes(ValidationPipe)
  async getPostById(@Param('post_id') postId: number) {
    this.logger.debug(`getPostById() : ${postId}`);
    return await this.postsService.getPostById(postId);
  }

  // 게시물 작성
  @Post()
  @UsePipes(ValidationPipe)
  createPost(@UserInfo() userId: number, @Body() data: CreatePostDto) {
    return this.postsService.createPost(
      userId,
      data.title,
      data.category,
      data.content
    );
  }

  // 게시물 수정
  @Patch('/:id')
  @UsePipes(ValidationPipe)
  async updatePost(@Param('id') postId: number, @Body() data: UpdatePostDto) {
    this.logger.debug(`UpdatePostDto() : ${UpdatePostDto}`);
    return await this.postsService.updatePost(
      postId,
      data.title,
      data.category,
      data.content
    );
  }

  // 게시글 삭제
  @Delete('/:id')
  @UsePipes(ValidationPipe)
  async deletePost(@Param('id', ParseIntPipe) postId: number, @Body() data: DeletePostDto) {
    this.logger.debug(`deletePost()`);
    return await this.postsService.deletePost(postId);
  }
}
