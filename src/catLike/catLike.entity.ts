import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

// chat_likes와 user_likes 테이블이 공유하는 컬럼: user_id, created_at, updated_at, deleted_at
export abstract class LikeBase {
  @Column('int')
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date | null;
}

@Entity({ schema: 'mooin_cat', name: 'cat_likes' })
export class CatLike extends LikeBase {
  @PrimaryGeneratedColumn()
  cat_like_id: number;

  @Column('int')
  cat_id: number;
}
