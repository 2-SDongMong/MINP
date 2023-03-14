import { ProductsCategory } from '../../share-products-category/entities/products-category.entity';
import { User } from '../../../users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductsTradeLocation } from 'src/share-modules/share-products-trade-location/entities/products-trade-location.entity';

@Entity({ schema: 'mooin_cat', name: 'share_products' })
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: false })
  isTrade: boolean;

  @ManyToOne(() => ProductsTradeLocation, { cascade: true, eager: true })
  productsTradeLocation: ProductsTradeLocation[];

  @ManyToOne(() => ProductsCategory, { eager: true })
  productsCategory: ProductsCategory;

  @ManyToOne(() => User, (user) => user.products, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
