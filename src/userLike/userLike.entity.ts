import { LikeBase } from 'src/catLike/catLike.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'mooin_cat', name: 'user_likes' })
export class UserLike extends LikeBase {
  @PrimaryGeneratedColumn()
  user_like_id: number;

  @Column('int')
  targer_user_id: number;
}
