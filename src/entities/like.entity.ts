import { Injectable } from '@nestjs/common';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

// chat_likes와 user_likes 테이블이 공유하는 컬럼: user_id, created_at, updated_at, deleted_at
@Injectable()
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
