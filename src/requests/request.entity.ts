import { User } from '../users/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'mooin_cat', name: 'requests' })
export class Request {
  @PrimaryGeneratedColumn()
  request_id: number;

  @Column('int')
  user_id: number;

  @Column('varchar', { length: 500 })
  detail: string;

  @Column('date')
  reserved_begin_date: Date;

  @Column('date')
  reserved_end_date: Date;

  @Column('boolean', { default: true })
  is_ongoing: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date | null;

  @ManyToOne(() => User, (user: User) => user.requests, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
