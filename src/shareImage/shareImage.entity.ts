import { PostImageBase } from 'src/postImage/postImage.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'mooin_cat', name: 'share_images' })
export class ShareImage extends PostImageBase {
  @PrimaryGeneratedColumn()
  share_image_id: number;

  @Column('int')
  share_post_id: number;

  @Column('varchar', { length: 255 })
  share_image: string;
}
