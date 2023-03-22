import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Put, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';
import { PostCommentsService } from './post-comments.service';

@Controller('posts')
export class PostCommentsController {
    constructor(
        private readonly postCommentsService: PostCommentsService,
    ) { }
    private logger = new Logger('PostCommentsController');

    @Get('/:postId/comments')
    async getComments(@Param('postId') postId: number) {
        this.logger.debug(`getComments()`);
        return await this.postCommentsService.getComments(postId);
    }

    //댓글 쓰기
    @Post('/:postId')
    @UsePipes(ValidationPipe)
    createComment(@Req() req, @Param('postId') postId: number, @Body() CreatePostCommentDto: CreatePostCommentDto) {
        this.logger.debug(`createComment() : ${CreatePostCommentDto}`);
        console.log(req);
        return this.postCommentsService.createComment(
            req.userId,
            postId,
            CreatePostCommentDto.content,
        );
    }

    // 댓글 삭제
    @Delete('/:postId/comments/:commentId')
    async deleteComment(@Req() req, @Param('commentId', ParseIntPipe) post_comment_id: number) {
        return await this.postCommentsService.deleteComment(req.userId, post_comment_id);
    }

    // 댓글 수정
    @Put('/:postId/comments/:commentId')
    updateComment(
        @Req() req,
        @Param('commentId') post_comment_id: number,
        @Body() updateDateDto: UpdatePostCommentDto,
    ) {
        this.logger.debug(`updateComment() : ${post_comment_id}`);
        return this.postCommentsService.updateComment(req.userId, post_comment_id, updateDateDto.content);
    }
}



