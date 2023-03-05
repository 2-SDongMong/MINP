import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ schema: 'mooin_cat', name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn({ type: 'int', name: 'message_id' })
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
}
