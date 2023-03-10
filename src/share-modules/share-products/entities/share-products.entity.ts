import { ProductCategory } from '../../share-products-category/entities/product-category.entity';
import { ProductsLocation } from '../../share-products-location/entities/products-location.entity';
import { ProductsTag } from '../../share-products-tag/entities/products-tag.entity';
import { User } from '../../../users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'mooin_cat', name: 'share_products' })
export class ShareProducts {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: false })
  isTrade: boolean;

  @JoinColumn()
  @OneToOne(() => ProductsLocation)
  shareProductsLocation: ProductsLocation;

  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User, (user) => user.share_products, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @JoinTable()
  @ManyToMany(() => ProductsTag, (productsTag) => productsTag.shareProducts)
  productsTag: ProductsTag[];
}
