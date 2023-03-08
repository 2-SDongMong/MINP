import { PostComment } from 'src/post-comment/post-comment.entity';
import { PostImage } from 'src/post-image/post-image.entity';
import { User } from 'src/user/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

// posts와 share_posts가 공유하는 컬럼: user_id, title, content, created_at, updated_at, deleted_at
export abstract class PostBase {
  @Column('int')
  user_id: number;

  @Column('varchar', { length: 100 })
  title: string;

  @Column('text', { nullable: true })
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
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column('enum', {
    enum: ['병원', '자랑', '기타'],
    default: '기타',
  })
  category: PostCategoryType;

  @ManyToOne(() => User, (user) => user.posts, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => PostComment, (postComment) => postComment.post, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  post_comments: PostComment[];

  @OneToMany(() => PostImage, (postImage) => postImage.post, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  post_images: PostImage[];
}