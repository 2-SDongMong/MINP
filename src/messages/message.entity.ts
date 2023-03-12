import { User } from '../users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ schema: 'mooin_cat', name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  message_id: number;

  @Column('int')
  sender_id: number;

  @Column('int')
  recipient_id: number;

  @Column('varchar', { length: 500 })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date | null;

  @ManyToOne(() => User, (user) => user.send_messages, { cascade: true })
  @JoinColumn({ name: 'sender_id' })
  send_user: User;

  @ManyToOne(() => User, (user) => user.receive_messages, { cascade: true })
  @JoinColumn({ name: 'recipient_id' })
  receive_user: User;
}
