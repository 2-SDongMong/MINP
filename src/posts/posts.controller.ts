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

@Controller('posts')
export class PostsController {
  // 서비스 주입
  constructor(private readonly postsService: PostsService) {}

  private logger = new Logger('PostsController');

  // 게시물 목록을 조회 
  // @Get()
  // async all(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<typeof Post>>{ //
  //  return await this.postsService.paginate(pageOptionsDto);
  // }

  //페이지네이션 
  @Get()
  async getPosts(@Param('page') page: number = 1) {
    this.logger.debug(`getPosts(page)`);
    return await this.postsService.getPosts(page);
  }


   // async getPosts() {
  //   this.logger.debug(`getPosts()`);
  //   return await this.postsService.getPosts();
  // }


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
    console.log(postId);
    return await this.postsService.getPostById(postId);
  }

  // 게시물 작성
  @Post()
  @UsePipes(ValidationPipe)
  createPost(@Req() req, @Body() data: CreatePostDto) {
    console.log(req);
    return this.postsService.createPost(
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
