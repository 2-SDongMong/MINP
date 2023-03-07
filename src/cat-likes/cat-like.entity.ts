import { Cat } from 'src/cats/cat.entity';
import { LikeBase } from 'src/entities/like.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ schema: 'mooin_cat', name: 'cat_likes' })
export class CatLike extends LikeBase {
  @PrimaryGeneratedColumn()
  cat_like_id: number;

  @Column('int')
  cat_id: number;

  @ManyToOne(() => Cat, (cat) => cat.cat_likes, { cascade: true })
  @JoinColumn({ name: 'cat_id' })
  cat: Cat;

  @ManyToOne(() => User, (user) => user.cat_likes, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
