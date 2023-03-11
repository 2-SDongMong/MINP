import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductsLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  addressDetail: string;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @Column()
  tradeTime: Date;
}
