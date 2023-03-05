import { CommentBase } from 'src/postComment/postComment.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'mooin_cat', name: 'share_comments' })
export class ShareComment extends CommentBase {
  @PrimaryGeneratedColumn({ type: 'int', name: 'share_comment_id' })
  share_comment_id: number;

  @Column('int')
  share_post_id: number;
}
