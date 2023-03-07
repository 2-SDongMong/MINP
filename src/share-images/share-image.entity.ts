import { PostImageBase } from 'src/post-images/post-image.entity';
import { SharePost } from 'src/share-posts/share-post.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ schema: 'mooin_cat', name: 'share_images' })
export class ShareImage extends PostImageBase {
  @PrimaryGeneratedColumn()
  share_image_id: number;

  @Column('int')
  share_post_id: number;

  @Column('varchar', { length: 255 })
  share_image: string;

  @ManyToOne(() => SharePost, (sharePost) => sharePost.share_images, {
    cascade: true,
  })
  @JoinColumn({ name: 'share_post_id' })
  share_post: SharePost;
}
