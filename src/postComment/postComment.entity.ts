import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
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
  @PrimaryGeneratedColumn({ type: 'int', name: 'post_comment_id' })
  post_comment_id: number;

  @Column('int')
  post_id: number;
}
