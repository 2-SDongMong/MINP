import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

// post_images와 share_images 테이블이 공유하는 컬럼: created_at, updated_at, deleted_at
export abstract class PostImageBase {
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date | null;
}

@Entity({ schema: 'mooin_cat', name: 'post_images' })
export class PostImage extends PostImageBase {
  @PrimaryGeneratedColumn({ type: 'int', name: 'post_image_id' })
  post_image_id: number;

  @Column('int')
  post_id: number;

  @Column('varchar', { length: 255 })
  post_image: string;
}
