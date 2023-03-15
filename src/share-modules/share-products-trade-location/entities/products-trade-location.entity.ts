import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductsTradeLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  cityDetail: string;
}
