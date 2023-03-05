import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'mooin_cat', name: 'cats' })
export class Cat {
  @PrimaryGeneratedColumn({ type: 'int', name: 'cat_id' })
  cat_id: number;

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
