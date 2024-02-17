import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bike } from '../../bike/entities/bike.entity';
import { Common } from '../../common/entities/common.entity';
import { Shop } from '../../shop/entities/shop.entity';

@Entity()
export class Brand extends Common {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @OneToMany(() => Bike, (bike) => bike.brand)
  bikes?: Bike[];
  @Column({ nullable: true })
  product?: string; // TODO: connect to Product entity
  @ManyToOne(() => Shop, (shop) => shop.brands)
  shop?: Shop;
}
