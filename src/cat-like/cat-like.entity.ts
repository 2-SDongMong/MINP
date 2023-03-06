import { Cat } from 'src/cat/cat.entity';
import { LikeBase } from 'src/entity/like.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
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
