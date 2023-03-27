
import { Cat } from '../cats/cat.entity';
import { Request } from '../requests/request.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserLike } from '../user-likes/user-like.entity';
import { Message } from '../messages/message.entity';
import { PostComment } from '../post-comments/post-comment.entity';
import { Post } from '../posts/post.entity';
import { Products } from '../share-modules/share-products/entities/share-products.entity';

export type UserStatusType = '가입 대기' | '일반' | '관리자';

@Entity({ schema: 'mooin_cat', name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column('varchar', { length: 50, unique: true })
  nickname: string;

  @Column('varchar', { length: 140, select: false })
  password: string;

  @Column('varchar', { length: 10 })
  name: string;

  @Index({ unique: true })
  @Column('varchar', { length: 50 })
  email: string;

  @Column('varchar', { length: 50 })
  address_road: string;

  @Column('varchar', { length: 50 })
  address_bname: string;

  @Column('boolean', { default: false })
  address_certified: Boolean;

  @Column('varchar', { length: 20 })
  phone_number: string;

  @Column('enum', {
    enum: ['가입 대기', '일반', '관리자'],
    default: '일반',
  })
  status: UserStatusType;

  @Column('varchar', { length: 100, nullable: true })
  referral_code: string;

  @Column({ default: null })
  hashdRt: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date | null;

  @OneToMany(() => Cat, (cat: Cat) => cat.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  cats: Cat[];

  // @OneToMany(() => CatLike, (catLike) => catLike.user, {
  //   onUpdate: 'CASCADE',
  //   onDelete: 'CASCADE',
  // })
  // cat_likes: CatLike[];

  @OneToMany(() => Products, (Products) => Products.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  products: Products[];

  @OneToMany(() => Request, (request) => request.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  requests: Request[];

  @OneToMany(() => UserLike, (userLike) => userLike.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  user_likes: UserLike[];

  @OneToMany(() => UserLike, (userLike) => userLike.target_user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  target_user_likes: UserLike[];

  @OneToMany(() => Message, (message) => message.send_user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  send_messages: Message[];

  @OneToMany(() => Message, (message) => message.receive_user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  receive_messages: Message[];

  @OneToMany(() => PostComment, (postComment) => postComment.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  post_comments: PostComment[];

  @OneToMany(() => Post, (post) => post.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  posts: Post[];
}
