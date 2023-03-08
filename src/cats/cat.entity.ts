import { CatLike } from 'src/cat-likes/cat-like.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'mooin_cat', name: 'cats' })
export class Cat {
  @PrimaryGeneratedColumn()
  cat_id: number;

  @Column('int')
  user_id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('int', { nullable: true })
  age: number;

  @Column('varchar', { length: 20 })
  gender: string;

  @Column('bool')
  neutered: boolean;

  @Column('varchar', { length: 255 })
  image: string;

  @Column('varchar', { length: 100, nullable: true })
  character: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date | null;

  @ManyToOne(() => User, (user) => user.cats, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => CatLike, (catLike) => catLike.cat, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  cat_likes: CatLike[];
}
