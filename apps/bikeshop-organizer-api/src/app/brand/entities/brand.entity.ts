import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Bike } from '../../bike/entities/bike.entity';
import { Shop } from '../../shop/entities/shop.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @OneToMany(() => Bike, (bike) => bike.brand)
  bikes?: Bike[];
  @OneToMany(() => Product, (product) => product.brand)
  product?: Product[];
  @ManyToOne(() => Shop, (shop) => shop.brands)
  shop?: Shop;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
