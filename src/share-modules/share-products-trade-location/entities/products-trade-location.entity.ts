import { Products } from '../../share-products/entities/share-products.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class ProductsTradeLocation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'double precision' }) // 변경: varchar -> double precision
  latitude: number; // 변경: string -> number

  @Column({ type: 'double precision' }) // 변경: varchar -> double precision
  longitude: number; // 변경: string -> number

  @OneToMany(() => Products, (products) => products.productsTradeLocation, {
    cascade: ['insert', 'update', 'remove', 'soft-remove', 'recover'],
  })
  products: Products[];
}
