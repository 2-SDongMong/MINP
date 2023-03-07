import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'mooin_cat', name: 'share_products_location' })
export class ShareProductsLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  address_detail: string;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @Column()
  trade_time: Date;
}
