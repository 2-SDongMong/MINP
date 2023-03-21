import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsService } from 'src/posts/posts.service';
import { Repository } from 'typeorm';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';
import { PostComment } from './post-comment.entity';

@Injectable()
export class PostCommentsService {
    constructor(
        @InjectRepository(PostComment)
        private PostCommentRepository: Repository<PostComment>,

    ) { }
    private logger = new Logger('CommentService');

    createComment(
        writeCommentDto: CreatePostCommentDto,
        //userService: UserService,
        postsService: PostsService,
    ): Promise<object> {
        return this.PostCommentRepository.insert(
            writeCommentDto,
            //userService,
            //postsService,
        );
    }

    // 댓글 삭제
    deleteComment(id: number): Promise<object> {
        return this.PostCommentRepository.softDelete(id);
    }

    // getUserNickname(id: number): Promise<string> {
    //     return this.PostCommentRepository.getUserNickname(id);
    // }

    //댓글 수정
    updateComment(
        id: number,
        updateCommentDto: UpdatePostCommentDto,
    ): Promise<object> {
        return this.PostCommentRepository.update(id, updateCommentDto);
    }
}
