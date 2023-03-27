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
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';
import { PostCommentsService } from './post-comments.service';

@Controller('posts')
export class PostCommentsController {
  constructor(private readonly postCommentsService: PostCommentsService) {}
  private logger = new Logger('PostCommentsController');

  // 게시글 ID로 댓글 목록 조회
  @Get('/:postId/comments')
  async getComments(@Param('postId') postId: number) {
    this.logger.debug(`getComments(postId)`);
    return await this.postCommentsService.getCommentsByPostId(postId);
  }

  //댓글 쓰기
  @Post('/:postId/comments')
  @UsePipes(ValidationPipe)
  createComment(
    @Req() req,
    @Param('postId') postId: number,
    @Body() CreatePostCommentDto: CreatePostCommentDto
  ) {
    this.logger.debug(`createComment() : ${CreatePostCommentDto}`);
    return this.postCommentsService.createComment(
      req.userId,
      postId,
      CreatePostCommentDto.content
    );
  }

  // 댓글 수정
  @Patch('/:postId/comments/:commentId')
  updateComment(
    @Req() req,
    @Param('commentId') post_comment_id: number,
    @Body() updateDateDto: UpdatePostCommentDto
  ) {
    this.logger.debug(`updateComment() : ${post_comment_id}`);
    return this.postCommentsService.updateComment(
      req.userId,
      post_comment_id,
      updateDateDto.content
    );
  }

  // 댓글 삭제
  @Delete('/:postId/comments/:commentId')
  async deleteComment(
    @Req() req,
    @Param('commentId', ParseIntPipe) post_comment_id: number
  ) {
    return await this.postCommentsService.deleteComment(
      req.userId,
      post_comment_id
    );
  }
}
