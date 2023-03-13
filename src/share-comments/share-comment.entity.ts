import { CommentBase } from '../post-comments/post-comment.entity';
import { SharePost } from '../share-posts/share-post.entity';
import { User } from '../users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ schema: 'mooin_cat', name: 'share_comments' })
export class ShareComment extends CommentBase {
  @PrimaryGeneratedColumn()
  share_comment_id: number;

  @Column('int')
  share_post_id: number;

  @ManyToOne(() => User, (user) => user.share_comments, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => SharePost, (sharePost) => sharePost.share_comments, {
    cascade: true,
  })
  @JoinColumn({ name: 'share_post_id' })
  share_post: SharePost;
}
