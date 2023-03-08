import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

// post_comments와 share_comments 테이블이 공유하는 컬럼: user_id, content, created_at, updated_at, deleted_at
export abstract class CommentBase {
  @Column('int')
  user_id: number;

  @Column('varchar', { length: 300 })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date | null;
}

@Entity({ schema: 'mooin_cat', name: 'post_comments' })
export class PostComment extends CommentBase {
  @PrimaryGeneratedColumn()
  post_comment_id: number;

  @Column('int')
  post_id: number;

  @ManyToOne(() => User, (user) => user.post_comments, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Post, (post) => post.post_comments, { cascade: true })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
