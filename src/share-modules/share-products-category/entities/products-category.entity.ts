import { Products } from '../../share-products/entities/share-products.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductsCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Products, (products) => products.productsCategory, {
    cascade: ['insert', 'update', 'remove', 'soft-remove', 'recover'],
  })
  products: Products[];
}
