import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'mooin_cat', name: 'requests' })
export class Request {
  @PrimaryGeneratedColumn({ type: 'int', name: 'request_id' })
  request_id: number;

  @Column('int')
  user_id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('int')
  age: number;

  @Column('varchar', { length: 20 })
  gender: string;

  @Column('bool')
  neutered: boolean;

  @Column('varchar', { length: 255 })
  image: string;

  @Column('varchar', { length: 100 })
  character: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date | null;
}
