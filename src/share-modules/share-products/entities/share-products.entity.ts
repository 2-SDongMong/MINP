import { ProductsCategory } from '../../share-products-category/entities/products-category.entity';
import { ProductsTradeLocation } from '../../share-products-trade-location/entities/products-trade-location.entity';
import { User } from '../../../users/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'mooin_cat', name: 'share_products' })
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column({ type: 'text' })
  description: string;

  @Column({ default: '나눔중' })
  tradeStatus: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column() // New column to store the foreign key relationship
  user_id: number;

  @ManyToOne(() => ProductsTradeLocation, (location) => location.products, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  productsTradeLocation: ProductsTradeLocation;

  @ManyToOne(() => ProductsCategory, (category) => category.products, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  productsCategory: ProductsCategory;

  @ManyToOne(() => User, (user) => user.products, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' }) // Changed the name to 'user_id'
  user: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
