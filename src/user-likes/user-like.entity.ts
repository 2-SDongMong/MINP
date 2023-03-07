import { LikeBase } from 'src/entities/like.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ schema: 'mooin_cat', name: 'user_likes' })
export class UserLike extends LikeBase {
  @PrimaryGeneratedColumn()
  user_like_id: number;

  @Column('int')
  targer_user_id: number;

  @ManyToOne(() => User, (user) => user.user_likes, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, (user) => user.target_user_likes, { cascade: true })
  @JoinColumn({ name: 'target_user_id' })
  target_user: User;
}
