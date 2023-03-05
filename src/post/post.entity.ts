import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

// posts와 share_posts가 공유하는 컬럼: user_id, title, content, created_at, updated_at, deleted_at
export abstract class PostBase {
  @Column('int')
  user_id: number;

  @Column('varchar', { length: 100 })
  title: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date | null;
}

export type PostCategoryType = '병원' | '자랑' | '기타';

@Entity({ schema: 'mooin_cat', name: 'posts' })
export class Post extends PostBase {
  @PrimaryGeneratedColumn({ type: 'int', name: 'post_id' })
  post_id: number;

  @Column('enum', {
    enum: ['병원', '자랑', '기타'],
    default: '기타',
  })
  category: PostCategoryType;
}
