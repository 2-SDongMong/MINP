import { ProductsCategory } from 'src/share-modules/share-products-category/entities/products-category.entity';
import { ProductsImage } from 'src/share-modules/share-products-image/entities/products-image.entity';
import { ProductsLocation } from 'src/share-modules/share-products-location/entities/products-location.entity';
import { ProductsTag } from 'src/share-modules/share-products-tag/entities/products-tag.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => ProductsCategory)
  productsCategory: ProductsCategory;

  @ManyToOne(() => User, (user) => user.share_products, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @JoinTable()
  @ManyToMany(() => ProductsTag, (productsTag) => productsTag.shareProducts)
  productsTag: ProductsTag[];

  @OneToMany(
    () => ProductsImage,
    (productsImage) => productsImage.shareProducts
  )
  productsImages: ProductsImage[];

  @Column({ type: 'simple-array' })
  imageUrls: string[];
}
