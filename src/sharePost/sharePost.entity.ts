import { PostBase } from 'src/post/post.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type ShareStatusType = '나눔 중' | '나눔 마감';

@Entity({ schema: 'mooin_cat', name: 'share_posts' })
export class SharePost extends PostBase {
  @PrimaryGeneratedColumn({ type: 'int', name: 'share_post_id' })
  share_post_id: number;

  @Column('enum', {
    enum: ['나눔 중', '나눔 마감'],
    default: '나눔 중',
  })
  status: ShareStatusType;
}
