import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductsCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;
}
