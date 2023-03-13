import { PostBase } from '../posts/post.entity';
import { ShareComment } from '../share-comments/share-comment.entity';
import { ShareImage } from '../share-images/share-image.entity';
import { User } from '../users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

export type ShareStatusType = '나눔 중' | '나눔 마감';

@Entity({ schema: 'mooin_cat', name: 'share_posts' })
export class SharePost extends PostBase {
  @PrimaryGeneratedColumn()
  share_post_id: number;

  @Column('enum', {
    enum: ['나눔 중', '나눔 마감'],
    default: '나눔 중',
  })
  status: ShareStatusType;

  @OneToMany(() => ShareComment, (shareComment) => shareComment.share_post, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  share_comments: ShareComment[];

  @OneToMany(() => ShareImage, (shareImage) => shareImage.share_post, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  share_images: ShareImage[];

  @ManyToOne(() => User, (user) => user.share_posts, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
