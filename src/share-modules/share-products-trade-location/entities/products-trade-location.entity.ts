import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class ProductsTradeLocation {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ type: 'double precision' }) // 변경: varchar -> double precision
  latitude: number; // 변경: string -> number
  @Column({ type: 'double precision' }) // 변경: varchar -> double precision
  longitude: number; // 변경: string -> number
}
