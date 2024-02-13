import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Bike } from '../../bike/entities/bike.entity';
import { Common } from '../../common/entities/common.entity';

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
}
