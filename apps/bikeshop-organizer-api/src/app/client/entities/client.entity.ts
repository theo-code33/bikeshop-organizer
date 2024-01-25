import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';
import { Common } from '../../common/entities/common.entity';

@Entity()
export class Client extends Common {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false })
  firstName: string;
  @Column({ nullable: false })
  lastName: string;
  @Column({ nullable: false })
  phoneNumber: string;
  @Column({ nullable: false })
  email: string;
  @ManyToOne(() => Shop, (shop) => shop.id)
  shop: Shop;
  @Column({ nullable: false })
  address: string;
  @Column({ nullable: false })
  postalCode: string;
  @Column({ nullable: false })
  city: string;
  @Column({ nullable: true })
  bike?: string; // TODO connect to Bike entity
}
