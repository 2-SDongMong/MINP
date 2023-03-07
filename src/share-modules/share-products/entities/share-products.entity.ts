import { ShareProductsCategory } from 'src/share-modules/share-products-category/entities/share-products-category.entity';
import { ShareProductsLocation } from 'src/share-modules/share-products-location/entities/share-products-location.entity';
import { ShareProductsTag } from 'src/share-modules/share-products-tag/entities/share-products-tag.entity';
import { User } from 'src/users/user.entity';
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
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  isTrade: boolean;

  @JoinColumn()
  @OneToOne(() => ShareProductsLocation)
  shareProductsLocation: ShareProductsLocation;

  @ManyToOne(() => ShareProductsCategory)
  shareProductsCategory: ShareProductsCategory;

  @ManyToOne(() => User, (user) => user.share_products, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @JoinTable()
  @ManyToMany(
    () => ShareProductsTag,
    (shareProductsTag) => shareProductsTag.shareProducts,
  )
  shareProductsTag: ShareProductsTag[];
}
