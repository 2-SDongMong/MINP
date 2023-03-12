import { ShareProducts } from 'src/share-modules/share-products/entities/share-products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'mooin_cat', name: 'products_image' })
export class ProductsImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => ShareProducts, (shareProducts) => shareProducts.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: ShareProducts;
}
