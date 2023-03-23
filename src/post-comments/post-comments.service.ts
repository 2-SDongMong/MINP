import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { IsNull, Repository } from 'typeorm';
import { PostComment } from './post-comment.entity';

@Injectable()
export class PostCommentsService {
  constructor(
    @InjectRepository(PostComment)
    private postCommentRepository: Repository<PostComment>
  ) {}

  private logger = new Logger('PostCommentsService');

  async getComments(post_id: number) {
    const comment = await this.postCommentRepository.find({
      relations: {
        user: {},
      },
      where: { post_id, deleted_at: IsNull() },
      select: {
        user: {
          nickname: true,
        },
      },
      order: {
        updated_at: 'DESC',
      },
    });
    return comment;
  }

  async createComment(userId: number, postId: number, content: string) {
    this.logger.debug(`createComment()`);

    this.postCommentRepository.insert({
      user_id: userId,
      post_id: postId,
      content,
    });
  }

  //댓글 수정
  async updateComment(
    userId: number,
    post_comment_id: number,
    content: string
  ) {
    const post = await this._existenceCheckById(post_comment_id);
    this._authorCheckByUserId(post.user_id, userId);

    this.postCommentRepository.update(post_comment_id, { content });
  }

  // 댓글 삭제
  async deleteComment(userId: number, post_comment_id: number) {
    const post_comment = await this._existenceCheckById(post_comment_id);
    this._authorCheckByUserId(post_comment.user_id, userId);
    this.postCommentRepository.softDelete(post_comment_id);
  }

  private async _existenceCheckById(id: number) {
    const PostComment = await this.postCommentRepository.findOne({
      where: { post_comment_id: id },
    });
    if (_.isNil(PostComment)) {
      throw new NotFoundException(`Post article not found. id: ${id}`);
    }
    return PostComment;
  }

  private async _authorCheckByUserId(authorId: number, userId: number) {
    if (authorId !== userId) {
      throw new UnauthorizedException(
        `Unauthorized. user id: ${userId} not match with author id: ${authorId}`
      );
    }
  }
}
