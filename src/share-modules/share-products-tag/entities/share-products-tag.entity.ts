import { ShareProducts } from 'src/share-modules/share-products/entities/share-products.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'mooin_cat', name: 'share_products_tag' })
export class ShareProductsTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(
    () => ShareProducts,
    (shareProducts) => shareProducts.shareProductsTag,
  )
  shareProducts: ShareProducts[];
}
