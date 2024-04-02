import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';
import { Common } from '../../common/entities/common.entity';
import { Bike } from '../../bike/entities/bike.entity';

@Entity()
export class Client extends Common {
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
  @OneToMany(() => Bike, (bike) => bike.client)
  bikes?: Bike[];
}
