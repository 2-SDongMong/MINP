import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';
import { PostCommentsService } from './post-comments.service';
import { PostsService } from 'src/posts/posts.service';

@Controller('post-comments')
export class PostCommentsController {
    constructor(
        private PostCommentsService: PostCommentsService,
        private readonly PostsService: PostsService,
        //private readonly userService: UserService,
    ) { }
    private logger = new Logger('ContentController');

    @Get()
    test() { }

    //댓글 쓰기
    @Post()
    writeComment(@Body() CreatePostCommentDto: CreatePostCommentDto): Promise<object> {
        this.logger.debug(`createComment() : ${CreatePostCommentDto}`);
        return this.PostCommentsService.createComment(
            CreatePostCommentDto,
            //this.userService,
            this.PostsService,
        );
    }

    // 댓글 삭제
    @Delete('/:id')
    deleteComment(@Param('id', ParseIntPipe) id): Promise<object> {
        return this.PostCommentsService.deleteComment(id);
    }

    // 댓글 수정
    @Put('/:id')
    updateComment(
        @Param('id') id: number,
        @Body() updateDateDto: UpdatePostCommentDto,
    ): Promise<object> {
        this.logger.debug(`updateComment() : ${id}`);
        return this.PostCommentsService.updateComment(id, updateDateDto);
    }
}



