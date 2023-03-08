import { ShareProducts } from 'src/share-modules/share-products/entities/share-products.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'mooin_cat', name: 'products_tag' })
export class ProductsTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => ShareProducts, (shareProducts) => shareProducts.productsTag)
  shareProducts: ShareProducts[];
}
