import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Bike } from '../../bike/entities/bike.entity';
import { Common } from '../../common/entities/common.entity';
import { Shop } from '../../shop/entities/shop.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Brand extends Common {
  @Column()
  name: string;
  @OneToMany(() => Bike, (bike) => bike.brand)
  bikes?: Bike[];
  @OneToMany(() => Product, (product) => product.brand)
  product?: Product[];
  @ManyToOne(() => Shop, (shop) => shop.brands)
  shop?: Shop;
}
