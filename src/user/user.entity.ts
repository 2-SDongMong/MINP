import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type UserStatusType = '가입 대기' | '일반' | '관리자';

@Entity({ schema: 'mooin_cat', name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'user_id' })
  user_id: number;

  @Column('varchar', { length: 10 })
  nickname: string;

  @Column('varchar', { select: false })
  password: string;

  @Column('varchar', { length: 10 })
  name: string;

  @Index({ unique: true })
  @Column('varchar', { length: 50 })
  email: string;

  @Column('varchar', { length: 50 })
  address: string;

  @Column('varchar', { length: 20 })
  phone_number: string;

  @Column('enum', {
    enum: ['가입 대기', '일반', '관리자'],
    default: '가입 대기',
  })
  status: UserStatusType;

  @Column('varchar', { length: 100 })
  referral_code: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date | null;
}
