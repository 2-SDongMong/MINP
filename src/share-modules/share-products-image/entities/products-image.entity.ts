import { ShareProducts } from 'src/share-modules/share-products/entities/share-products.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductsImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(
    () => ShareProducts,
    (shareProducts) => shareProducts.productsImages
  )
  shareProducts: ShareProducts;
}
